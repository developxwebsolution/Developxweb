export type Project = {
  slug: string;
  name: string;
  client: string;
  industry: string;
  service: string;
  city: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  stack: string[];
  year: string;
  color: string;
};

export const projects: Project[] = [
  {
    slug: "vantara-interiors",
    name: "Vantara Interiors",
    client: "Vantara Interiors",
    industry: "real-estate",
    service: "website-development",
    city: "Jaipur",
    summary: "A portfolio-led site for a luxury interior design studio, rebuilt for speed and lead capture.",
    challenge:
      "Vantara's old WordPress site took over nine seconds to load its image-heavy portfolio pages on mobile, and enquiry form completions were falling well below industry benchmarks.",
    solution:
      "We rebuilt the site on Next.js with an image pipeline through Cloudinary, moved the portfolio grid to a server-rendered masonry layout, and redesigned the enquiry flow into a three-step form with project-type branching.",
    results: [
      { label: "Mobile load time", value: "9.1s → 1.8s" },
      { label: "Enquiry submissions", value: "+94%" },
      { label: "Core Web Vitals", value: "All green" },
    ],
    stack: ["Next.js", "Tailwind CSS", "Cloudinary", "Framer Motion"],
    year: "2025",
    color: "#4338CA",
  },
  {
    slug: "novara-health",
    name: "Novara Health",
    client: "Novara Health",
    industry: "healthcare",
    service: "web-application-development",
    city: "Delhi",
    summary: "A patient portal and appointment system for a multi-clinic healthcare group.",
    challenge:
      "Novara ran four clinics on phone-only booking, with front-desk staff manually reconciling a shared spreadsheet, leading to double-bookings and no-show rates above 20%.",
    solution:
      "We built a booking portal with real-time slot locking, automated SMS and email reminders, and a staff dashboard for clinic-wise scheduling, all on a Node.js and PostgreSQL backend.",
    results: [
      { label: "No-show rate", value: "22% → 8%" },
      { label: "Front-desk admin time", value: "-11 hrs/week" },
      { label: "Online bookings", value: "68% of total" },
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    year: "2025",
    color: "#0891A8",
  },
  {
    slug: "kanha-organics",
    name: "Kanha Organics",
    client: "Kanha Organics",
    industry: "ecommerce-retail",
    service: "shopify-development",
    city: "Ahmedabad",
    summary: "A headless Shopify storefront for a D2C organic foods brand scaling past its first lakh in monthly revenue.",
    challenge:
      "Kanha's default Shopify theme couldn't support their subscription model or the bundle logic their growth plan depended on, and checkout drop-off was high on mobile.",
    solution:
      "We built a custom Next.js storefront on the Shopify Storefront API, added a subscription and bundling engine, and redesigned checkout down to two steps with saved payment methods.",
    results: [
      { label: "Checkout conversion", value: "+41%" },
      { label: "Subscription revenue", value: "New: ₹6L+/mo" },
      { label: "Page speed score", value: "97/100" },
    ],
    stack: ["Next.js", "Shopify", "TypeScript", "TanStack Query"],
    year: "2024",
    color: "#C2760C",
  },
  {
    slug: "orbitline-logistics",
    name: "Orbitline Logistics",
    client: "Orbitline Logistics",
    industry: "logistics",
    service: "custom-software-development",
    city: "Mumbai",
    summary: "A fleet and shipment tracking dashboard replacing a stack of spreadsheets and WhatsApp updates.",
    challenge:
      "Orbitline's dispatch team tracked over 40 vehicles across spreadsheets and driver WhatsApp messages, with no live visibility for customers asking for shipment status.",
    solution:
      "We built a real-time dashboard with map-based fleet tracking, automated customer status pages, and role-based access for dispatchers, drivers and account managers.",
    results: [
      { label: "Status update calls", value: "-73%" },
      { label: "Dispatcher efficiency", value: "+35%" },
      { label: "Customer NPS", value: "+22 points" },
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Mapbox"],
    year: "2024",
    color: "#4338CA",
  },
  {
    slug: "meridian-law",
    name: "Meridian & Associates",
    client: "Meridian & Associates",
    industry: "legal",
    service: "website-designing",
    city: "Delhi",
    summary: "A trust-first corporate site for a litigation and corporate law practice.",
    challenge:
      "Meridian's site read like a generic template and undersold a genuinely strong partner roster, which was costing them corporate retainer enquiries to more polished competitors.",
    solution:
      "We designed an editorial-style site built around case results and partner credentials, with a practice-area navigation structure and a confidential enquiry form routed directly to partners.",
    results: [
      { label: "Qualified enquiries", value: "+58%" },
      { label: "Avg. session duration", value: "+2m 10s" },
      { label: "Bounce rate", value: "-31%" },
    ],
    stack: ["Next.js", "Sanity", "Framer Motion"],
    year: "2025",
    color: "#0891A8",
  },
  {
    slug: "pinnacle-erp",
    name: "Pinnacle Manufacturing ERP",
    client: "Pinnacle Industries",
    industry: "manufacturing",
    service: "erp-development",
    city: "Pune",
    summary: "A lightweight ERP module for inventory, purchase orders and supplier management.",
    challenge:
      "Pinnacle managed raw material inventory across three warehouses using disconnected Excel files, causing stockouts that delayed production runs.",
    solution:
      "We built a custom ERP module covering inventory, purchase orders, supplier scorecards and low-stock alerts, integrated with their existing accounting software via a scheduled sync job.",
    results: [
      { label: "Stockout incidents", value: "-64%" },
      { label: "PO processing time", value: "-52%" },
      { label: "Inventory accuracy", value: "99.2%" },
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Prisma"],
    year: "2024",
    color: "#C2760C",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
