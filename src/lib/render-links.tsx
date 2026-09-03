import sanitizeHtml from "sanitize-html";
 
// Blog content can come from two places: hand-written paragraphs using a
// small [text](url) markdown-style link syntax, or raw HTML pasted from a
// WYSIWYG editor in the admin panel. This function supports both:
//   1. Any [text](url) links get converted to real <a> tags first.
//   2. The whole paragraph is then sanitized and rendered as HTML.
//
// SECURITY: content ultimately comes from the admin panel, which is
// trusted but not infallible (compromised admin account, a second admin
// user, copy-pasted content from an untrusted source). We NEVER render
// raw HTML without sanitizing it first — sanitize-html strips <script>
// tags, event handler attributes (onclick, onerror, etc.), javascript:
// URLs, and anything else that could execute code in a visitor's browser.
// This is the one place in the codebase allowed to use
// dangerouslySetInnerHTML, and only because the content is sanitized
// immediately before it's used, every time, with no other code path in
// between where it could be modified.
//
// LIBRARY CHOICE: we use `sanitize-html` rather than DOMPurify here.
// DOMPurify's server-side build (isomorphic-dompurify) depends on jsdom,
// which does real DOM parsing — this failed at runtime in this project's
// Vercel deployment (confirmed: pages crashed with a 500 whenever the
// sanitizer actually ran, and worked once we bypassed it, isolating the
// crash to jsdom's serverless behavior specifically). sanitize-html is
// pure JavaScript with no DOM emulation, so it doesn't have this failure
// mode, and is a well-established choice for exactly this Node.js /
// serverless use case.
 
const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;
 
function markdownLinksToHtml(text: string): string {
  return text.replace(LINK_PATTERN, (_full, label: string, href: string) => {
    const isInternal = href.startsWith("/");
    const target = isInternal ? "" : ' target="_blank" rel="noopener noreferrer"';
    return `<a href="${href}" class="text-indigo underline underline-offset-2 hover:no-underline"${target}>${label}</a>`;
  });
}
 
// Allowlist kept intentionally narrow — this is blog body copy, not a
// full page layout. Add tags here only if the admin editor genuinely
// needs to produce them; every tag added is more attack surface.
const ALLOWED_TAGS = ["a", "strong", "b", "em", "i", "u", "br", "code", "span"];
const ALLOWED_ATTR = ["href", "class", "target", "rel"];
 
const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: {
    a: ALLOWED_ATTR,
    span: ["class"],
    code: ["class"],
  },
  // sanitize-html already disallows javascript:/data: URI schemes by
  // default for href-type attributes, but we're explicit here for
  // clarity and to guard against any future library default changes.
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowProtocolRelative: false,
};
 
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
 
export function sanitizeBlogParagraph(rawText: string | null | undefined): string {
  // Defensive guard: a null/undefined/non-string paragraph (bad data from
  // the DB, an empty admin field, etc.) must not throw — that would take
  // down the entire page for every visitor over one bad paragraph.
  if (typeof rawText !== "string") return "";
 
  try {
    const withLinks = markdownLinksToHtml(rawText);
    return sanitizeHtml(withLinks, sanitizeOptions);
  } catch (err) {
    // Belt-and-braces: even though sanitize-html is far less prone to the
    // environment-specific crash we saw with jsdom, we keep this fallback
    // so a bad paragraph can never take down the whole page. Logged
    // server-side so it's still visible for debugging.
    console.error("[sanitizeBlogParagraph] sanitize-html failed, falling back to escaped plain text:", err);
    return escapeHtml(rawText);
  }
}
 
// For contexts where raw text is required — <meta description>, JSON-LD
// schema fields, <title> tags — rather than rendered HTML. If a
// description field ever contains a [text](url) link or inline HTML
// (both now valid in admin content, see sanitizeBlogParagraph above),
// this strips it back down to plain readable text so structured data and
// meta tags never contain literal markdown syntax or HTML tags, which
// would look broken in a Google search result snippet.
export function toPlainText(rawText: string | null | undefined): string {
  if (typeof rawText !== "string") return "";
  try {
    const linksResolvedToLabel = rawText.replace(LINK_PATTERN, (_full, label: string) => label);
    return sanitizeHtml(linksResolvedToLabel, { allowedTags: [], allowedAttributes: {} }).trim();
  } catch (err) {
    console.error("[toPlainText] sanitize-html failed, falling back to raw text:", err);
    return rawText.trim();
  }
}