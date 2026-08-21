export type Industry = {
  slug: string;
  name: string;
  summary: string;
};

export const industries: Industry[] = [
  { slug: "healthcare", name: "Healthcare", summary: "Patient portals, clinic websites and appointment systems built for trust and compliance." },
  { slug: "real-estate", name: "Real Estate", summary: "Property listing platforms, broker sites and virtual tour integrations that convert leads." },
  { slug: "education", name: "Education", summary: "Institute websites, LMS platforms and admission portals for schools and ed-tech." },
  { slug: "ecommerce-retail", name: "E-commerce & Retail", summary: "Storefronts and marketplaces engineered for checkout speed and repeat purchases." },
  { slug: "finance-fintech", name: "Finance & Fintech", summary: "Secure dashboards, calculators and compliant web platforms for financial products." },
  { slug: "hospitality-travel", name: "Hospitality & Travel", summary: "Booking engines, hotel sites and travel platforms with real-time availability." },
  { slug: "manufacturing", name: "Manufacturing", summary: "B2B catalogues, inventory dashboards and supplier portals for industrial businesses." },
  { slug: "logistics", name: "Logistics & Supply Chain", summary: "Tracking dashboards, fleet portals and order management systems." },
  { slug: "legal", name: "Legal Services", summary: "Professional, trust-building websites and client portals for law firms." },
  { slug: "startups-saas", name: "Startups & SaaS", summary: "Product websites, onboarding flows and dashboards built to move fast without breaking." },
  { slug: "restaurants-food", name: "Restaurants & Food", summary: "Ordering systems, menu sites and reservation platforms for food businesses." },
  { slug: "nonprofit-ngo", name: "Non-Profit & NGO", summary: "Donation platforms and outreach websites built for trust and easy giving." },
];

export function getIndustryBySlug(slug: string) {
  return industries.find((i) => i.slug === slug);
}
