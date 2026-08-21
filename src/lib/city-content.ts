import type { City } from "@/data/cities";

export function cityFaqs(city: City): { q: string; a: string }[] {
  return [
    {
      q: `How much does a website cost in ${city.name}?`,
      a: `A custom business website in ${city.name} typically starts around ₹35,000, with most projects landing between ₹45,000 and ₹1,50,000 depending on page count, custom design work and functionality. Web applications and e-commerce builds run higher. You'll get a fixed quote after a short scoping call, not a vague range.`,
    },
    {
      q: `Do you work with businesses outside ${city.businessHubs[0]} and ${city.businessHubs[1]}?`,
      a: `Yes — we work with businesses across all of ${city.name} and the wider ${city.state} region, not just the areas around ${city.businessHubs[0]}. Most of our process happens over calls and shared documents, so your office location within the city doesn't affect how we work together.`,
    },
    {
      q: `How long does a website project take in ${city.name}?`,
      a: `A standard business website takes 3-6 weeks from kickoff to launch. Web applications and custom software for ${city.name} clients typically run 8-20 weeks depending on scope. You'll get a specific date range before any work begins, not an open-ended estimate.`,
    },
    {
      q: `Can you redesign our existing website without losing our Google rankings?`,
      a: `Yes. Before touching anything, we audit your current ${city.name} search rankings and traffic sources, then build a full URL redirect map so the new site inherits your existing search equity instead of starting from zero.`,
    },
    {
      q: `Do we need to meet in person, or can this be done remotely?`,
      a: `Both work. Being based in ${city.state === "Rajasthan" ? "the same state" : "India"}, we can arrange an in-person kickoff for ${city.name} clients who prefer it, but the majority of our current clients — including several in ${city.name} — run the entire project remotely with scheduled video calls.`,
    },
    {
      q: `What happens after our ${city.name} website launches?`,
      a: `Every project includes a warranty period covering bug fixes at no extra cost. After that, we offer monthly maintenance plans for updates, security monitoring, backups and small content changes, so your site doesn't go stale six months after launch.`,
    },
    {
      q: `Will our website actually rank on Google for ${city.name} searches?`,
      a: `We build every site with technical SEO fundamentals in place from day one — clean URL structure, proper heading hierarchy, schema markup and fast load times — which gives you a real foundation to rank on. Ranking itself also depends on ongoing content and competition, so if organic search is a core goal, we recommend pairing your build with our SEO services rather than treating the website alone as a ranking guarantee.`,
    },
    {
      q: `Can you build a website in a regional language alongside English for our ${city.name} customers?`,
      a: `Yes — we regularly build multilingual sites with a regional language alongside English, with proper hreflang tagging so search engines serve the right version to the right audience instead of treating it as duplicate content.`,
    },
  ];
}

export function cityIntroExtra(city: City): string {
  return `Businesses in ${city.name} increasingly compete for attention online well beyond their immediate neighbourhood — a ${city.localIndustries[0].replace("-", " ")} company based near ${city.businessHubs[0]} is often being compared, in the same search result page, against national and even international competitors. A website that loads slowly, looks dated, or wasn't built with search visibility in mind puts that business at a real disadvantage before a potential customer has even picked up the phone. That's the gap DevelopX Web is built to close: websites and web applications engineered specifically to perform well in ${city.name}'s competitive landscape, not generic templates dressed up with local keywords.`;
}

export function cityProcessNote(city: City): string {
  return `When we take on a project for a ${city.name}-based business, the process starts the same way it does everywhere else: a scoping call to understand your goals, audience and current online presence, followed by a written brief you can review before any design work starts. What changes for ${city.name} clients is context — we factor in the specific competitive pressure of your local market, whether that means the export houses and manufacturers around ${city.businessHubs[0]}, or the service businesses and startups clustered near ${city.businessHubs[1] ?? city.businessHubs[0]}.`;
}

export function cityServiceNote(city: City): string {
  return `Whether you need website designing for a first-time online presence or a full website development build with custom functionality, our approach for ${city.name} clients starts the same way: understanding what your ${city.businessHubs[0]}-area customers actually search for and click on, then designing and building toward that — not toward a generic checklist of "modern website" features that don't move a specific business forward. A ${city.localIndustries[0].replace("-", " ")} company needs a fundamentally different site structure than a ${(city.localIndustries[1] ?? city.localIndustries[0]).replace("-", " ")} business, even if both are technically "just a website," and we scope for that difference from the first call.`;
}

export function cityLocalSeoNote(city: City): string {
  return `Search behaviour in ${city.name} skews heavily mobile, and Google's local ranking signals weigh page speed and mobile usability more heavily every year — which is exactly where most existing ${city.name} business websites fall short. We build every site with Core Web Vitals as a hard requirement, not an afterthought fixed post-launch: optimised images, minimal JavaScript shipped to the browser, and server-rendered pages that show meaningful content before any script has to run. For a ${city.name} business competing for local search visibility around ${city.businessHubs[0]} or ${city.businessHubs[1] ?? city.businessHubs[0]}, that technical foundation often matters more to your ranking than any single piece of content on the page.`;
}

export function cityWhyLocalMatters(city: City): string {
  return `Beyond the technical build, we structure every ${city.name} project around a simple question: what does someone searching for a ${city.localIndustries[0].replace("-", " ")} business in ${city.state} actually need to see in the first five seconds to trust your business over the next tab they have open? For most ${city.name} businesses we've worked with, that answer has nothing to do with flashy animation and everything to do with clear pricing signals, real project or product photos instead of stock imagery, and a contact path that doesn't require six clicks to find.`;
}


