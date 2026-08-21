export type Service = {
  slug: string;
  name: string;
  shortName: string;
  icon:
    | "code"
    | "layout"
    | "app-window"
    | "server"
    | "shopping-cart"
    | "wordpress"
    | "database"
    | "search"
    | "wrench"
    | "refresh-cw"
    | "layers"
    | "gauge"
    | "shield"
    | "smartphone";
  summary: string;
  description: string;
  features: string[];
  deliverables: string[];
  process: { title: string; detail: string }[];
  faqs: { q: string; a: string }[];
  startingPrice: string;
  timeline: string;
};

export const services: Service[] = [
  {
    slug: "website-development",
    name: "Website Development",
    shortName: "Website Development",
    icon: "code",
    summary:
      "Custom-coded, high-performance business websites built for speed, search visibility and conversions.",
    description:
      "We design and build websites on modern frameworks instead of bloated page builders, so every site we ship loads fast, ranks well and holds up as your business grows. Each engagement starts with your goals and audience, moves through wireframes and a working design system, and ends with a site your team can actually maintain.",
    features: [
      "Server-rendered pages for near-instant load times",
      "Component-based design system for consistent UI",
      "Built-in SEO structure from day one",
      "Mobile-first, tested across real devices",
      "Editable content blocks without touching code",
      "Analytics and conversion tracking wired in at launch",
    ],
    deliverables: [
      "Discovery and information architecture",
      "Custom UI/UX design in Figma",
      "Coded, responsive front end",
      "Content integration and on-page SEO",
      "Performance and accessibility audit",
      "Launch, DNS and hosting setup",
    ],
    process: [
      { title: "Discovery", detail: "We map your business goals, audience and competitors before a single screen is designed." },
      { title: "Design", detail: "Wireframes, then high-fidelity UI in Figma, reviewed with you at every stage." },
      { title: "Build", detail: "Our engineers translate approved designs into clean, tested, production code." },
      { title: "QA & Launch", detail: "Cross-browser, cross-device testing, then a monitored go-live." },
      { title: "Support", detail: "Post-launch monitoring, fixes and a handover walkthrough for your team." },
    ],
    faqs: [
      { q: "How long does a website project take?", a: "Most business websites take 3-6 weeks from signed scope to launch, depending on page count and content readiness." },
      { q: "Will I be able to edit the site myself?", a: "Yes. We build on a CMS or structured content layer so your team can update text, images and blog posts without a developer." },
      { q: "Do you write the content too?", a: "We offer content strategy and copywriting as an add-on, or we can build around content you supply." },
    ],
    startingPrice: "₹35,000",
    timeline: "3-6 weeks",
  },
  {
    slug: "website-designing",
    name: "Website Designing",
    shortName: "Website Design",
    icon: "layout",
    summary:
      "UI/UX design that reflects your brand, guides visitors to act, and looks sharp on every screen.",
    description:
      "Good design is a business decision. Our design team researches your audience, maps the journey a visitor should take, and designs interfaces that make the next step obvious - whether that's a call, a form fill or a purchase. We hand off pixel-accurate Figma files and a reusable design system, not just a set of static screens.",
    features: [
      "Custom visual identity, not a template",
      "User journey mapping before UI work begins",
      "Responsive layouts for mobile, tablet and desktop",
      "Reusable component library",
      "Conversion-focused layout and CTA placement",
      "Accessible colour contrast and typography",
    ],
    deliverables: [
      "Mood boards and visual direction",
      "Wireframes and user flows",
      "High-fidelity Figma designs",
      "Design system and component library",
      "Developer handoff specs",
    ],
    process: [
      { title: "Research", detail: "Competitor scan, audience notes and content inventory." },
      { title: "Wireframe", detail: "Low-fidelity structure so layout decisions happen before visual polish." },
      { title: "Visual design", detail: "Typography, colour and imagery applied to every screen." },
      { title: "Prototype", detail: "Clickable prototype so you can test the flow before development." },
      { title: "Handoff", detail: "Structured files and specs delivered to your dev team or ours." },
    ],
    faqs: [
      { q: "Do you design in Figma?", a: "Yes, all design work is delivered in Figma with organised layers, components and a shared design system." },
      { q: "Can you redesign our existing site without changing the backend?", a: "Yes, we regularly deliver a new UI layer that plugs into an existing CMS or codebase." },
    ],
    startingPrice: "₹20,000",
    timeline: "2-4 weeks",
  },
  {
    slug: "web-application-development",
    name: "Web Application Development",
    shortName: "Web Apps",
    icon: "app-window",
    summary:
      "Custom web applications and internal tools built to handle real business logic, not just content.",
    description:
      "When a website isn't enough, we build applications - dashboards, booking systems, marketplaces, internal tools - with proper authentication, role-based access and data models behind them. We work in short sprints so you see working software early, not just a spec document.",
    features: [
      "Role-based authentication and permissions",
      "Real-time data with WebSockets where needed",
      "Scalable relational database design",
      "API-first architecture for future integrations",
      "Automated testing on critical flows",
      "Cloud deployment with CI/CD",
    ],
    deliverables: [
      "Technical architecture document",
      "Database schema and API design",
      "Working application in weekly sprints",
      "Test coverage on core flows",
      "Deployment pipeline and staging environment",
    ],
    process: [
      { title: "Scoping", detail: "We break the product into modules and agree an MVP feature set." },
      { title: "Architecture", detail: "Database schema, API contracts and infra decisions made upfront." },
      { title: "Sprints", detail: "Two-week build cycles with a demo at the end of each." },
      { title: "Testing", detail: "Automated tests on the flows that matter most to your business." },
      { title: "Launch & scale", detail: "Production deployment with monitoring and a scaling plan." },
    ],
    faqs: [
      { q: "Can you build an MVP quickly?", a: "Yes, we regularly scope MVPs to a 6-10 week build by focusing on the smallest feature set that proves the idea." },
      { q: "Who owns the code?", a: "You do. Full source code and infrastructure access is handed over at project completion." },
    ],
    startingPrice: "₹1,50,000",
    timeline: "8-16 weeks",
  },
  {
    slug: "nextjs-development",
    name: "Next.js Development",
    shortName: "Next.js",
    icon: "layers",
    summary:
      "React-based, server-rendered applications on Next.js for speed, SEO and a modern developer experience.",
    description:
      "Next.js is our default framework for anything that needs to rank on Google and feel instant to visitors. We use server components, streaming and edge caching to keep pages fast, while keeping the codebase maintainable for your team long after launch.",
    features: [
      "App Router with React Server Components",
      "Static generation for marketing pages, dynamic rendering for app pages",
      "Image and font optimisation out of the box",
      "Edge-ready deployment on Vercel or your infra",
      "TypeScript across the codebase",
      "Built-in metadata and structured data support",
    ],
    deliverables: [
      "Next.js codebase in TypeScript",
      "Component library in React",
      "SEO metadata and schema wired per page",
      "CI/CD pipeline to your hosting of choice",
    ],
    process: [
      { title: "Architecture", detail: "Route structure, rendering strategy and data layer planned first." },
      { title: "Build", detail: "Components built with server/client boundaries chosen deliberately." },
      { title: "Optimise", detail: "Core Web Vitals tuned before launch, not after." },
      { title: "Ship", detail: "Deployed with monitoring and rollback in place." },
    ],
    faqs: [
      { q: "Why Next.js over plain React?", a: "Next.js gives you server rendering, routing and SEO tooling out of the box, so pages load faster and rank better without custom infrastructure." },
      { q: "Can you migrate our existing React app to Next.js?", a: "Yes, we've run several incremental migrations from CRA and Vite apps to Next.js." },
    ],
    startingPrice: "₹60,000",
    timeline: "4-10 weeks",
  },
  {
    slug: "react-development",
    name: "React Development",
    shortName: "React",
    icon: "code",
    summary:
      "Interactive interfaces and single-page applications built in React with clean, testable component architecture.",
    description:
      "For dashboards, admin panels and highly interactive interfaces, we build in React with a component structure that's easy to extend. State management, data fetching and testing are set up from the first sprint, not bolted on later.",
    features: [
      "Component-driven architecture",
      "State management with Zustand or Redux Toolkit",
      "Data fetching and caching with TanStack Query",
      "Form handling with React Hook Form and Zod",
      "Unit and integration tests on key components",
    ],
    deliverables: [
      "React codebase with documented component library",
      "State and data-fetching layer",
      "Test suite for critical components",
    ],
    process: [
      { title: "Component audit", detail: "We map the UI into a reusable component hierarchy." },
      { title: "Build", detail: "Components built bottom-up with Storybook-style isolation." },
      { title: "Integrate", detail: "Wired to your API with caching and error states handled." },
      { title: "Test & ship", detail: "Key flows covered by tests before release." },
    ],
    faqs: [
      { q: "Do you use Redux or Context?", a: "We choose based on app size - Zustand or Context for smaller apps, Redux Toolkit when state complexity justifies it." },
    ],
    startingPrice: "₹50,000",
    timeline: "4-8 weeks",
  },
  {
    slug: "nodejs-development",
    name: "Node.js Development",
    shortName: "Node.js",
    icon: "server",
    summary:
      "Backend APIs and services built on Node.js for reliable, scalable server-side logic.",
    description:
      "We build REST and GraphQL APIs on Node.js with a focus on clear boundaries, validated inputs and predictable error handling. Whether it's the backend for a web app or a service layer connecting third-party systems, we design it to be maintained by more than one engineer.",
    features: [
      "REST or GraphQL API design",
      "Input validation with Zod at every boundary",
      "Queue-based background jobs for heavy tasks",
      "Structured logging and error monitoring",
      "Rate limiting and abuse protection",
    ],
    deliverables: [
      "API documentation",
      "Node.js service codebase",
      "Database migrations and seed scripts",
      "Deployment configuration",
    ],
    process: [
      { title: "API design", detail: "Endpoints and contracts agreed before implementation." },
      { title: "Build", detail: "Services built with tests around business-critical logic." },
      { title: "Secure", detail: "Rate limiting, validation and auth hardened before launch." },
      { title: "Deploy", detail: "Containerised deployment with monitoring." },
    ],
    faqs: [
      { q: "Can you integrate payment gateways?", a: "Yes, we've integrated Razorpay, Stripe, PayU and Cashfree into Node.js backends." },
    ],
    startingPrice: "₹45,000",
    timeline: "4-8 weeks",
  },
  {
    slug: "wordpress-development",
    name: "WordPress Development",
    shortName: "WordPress",
    icon: "layout",
    summary:
      "Custom WordPress themes and plugins for businesses that need an easy-to-edit, budget-friendly site.",
    description:
      "We build WordPress sites the right way - custom themes instead of bloated page builders, only the plugins you actually need, and a content structure your team can manage without breaking the layout. Good for businesses that want editorial control without hiring a developer for every change.",
    features: [
      "Custom theme built to your design, not a marketplace template",
      "Gutenberg block editor set up for your content types",
      "Lightweight plugin stack for faster load times",
      "WooCommerce for stores that need it",
      "Security hardening and update management",
    ],
    deliverables: [
      "Custom WordPress theme",
      "Configured plugin stack",
      "Content migration if needed",
      "Editor training for your team",
    ],
    process: [
      { title: "Design", detail: "Custom UI designed for your brand, not picked from a theme store." },
      { title: "Build", detail: "Theme coded from scratch with clean, minimal plugin dependencies." },
      { title: "Content", detail: "Your content migrated and structured for easy future edits." },
      { title: "Launch", detail: "Security hardening, caching and go-live." },
    ],
    faqs: [
      { q: "Will I be locked into page builders?", a: "No, we avoid heavy builders like Elementor unless you specifically want one, since they slow sites down." },
    ],
    startingPrice: "₹18,000",
    timeline: "2-4 weeks",
  },
  {
    slug: "shopify-development",
    name: "Shopify Development",
    shortName: "Shopify",
    icon: "shopping-cart",
    summary:
      "Custom Shopify storefronts and app integrations built to convert browsers into buyers.",
    description:
      "We build and customise Shopify stores with a focus on checkout speed, mobile conversion and clean theme code. From a fresh store setup to custom Liquid theme development and app integrations, we handle the parts that determine whether a store actually sells.",
    features: [
      "Custom Liquid theme development",
      "Mobile-optimised, fast-loading storefronts",
      "Payment gateway and shipping integration for India",
      "App integrations for reviews, upsells and email",
      "Conversion-focused product and checkout pages",
    ],
    deliverables: [
      "Custom Shopify theme",
      "Configured apps and integrations",
      "Product catalogue setup",
      "Store launch checklist",
    ],
    process: [
      { title: "Store strategy", detail: "Catalogue structure, collections and navigation planned first." },
      { title: "Theme build", detail: "Custom Liquid theme built to your brand and product mix." },
      { title: "Integrate", detail: "Payments, shipping and marketing apps connected." },
      { title: "Launch", detail: "Store tested end-to-end before going live." },
    ],
    faqs: [
      { q: "Can you migrate our store from another platform?", a: "Yes, we've migrated stores from WooCommerce, Magento and custom builds onto Shopify." },
    ],
    startingPrice: "₹40,000",
    timeline: "3-6 weeks",
  },
  {
    slug: "laravel-development",
    name: "Laravel Development",
    shortName: "Laravel",
    icon: "server",
    summary:
      "Robust PHP backends built on Laravel for content-heavy platforms and custom business systems.",
    description:
      "Laravel remains one of the most productive frameworks for building admin-heavy platforms quickly without sacrificing structure. We use it for CMS-driven sites, internal systems and platforms that need Eloquent's data modelling strengths.",
    features: [
      "Eloquent ORM for clean data modelling",
      "Built-in authentication and authorisation",
      "Queue and job scheduling for background work",
      "Blade or API-only architecture depending on your needs",
      "Artisan-based deployment tooling",
    ],
    deliverables: [
      "Laravel codebase with migrations",
      "Admin panel where required",
      "API documentation",
      "Deployment scripts",
    ],
    process: [
      { title: "Data modelling", detail: "Schema and relationships designed around your business logic." },
      { title: "Build", detail: "Controllers, models and views or API endpoints implemented." },
      { title: "Test", detail: "Feature tests on core business flows." },
      { title: "Deploy", detail: "Production deployment with queue workers configured." },
    ],
    faqs: [
      { q: "Is Laravel a good fit for our project?", a: "It's a strong choice for content-driven platforms and internal systems with complex data relationships." },
    ],
    startingPrice: "₹45,000",
    timeline: "4-9 weeks",
  },
  {
    slug: "php-development",
    name: "PHP Development",
    shortName: "PHP",
    icon: "server",
    summary:
      "Reliable custom PHP development for businesses maintaining or extending existing systems.",
    description:
      "Not every project needs a full framework rewrite. We maintain, extend and modernise existing PHP codebases, and build lightweight custom PHP systems where a heavier framework isn't justified.",
    features: [
      "Legacy codebase audits and modernisation",
      "Custom PHP systems without framework overhead",
      "MySQL/PostgreSQL database design",
      "Security patching for outdated systems",
    ],
    deliverables: [
      "Codebase audit report",
      "Refactored or new PHP application",
      "Database schema documentation",
    ],
    process: [
      { title: "Audit", detail: "We review the existing codebase for risks and technical debt." },
      { title: "Plan", detail: "Agree what to refactor, replace or leave as-is." },
      { title: "Build", detail: "Changes implemented with regression testing." },
      { title: "Deploy", detail: "Rolled out with a rollback plan in place." },
    ],
    faqs: [
      { q: "Can you take over a project another developer built?", a: "Yes, codebase handovers are a regular part of our work." },
    ],
    startingPrice: "₹25,000",
    timeline: "2-6 weeks",
  },
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    shortName: "Custom Software",
    icon: "database",
    summary:
      "Bespoke software built around your exact workflow, not adapted from off-the-shelf tools.",
    description:
      "When off-the-shelf software forces your team into someone else's workflow, we build the alternative - software modelled on how your business actually operates, from internal tools to customer-facing platforms.",
    features: [
      "Requirements workshops with your operational team",
      "Custom data models matched to your workflow",
      "Integration with existing tools you already use",
      "Scalable architecture for future modules",
    ],
    deliverables: [
      "Requirements and architecture document",
      "Working software in staged releases",
      "Integration with existing systems",
      "Documentation and training",
    ],
    process: [
      { title: "Discovery workshops", detail: "We sit with your team to understand the real workflow, not just the request." },
      { title: "Architecture", detail: "System design agreed before code is written." },
      { title: "Iterative build", detail: "Delivered in stages so you can course-correct early." },
      { title: "Rollout", detail: "Phased rollout with training for your team." },
    ],
    faqs: [
      { q: "How do you scope a custom software project?", a: "We run structured discovery workshops to convert your operational process into a technical specification before estimating." },
    ],
    startingPrice: "₹2,00,000",
    timeline: "10-20 weeks",
  },
  {
    slug: "crm-development",
    name: "CRM Development",
    shortName: "CRM",
    icon: "database",
    summary:
      "Custom CRM systems built around your actual sales process instead of a generic pipeline.",
    description:
      "Generic CRMs force your sales team to adapt to someone else's stages and fields. We build CRMs that match your real sales process, with the automations and reporting your team actually uses.",
    features: [
      "Custom pipeline stages matched to your sales process",
      "Lead scoring and automated follow-up reminders",
      "Role-based access for sales, support and management",
      "Reporting dashboards for pipeline visibility",
      "Integrations with WhatsApp, email and call tools",
    ],
    deliverables: [
      "Custom CRM application",
      "Admin and reporting dashboard",
      "Integration with your communication tools",
      "Team onboarding",
    ],
    process: [
      { title: "Process mapping", detail: "We document your current sales stages and pain points." },
      { title: "Design", detail: "Pipeline, fields and automations designed around that process." },
      { title: "Build", detail: "CRM built in sprints with your sales team testing along the way." },
      { title: "Rollout", detail: "Data migration and team training before go-live." },
    ],
    faqs: [
      { q: "Why not just use Zoho or HubSpot?", a: "Off-the-shelf CRMs work well for standard processes. We build custom when your workflow, integrations or reporting needs don't fit a generic tool." },
    ],
    startingPrice: "₹1,20,000",
    timeline: "8-14 weeks",
  },
  {
    slug: "erp-development",
    name: "ERP Development",
    shortName: "ERP",
    icon: "database",
    summary:
      "Custom ERP modules connecting inventory, orders, finance and operations in one system.",
    description:
      "We build ERP systems and individual modules - inventory, procurement, order management, finance - designed to talk to each other and to the tools you already run your business on.",
    features: [
      "Modular architecture - start with one module, expand later",
      "Real-time inventory and order tracking",
      "Role-based dashboards per department",
      "Reporting and export tools for finance and operations",
    ],
    deliverables: [
      "Custom ERP modules",
      "Integration with accounting or inventory tools",
      "Admin dashboards per department",
      "Documentation and training",
    ],
    process: [
      { title: "Module scoping", detail: "We identify which modules deliver value first." },
      { title: "Data architecture", detail: "Schema designed to connect modules cleanly." },
      { title: "Build in phases", detail: "Modules delivered and tested one at a time." },
      { title: "Rollout", detail: "Phased department-by-department rollout." },
    ],
    faqs: [
      { q: "Can we start with just one module?", a: "Yes, most of our ERP engagements start with one high-impact module and expand from there." },
    ],
    startingPrice: "₹2,50,000",
    timeline: "12-24 weeks",
  },
  {
    slug: "landing-page-design",
    name: "Landing Page Design",
    shortName: "Landing Pages",
    icon: "layout",
    summary:
      "High-converting landing pages built for a single campaign goal, with copy and design tested to convert.",
    description:
      "A landing page has one job. We design and build focused pages for ad campaigns, product launches and lead generation, with layout, copy and CTA placement built around a single conversion goal rather than trying to cover everything.",
    features: [
      "Single-goal layout with a clear conversion path",
      "Fast load times to protect ad campaign quality scores",
      "A/B test-ready structure",
      "Form or checkout integration",
      "Built-in analytics and pixel tracking",
    ],
    deliverables: [
      "Custom landing page design and build",
      "Copywriting support if needed",
      "Analytics and conversion tracking setup",
    ],
    process: [
      { title: "Goal definition", detail: "We agree the single action the page should drive." },
      { title: "Design", detail: "Layout built around that one goal, no distractions." },
      { title: "Build", detail: "Fast, tracked, and ready for ad traffic." },
      { title: "Launch & test", detail: "Live with tracking so you can measure and iterate." },
    ],
    faqs: [
      { q: "Can you write the copy too?", a: "Yes, conversion copywriting is available as part of the landing page package." },
    ],
    startingPrice: "₹12,000",
    timeline: "1-2 weeks",
  },
  {
    slug: "seo-services",
    name: "SEO Services",
    shortName: "SEO",
    icon: "search",
    summary:
      "Technical and content SEO to help your site rank, get found, and convert organic traffic.",
    description:
      "SEO only works when technical foundations, content and links move together. We audit your site's technical health, fix what's holding rankings back, and build a content and link strategy around keywords that actually bring buyers.",
    features: [
      "Technical SEO audit and fixes",
      "Keyword research mapped to buyer intent",
      "On-page optimisation across key pages",
      "Content strategy and topic clusters",
      "Local SEO and Google Business Profile optimisation",
      "Monthly reporting on rankings and traffic",
    ],
    deliverables: [
      "Technical SEO audit report",
      "Keyword and content plan",
      "On-page optimisation across priority pages",
      "Monthly performance reports",
    ],
    process: [
      { title: "Audit", detail: "Full technical and on-page audit against current rankings." },
      { title: "Strategy", detail: "Keyword clusters mapped to pages and content gaps." },
      { title: "Execute", detail: "Technical fixes, on-page changes and content published." },
      { title: "Track", detail: "Monthly reporting with adjustments based on real data." },
    ],
    faqs: [
      { q: "How long until we see results?", a: "Meaningful ranking movement typically starts in 8-12 weeks, with compounding results over 6+ months." },
    ],
    startingPrice: "₹15,000/mo",
    timeline: "Ongoing",
  },
  {
    slug: "website-maintenance",
    name: "Website Maintenance",
    shortName: "Maintenance",
    icon: "wrench",
    summary:
      "Ongoing updates, security patches and monitoring so your site stays fast and online.",
    description:
      "Websites need upkeep. We handle updates, backups, uptime monitoring and small content changes so your site stays secure and your team doesn't have to think about it.",
    features: [
      "Regular security and dependency updates",
      "Automated backups",
      "Uptime and performance monitoring",
      "Priority bug fixes",
      "Monthly content or design tweaks",
    ],
    deliverables: [
      "Monthly maintenance report",
      "Backup and monitoring setup",
      "Agreed SLA for fixes",
    ],
    process: [
      { title: "Audit", detail: "We review current hosting, backups and update status." },
      { title: "Setup", detail: "Monitoring and backup systems put in place." },
      { title: "Maintain", detail: "Ongoing updates and fixes within your SLA." },
      { title: "Report", detail: "Monthly summary of what was done and site health." },
    ],
    faqs: [
      { q: "What's included in the SLA?", a: "Response times and fix windows are agreed upfront based on your plan tier, typically 24-48 hours for non-critical issues." },
    ],
    startingPrice: "₹4,999/mo",
    timeline: "Ongoing",
  },
  {
    slug: "website-redesign",
    name: "Website Redesign",
    shortName: "Redesign",
    icon: "refresh-cw",
    summary:
      "Rebuild an outdated site into something faster, better looking and easier to convert with.",
    description:
      "If your site is slow, dated or hard to update, a redesign gets you back on modern footing without starting your content and SEO equity from zero. We preserve what's working - rankings, URLs, brand recognition - and rebuild what isn't.",
    features: [
      "SEO-safe URL and redirect mapping",
      "Modern, fast front end replacing legacy code",
      "Content audit before migration",
      "Design refresh aligned to current brand",
    ],
    deliverables: [
      "Redesign scope and content audit",
      "New coded front end",
      "301 redirect map",
      "Post-launch ranking monitoring",
    ],
    process: [
      { title: "Audit", detail: "We review current performance, rankings and content before touching design." },
      { title: "Design", detail: "New UI designed against current brand and conversion goals." },
      { title: "Build & migrate", detail: "Rebuilt with a full redirect map to protect SEO." },
      { title: "Launch & monitor", detail: "Rankings and traffic tracked closely post-launch." },
    ],
    faqs: [
      { q: "Will we lose our Google rankings?", a: "Not if redirects are mapped correctly - this is one of the first things we plan, before any design work starts." },
    ],
    startingPrice: "₹40,000",
    timeline: "4-8 weeks",
  },
  {
    slug: "admin-dashboard-development",
    name: "Admin Dashboard Development",
    shortName: "Admin Dashboards",
    icon: "gauge",
    summary:
      "Internal dashboards that give your team the data and controls they need, nothing they don't.",
    description:
      "We build admin panels and internal dashboards designed around what your team actually does daily - not a generic CRUD interface. Role-based views, real data visualisation, and controls that map to real actions.",
    features: [
      "Role-based dashboard views",
      "Real-time data visualisation",
      "Bulk actions and export tools",
      "Audit logs for accountability",
    ],
    deliverables: [
      "Custom admin dashboard",
      "Role and permission setup",
      "Reporting and export tools",
    ],
    process: [
      { title: "Workflow mapping", detail: "We identify what each role needs to see and do daily." },
      { title: "Design", detail: "Dashboard layout built around those workflows." },
      { title: "Build", detail: "Data views, actions and permissions implemented." },
      { title: "Rollout", detail: "Team onboarding and feedback-driven refinement." },
    ],
    faqs: [
      { q: "Can this connect to our existing database?", a: "Yes, we regularly build dashboards on top of existing production databases without disrupting them." },
    ],
    startingPrice: "₹80,000",
    timeline: "6-10 weeks",
  },
  {
    slug: "cms-development",
    name: "CMS Development",
    shortName: "CMS",
    icon: "layers",
    summary:
      "Content management systems that let your team publish without needing a developer.",
    description:
      "We build custom CMS layers - or configure headless CMS platforms - so your content team can publish and update pages independently, with the structure and validation to keep things from breaking.",
    features: [
      "Custom content models matched to your site structure",
      "Headless CMS options for multi-channel publishing",
      "Draft, preview and publish workflows",
      "Role-based editor permissions",
    ],
    deliverables: [
      "Configured CMS with content models",
      "Editor training and documentation",
      "Preview and publishing workflow",
    ],
    process: [
      { title: "Content modelling", detail: "We map your content types into structured models." },
      { title: "Build", detail: "CMS configured or built around those models." },
      { title: "Integrate", detail: "Connected to your front end with preview support." },
      { title: "Train", detail: "Your content team onboarded to publish independently." },
    ],
    faqs: [
      { q: "Headless or traditional CMS?", a: "We recommend headless for multi-channel needs (web, app, more), traditional for a single website with simpler needs." },
    ],
    startingPrice: "₹35,000",
    timeline: "3-6 weeks",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
