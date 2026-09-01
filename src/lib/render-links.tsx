import DOMPurify from "isomorphic-dompurify";
 
// Blog content can come from two places: hand-written paragraphs using a
// small [text](url) markdown-style link syntax, or raw HTML pasted from a
// WYSIWYG editor in the admin panel. This function supports both:
//   1. Any [text](url) links get converted to real <a> tags first.
//   2. The whole paragraph is then sanitized and rendered as HTML.
//
// SECURITY: content ultimately comes from the admin panel, which is
// trusted but not infallible (compromised admin account, a second admin
// user, copy-pasted content from an untrusted source). We NEVER render
// raw HTML without sanitizing it first — DOMPurify strips <script> tags,
// event handler attributes (onclick, onerror, etc.), javascript: URLs,
// and anything else that could execute code in a visitor's browser.
// This is the one place in the codebase allowed to use
// dangerouslySetInnerHTML, and only because the content is sanitized
// immediately before it's used, every time, with no other code path in
// between where it could be modified.
 
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
 
export function sanitizeBlogParagraph(rawText: string): string {
  const withLinks = markdownLinksToHtml(rawText);
  return DOMPurify.sanitize(withLinks, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    // Note: we don't set a custom ALLOWED_URI_REGEXP here. DOMPurify's
    // built-in default already blocks javascript:, data: and other
    // dangerous URI schemes on href. An earlier version of this function
    // set a custom regex intended to additionally restrict schemes to
    // http(s)/mailto/tel, but it had an unintended side effect: it
    // interfered with DOMPurify's handling of the target/rel attributes,
    // silently stripping them from external links. Rather than fight
    // that interaction, we rely on the well-tested default, which
    // already covers the actual security requirement (no
    // script-executing URLs).
  });
}


// For contexts where raw text is required — <meta description>, JSON-LD
// schema fields, <title> tags — rather than rendered HTML. If a
// description field ever contains a [text](url) link or inline HTML,
// this strips it back down to plain readable text so structured data and
// meta tags never contain literal markdown syntax or HTML tags, which
// would look broken in a Google search result snippet.
export function toPlainText(rawText: string): string {
  const linksResolvedToLabel = rawText.replace(LINK_PATTERN, (_full, label: string) => label);
  return DOMPurify.sanitize(linksResolvedToLabel, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
}
