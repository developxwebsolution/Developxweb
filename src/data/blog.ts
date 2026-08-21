export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-your-website-is-slow-and-how-to-fix-it",
    title: "Why Your Website Is Slow (And What Actually Fixes It)",
    excerpt:
      "Most slow websites share the same five causes. Here's how to diagnose them and what actually moves your Core Web Vitals score.",
    category: "Performance",
    date: "2026-06-12",
    readTime: "7 min read",
    author: "DevelopX Team",
    content: [
      "Page speed complaints almost always trace back to one of five causes: unoptimised images, render-blocking scripts, too many third-party embeds, no caching strategy, or a hosting plan that can't keep up with traffic.",
      "Images are the most common offender. A single unoptimised hero image can add two to three seconds to load time on mobile. Serving modern formats like WebP or AVIF, at the right dimensions, usually fixes this in one pass.",
      "Third-party scripts - chat widgets, analytics, ad pixels - each add their own network request and execution time. Audit what's actually driving value and remove the rest.",
      "Framework choice matters too. Server-rendered frameworks like Next.js ship less JavaScript to the browser for the initial paint, which directly improves Largest Contentful Paint and Time to Interactive scores.",
      "Finally, hosting matters more than most businesses assume. A shared hosting plan built for a five-page brochure site will struggle under real traffic. Match your hosting tier to your actual visitor load.",
    ],
  },
  {
    slug: "wordpress-vs-nextjs-which-should-you-choose",
    title: "WordPress vs Next.js: Which Should You Actually Choose in 2026",
    excerpt:
      "Both are valid choices, for different reasons. Here's how to decide based on who edits your site and what it needs to do.",
    category: "Strategy",
    date: "2026-05-28",
    readTime: "6 min read",
    author: "DevelopX Team",
    content: [
      "The WordPress vs Next.js debate usually gets framed as old vs new, but the real question is who will manage the content and what the site needs to do beyond displaying pages.",
      "WordPress remains a strong choice when a non-technical team needs to publish frequently, when you need a large plugin ecosystem for niche features, and when budget is a primary constraint.",
      "Next.js is the better choice when performance and SEO are competitive differentiators, when the site needs custom interactivity beyond content display, or when it's growing into a full web application over time.",
      "Many of our clients land on a hybrid: a headless CMS for content editing, with a Next.js front end for speed and flexibility. This gets non-technical teams an easy editing experience without sacrificing performance.",
    ],
  },
  {
    slug: "signs-your-business-needs-a-website-redesign",
    title: "7 Signs Your Business Website Needs a Redesign",
    excerpt:
      "A redesign is expensive to skip and expensive to do too often. Here's how to know when it's actually time.",
    category: "Strategy",
    date: "2026-05-10",
    readTime: "5 min read",
    author: "DevelopX Team",
    content: [
      "Your site still works, but it's quietly costing you leads. Here are the signals that mean it's time for a rebuild rather than another patch.",
      "If your bounce rate on mobile is significantly higher than desktop, the layout is likely breaking or loading too slowly on phones - where most of your traffic probably comes from.",
      "If your team dreads making a content update because it risks breaking the layout, your CMS or theme has become a liability rather than a tool.",
      "If your design still reflects your brand from five years ago, visitors notice the mismatch between an outdated site and a business that claims to be current.",
      "If your competitors' sites load faster, rank higher and look more credible, that comparison happens in a visitor's head whether you see it or not.",
    ],
  },
  {
    slug: "on-page-seo-checklist-for-service-businesses",
    title: "The On-Page SEO Checklist Every Service Business Should Run",
    excerpt:
      "A practical, no-fluff checklist for getting your service pages found on Google.",
    category: "SEO",
    date: "2026-04-22",
    readTime: "8 min read",
    author: "DevelopX Team",
    content: [
      "Most service businesses lose rankings to basic, fixable gaps rather than needing an entirely new SEO strategy. Start here before anything more advanced.",
      "Every service page needs a unique title tag and meta description that includes the service and location, written for a human first, not stuffed with repeated keywords.",
      "Your H1 should match search intent directly - 'Website Development Company in Jaipur' outperforms a vague, brand-only headline for that search.",
      "Internal linking between related service pages and city pages helps Google understand your site structure and passes authority between pages that would otherwise rank alone.",
      "Schema markup - Organization, LocalBusiness, Service and FAQ - doesn't guarantee a ranking boost on its own, but it improves how your listing appears in search results, which affects click-through rate.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
