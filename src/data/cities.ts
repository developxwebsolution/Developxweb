export type City = {
  slug: string; // e.g. "jaipur" -> route /web-development-company-jaipur
  name: string;
  state: string;
  population: string;
  lat: number;
  lng: number;
  businessHubs: string[];
  localIndustries: string[]; // industry slugs
  intro: string;
  landscape: string;
  whyUs: string;
  caseStudy: { client: string; industry: string; result: string };
  nearby: string[]; // city slugs
};

export const cities: City[] = [
  {
    slug: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    population: "3.9 million",
    lat: 26.9124,
    lng: 75.7873,
    businessHubs: ["Malviya Nagar", "C-Scheme", "Vaishali Nagar", "Sitapura Industrial Area", "Tonk Road"],
    localIndustries: ["real-estate", "manufacturing", "hospitality-travel", "ecommerce-retail"],
    intro:
      "Jaipur's business scene has moved well past its tourism-and-handicrafts reputation. Between the export houses around Sitapura, the real estate developers expanding along Ajmer Road, and a growing cluster of D2C brands shipping out of Vaishali Nagar, the city has a genuine base of companies that need more than a brochure website. DevelopX Web is based in Jaipur, and we build websites and web applications for businesses across C-Scheme, Malviya Nagar and the wider NCR corridor who need a site built on modern code, not a page-builder template.",
    landscape:
      "Being headquartered here means we've watched Jaipur's commercial map shift firsthand - gem and jewellery exporters near Johari Bazaar digitising their B2B catalogues, hospitality groups around Amer and Civil Lines needing booking engines that don't fall over during wedding season traffic spikes, and a steady wave of Malviya Nagar-based startups outgrowing their first WordPress site. Local businesses here tend to compete both within Rajasthan and against Delhi-NCR players, which makes site speed and search visibility a genuine competitive factor, not a nice-to-have.",
    whyUs:
      "Because we're a Jaipur company ourselves, project calls happen in your time zone, on your schedule, and we know the local business context - from GST invoicing quirks to why your wedding-season traffic spikes need a hosting plan that can take it. You also get the option of an in-person kickoff meeting, something a Bengaluru or Gurgaon-based agency can't offer as easily.",
    caseStudy: {
      client: "a Malviya Nagar-based jewellery export house",
      industry: "manufacturing",
      result: "cut their B2B enquiry response time from days to hours with a self-service product catalogue and quote request system",
    },
    nearby: ["ahmedabad", "gurgaon", "delhi"],
  },
  {
    slug: "delhi",
    name: "Delhi",
    state: "Delhi",
    population: "32 million (NCR)",
    lat: 28.6139,
    lng: 77.2090,
    businessHubs: ["Connaught Place", "Nehru Place", "Karol Bagh", "Okhla Industrial Area", "Lajpat Nagar"],
    localIndustries: ["finance-fintech", "legal", "startups-saas", "ecommerce-retail"],
    intro:
      "Delhi's market is dense, competitive, and unforgiving of a slow website. With Nehru Place's IT trade sitting alongside Connaught Place's corporate offices and Okhla's manufacturing and export base, the city runs on businesses that already know what a professional website should feel like - because they've seen good and bad versions of one. DevelopX Web builds websites and web applications for Delhi businesses that need to hold their own against well-funded, design-conscious competitors.",
    landscape:
      "The competitive intensity in Delhi means a generic template site gets noticed for the wrong reasons. Law firms around Saket and financial services firms near Barakhamba Road are judged on polish and trust signals within seconds of a page loading. Meanwhile Okhla's manufacturing exporters need functional, fast B2B catalogue sites more than flashy animation. We scope each Delhi project around which of those two worlds a client is actually competing in.",
    whyUs:
      "Delhi clients get the same senior team from discovery through launch - no handoff to a junior team mid-project, which is a common complaint we hear about larger Delhi-based agencies. We also build with NCR's traffic patterns in mind: sites tested for the mobile networks and devices your actual customers are using, not just a fast office wifi connection.",
    caseStudy: {
      client: "a Nehru Place-based IT hardware distributor",
      industry: "startups-saas",
      result: "replaced a five-year-old static site with a searchable product catalogue that cut sales team time spent on manual quote emails by roughly a third",
    },
    nearby: ["gurgaon", "noida", "jaipur"],
  },
  {
    slug: "noida",
    name: "Noida",
    state: "Uttar Pradesh",
    population: "700,000+",
    lat: 28.5355,
    lng: 77.3910,
    businessHubs: ["Sector 62", "Sector 18", "Sector 132", "Film City", "Noida Special Economic Zone"],
    localIndustries: ["startups-saas", "manufacturing", "ecommerce-retail", "logistics"],
    intro:
      "Noida's Sector 62 and Sector 132 IT corridors have made it one of NCR's most concentrated tech hubs, home to everything from early-stage SaaS startups to established IT services firms. DevelopX Web works with Noida businesses that understand the technical bar their own industry sets, and expect their agency to meet it - clean code, sensible architecture, and a site that performs under real engineering scrutiny.",
    landscape:
      "A software company in Sector 62 evaluating our work reads the page source before reading the copy, and that shapes how we approach every Noida project - performance budgets, accessible markup and genuine mobile responsiveness aren't upsells here, they're the baseline expectation. Noida's manufacturing base around the Special Economic Zone runs alongside this tech corridor, and those businesses need equally solid but more catalogue-and-lead-focused sites.",
    whyUs:
      "We build in the same stack many Noida tech companies run internally - Next.js, React, TypeScript - so your own engineering team can review, extend or eventually take over the codebase without translation friction. For non-technical businesses in the sector, we handle the same complexity without expecting you to understand any of it.",
    caseStudy: {
      client: "a Sector 62 SaaS startup",
      industry: "startups-saas",
      result: "launched a new marketing site and onboarding flow in five weeks ahead of a funding announcement, with Lighthouse performance scores above 95",
    },
    nearby: ["delhi", "gurgaon", "jaipur"],
  },
  {
    slug: "gurgaon",
    name: "Gurgaon",
    state: "Haryana",
    population: "1.2 million",
    lat: 28.4595,
    lng: 77.0266,
    businessHubs: ["Cyber City", "MG Road", "Golf Course Road", "Udyog Vihar", "Sector 44"],
    localIndustries: ["finance-fintech", "startups-saas", "real-estate", "legal"],
    intro:
      "Cyber City and Golf Course Road host some of India's most design-literate companies - MNC headquarters, funded startups and premium real estate developers who've all seen what a genuinely well-built website looks like. DevelopX Web builds for Gurgaon businesses in that bracket: companies where a template-feeling website would actively undermine the brand they've built everywhere else.",
    landscape:
      "Real estate developers around Golf Course Road need property showcase sites that load instantly on a prospective buyer's phone during a site visit. Financial services firms in Cyber City need interfaces that read as secure and credible at a glance. Udyog Vihar's manufacturing and industrial businesses need something more functional - fast catalogues and enquiry systems over heavy animation. We scope the design direction around which of these a Gurgaon client actually needs.",
    whyUs:
      "Gurgaon clients tend to have the highest design expectations of any city we work in, and our process is built around that - full custom UI design in Figma before a line of code is written, and a component system that holds up under scrutiny from in-house design or product teams.",
    caseStudy: {
      client: "a Golf Course Road real estate developer",
      industry: "real-estate",
      result: "built a property showcase platform with virtual tour integration that became the primary lead source for their newest project launch",
    },
    nearby: ["delhi", "noida", "jaipur"],
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    population: "12.5 million",
    lat: 19.0760,
    lng: 72.8777,
    businessHubs: ["Bandra Kurla Complex", "Lower Parel", "Andheri East", "Powai", "Nariman Point"],
    localIndustries: ["finance-fintech", "ecommerce-retail", "hospitality-travel", "startups-saas"],
    intro:
      "Mumbai runs on speed - of decisions, of deals, and of the websites its businesses expect. From the financial firms around Nariman Point and BKC to the D2C and media companies clustering in Lower Parel and Andheri East, DevelopX Web builds for Mumbai clients who move fast and expect their web partner to match that pace without cutting corners on quality.",
    landscape:
      "BKC's financial services firms need sites that project institutional trust from the first screen. Lower Parel and Andheri's media, fashion and D2C brands need striking visual design and fast checkout flows that hold up during flash sales and influencer traffic spikes. Powai's tech and startup cluster needs product-grade web applications, not just marketing pages. Mumbai is genuinely three different markets in one city, and our scoping calls reflect that from the first conversation.",
    whyUs:
      "We run Mumbai projects on the same async-friendly process we use for international clients - clear weekly updates, recorded design walkthroughs, and calls scheduled around your day rather than expecting you to clear your calendar for us.",
    caseStudy: {
      client: "a Lower Parel-based D2C fashion brand",
      industry: "ecommerce-retail",
      result: "rebuilt their Shopify storefront and cut mobile checkout time by more than 40%, ahead of a festive season sale",
    },
    nearby: ["pune", "ahmedabad", "bengaluru"],
  },
  {
    slug: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    population: "13.6 million",
    lat: 12.9716,
    lng: 77.5946,
    businessHubs: ["Koramangala", "Indiranagar", "Whitefield", "Electronic City", "HSR Layout"],
    localIndustries: ["startups-saas", "finance-fintech", "ecommerce-retail", "manufacturing"],
    intro:
      "Bengaluru clients tend to be the most technically literate we work with, and Koramangala and HSR Layout's startup density means we're often building alongside in-house engineering teams rather than for clients with none. DevelopX Web takes on Bengaluru projects that benefit from that kind of collaborative, engineering-aware process - product marketing sites, admin dashboards, and full web applications built in the open with your team's input.",
    landscape:
      "Startups around Koramangala and Indiranagar usually need a marketing site that can keep pace with weekly product changes, built on a headless CMS their own team can operate without filing a support ticket every time copy changes. Electronic City and Whitefield's larger tech and manufacturing companies tend to need more structured, multi-stakeholder projects with formal sign-off stages, which we scope accordingly.",
    whyUs:
      "Every Bengaluru engagement includes a technical handoff document and code walkthrough, because we assume your team may eventually want to extend or maintain what we build in-house - and we design the codebase to make that realistic, not just possible on paper.",
    caseStudy: {
      client: "an HSR Layout-based fintech startup",
      industry: "finance-fintech",
      result: "shipped a compliant onboarding flow and marketing site in eight weeks ahead of their Series A announcement",
    },
    nearby: ["hyderabad", "chennai", "pune"],
  },
  {
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    population: "7.4 million",
    lat: 18.5204,
    lng: 73.8567,
    businessHubs: ["Hinjewadi", "Koregaon Park", "Baner", "Viman Nagar", "Kharadi"],
    localIndustries: ["startups-saas", "education", "manufacturing", "ecommerce-retail"],
    intro:
      "Pune's mix of IT parks in Hinjewadi and Kharadi alongside a dense education sector gives the city an unusual client base - engineering-literate startups sitting next to schools, colleges and ed-tech companies that need something entirely different. DevelopX Web builds for both sides of that split, from Hinjewadi product companies to admissions portals for institutions around Koregaon Park and Viman Nagar.",
    landscape:
      "IT companies in Hinjewadi and Kharadi typically want fast, well-engineered product and marketing sites with minimal ongoing maintenance overhead. Education institutions around the city need admission portals that can handle seasonal traffic surges without falling over, plus a content structure that non-technical staff can manage. Manufacturing businesses in Pune's industrial belt need functional B2B sites over decorative design.",
    whyUs:
      "We scope Pune education sector projects with admission-season traffic in mind from day one - load testing before the surge, not reacting to a crash during it. For Hinjewadi's tech companies, we bring the same engineering rigor your own team already expects.",
    caseStudy: {
      client: "a Viman Nagar-based higher education institute",
      industry: "education",
      result: "handled a 12x traffic spike during admission week without downtime, on a portal we load-tested two weeks before launch",
    },
    nearby: ["mumbai", "bengaluru", "ahmedabad"],
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    population: "10.5 million",
    lat: 17.3850,
    lng: 78.4867,
    businessHubs: ["HITEC City", "Gachibowli", "Banjara Hills", "Madhapur", "Jubilee Hills"],
    localIndustries: ["startups-saas", "healthcare", "finance-fintech", "ecommerce-retail"],
    intro:
      "HITEC City and Gachibowli's concentration of global tech companies and pharma majors has made Hyderabad a market where clients expect enterprise-grade thinking even from a mid-size project. DevelopX Web builds for Hyderabad businesses across that spectrum - from Madhapur startups to healthcare and pharma companies around Banjara Hills that need websites built with the compliance-awareness those industries require.",
    landscape:
      "Healthcare and pharma businesses near Banjara Hills and Jubilee Hills need sites that handle patient or practitioner data carefully, with clear information architecture that doesn't bury critical details. HITEC City and Gachibowli's tech companies need fast, modern product sites that don't feel out of place next to the global brands they sit near. Both need an agency that understands the difference in stakes.",
    whyUs:
      "Hyderabad clients in regulated industries get an explicit data-handling and security review as part of scoping, not as an afterthought - something generalist agencies in the city often skip until a client asks.",
    caseStudy: {
      client: "a Gachibowli-based diagnostics chain",
      industry: "healthcare",
      result: "launched an appointment booking platform across 14 clinic locations with a single admin dashboard for staff",
    },
    nearby: ["bengaluru", "chennai", "pune"],
  },
  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    population: "8.4 million",
    lat: 23.0225,
    lng: 72.5714,
    businessHubs: ["SG Highway", "Prahlad Nagar", "Navrangpura", "Bopal", "CG Road"],
    localIndustries: ["manufacturing", "ecommerce-retail", "real-estate", "logistics"],
    intro:
      "Gujarat's manufacturing and trading base runs heavily through Ahmedabad, and the businesses along SG Highway and CG Road are typically export-oriented, deal-driven and focused on results over decoration. DevelopX Web builds functional, fast websites and B2B platforms for Ahmedabad businesses who want a site that generates enquiries, not one that wins design awards nobody in their industry cares about.",
    landscape:
      "Textile, chemical and manufacturing exporters around SG Highway and the GIDC belt need multilingual-ready product catalogues and RFQ systems that convert international buyer traffic into actual enquiries. Prahlad Nagar and Navrangpura's growing services and real estate sector needs more polished brand-facing sites. We keep Ahmedabad proposals grounded in ROI - what a page redesign or new feature is actually expected to return.",
    whyUs:
      "We quote Ahmedabad projects with the same directness the city's business culture runs on - a fixed price, a clear scope document, and no ambiguous line items. No agency theatre, just a working site on schedule.",
    caseStudy: {
      client: "an SG Highway-based textile exporter",
      industry: "manufacturing",
      result: "replaced a PDF catalogue emailed to buyers with a searchable product platform that now generates inbound RFQs weekly",
    },
    nearby: ["mumbai", "jaipur", "pune"],
  },
  {
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    population: "11.3 million",
    lat: 13.0827,
    lng: 80.2707,
    businessHubs: ["OMR", "T Nagar", "Guindy", "Anna Nagar", "Velachery"],
    localIndustries: ["manufacturing", "startups-saas", "healthcare", "finance-fintech"],
    intro:
      "OMR's IT corridor alongside Chennai's established automotive and manufacturing base gives the city a client mix that spans deep-tech startups and century-old industrial firms. DevelopX Web builds websites and platforms for both - product-grade sites for OMR's tech companies, and dependable, functional B2B sites for Guindy's manufacturing businesses.",
    landscape:
      "Tech companies along OMR need fast, modern product and marketing sites, often with an engineering team involved in review. Guindy and the wider industrial belt's manufacturing firms need robust catalogue and enquiry systems that prioritise reliability over visual flourish. Healthcare providers around Anna Nagar and T Nagar need clear, trustworthy patient-facing sites. We treat each of these as a genuinely different brief, not a template with the city name swapped.",
    whyUs:
      "Chennai clients get detailed written documentation at every project stage - a habit we've kept because several of our long-term Chennai clients specifically asked for thorough paper trails over verbal updates.",
    caseStudy: {
      client: "a Guindy-based auto components manufacturer",
      industry: "manufacturing",
      result: "digitised their entire product catalogue into a searchable, filterable platform used daily by their export sales team",
    },
    nearby: ["bengaluru", "hyderabad", "pune"],
  },
  {
    slug: "lucknow",
    name: "Lucknow",
    state: "Uttar Pradesh",
    population: "3.5 million",
    lat: 26.8467,
    lng: 80.9462,
    businessHubs: ["Gomti Nagar", "Hazratganj", "Vibhuti Khand", "Aliganj", "Indira Nagar"],
    localIndustries: ["education", "real-estate", "healthcare", "ecommerce-retail"],
    intro:
      "Gomti Nagar's rapid commercial growth has turned Lucknow into one of North India's more underrated business hubs, with education, healthcare and real estate leading the way. DevelopX Web builds websites for Lucknow businesses that are competing for attention against Delhi-NCR players without Delhi-NCR marketing budgets - which means every rupee spent on the website needs to earn its place.",
    landscape:
      "Education institutions around Hazratganj and Aliganj need admission-season-ready portals at a reasonable budget. Healthcare providers in Gomti Nagar need appointment systems that build trust quickly for patients researching options online. Real estate developers expanding along the Lucknow-Kanpur corridor need property sites that load fast on the mid-range phones most local buyers are searching from.",
    whyUs:
      "We're upfront that Lucknow budgets often need to work harder than a metro-city budget, and we scope projects accordingly - prioritising the pages and features that drive enquiries first, with a clear roadmap for what comes next as the site proves itself.",
    caseStudy: {
      client: "a Gomti Nagar-based diagnostic centre",
      industry: "healthcare",
      result: "launched a new site with online appointment booking that became their top enquiry channel within the first quarter",
    },
    nearby: ["patna", "delhi", "jaipur"],
  },
  {
    slug: "chandigarh",
    name: "Chandigarh",
    state: "Punjab & Haryana",
    population: "1.2 million",
    lat: 30.7333,
    lng: 76.7794,
    businessHubs: ["Sector 17", "IT Park", "Sector 34", "Industrial Area Phase 1", "Sector 22"],
    localIndustries: ["startups-saas", "education", "manufacturing", "healthcare"],
    intro:
      "Chandigarh's planned IT Park sits alongside a strong regional education and manufacturing base, giving the city a client mix of tech companies, institutes and industrial firms serving Punjab, Haryana and Himachal. DevelopX Web builds websites and platforms for businesses across that region who want a metro-quality build without needing to hire a Delhi or Mumbai agency.",
    landscape:
      "IT Park's tech companies need product and marketing sites that hold up against national competitors. Education institutes around Sector 34 need admission portals built for regional student traffic. Manufacturing businesses in Industrial Area Phase 1 need dependable B2B catalogue sites serving buyers across North India. We keep Chandigarh proposals focused on what actually drives regional enquiries rather than importing a metro-city playbook wholesale.",
    whyUs:
      "Being outside the Delhi-Mumbai-Bengaluru agency circuit means Chandigarh clients often get more attention per project from us, and we lean into that - direct access to the people actually building your site, not an account manager relay.",
    caseStudy: {
      client: "a Sector 34-based engineering institute",
      industry: "education",
      result: "rebuilt their admissions website and cut average time-to-apply for prospective students by simplifying a nine-step form into three",
    },
    nearby: ["delhi", "jaipur", "gurgaon"],
  },
  {
    slug: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    population: "4.5 million",
    lat: 22.5726,
    lng: 88.3639,
    businessHubs: ["Park Street", "Salt Lake Sector V", "Ballygunge", "New Town", "Camac Street"],
    localIndustries: ["finance-fintech", "manufacturing", "education", "ecommerce-retail"],
    intro:
      "Kolkata's business landscape runs deeper than its reputation for legacy trading houses — Salt Lake Sector V has grown into a genuine IT and BPO corridor, New Town is pulling in fintech and D2C brands, and the jute, engineering and export businesses around Camac Street still anchor a large share of the city's B2B commerce. DevelopX Web builds websites and web applications for businesses across this mix, from century-old trading firms finally moving off a static brochure site to Sector V startups that need a product site that doesn't look like everyone else's template.",
    landscape:
      "Sector V's IT companies compete for talent and clients against Bengaluru and Pune, which means their websites need to read as credible to a national audience, not just a local one. New Town's fintech and D2C founders are usually building fast and need a site that can keep pace with product changes without a developer bottleneck. Meanwhile, the older trading and manufacturing houses around Camac Street and Park Street often have decades of brand trust that their current website actively undersells — dated design, no mobile optimisation, and B2B catalogues still living in PDF form.",
    whyUs:
      "We work with Kolkata clients across that entire spectrum — legacy firms that need their credibility translated into a modern site, and Sector V startups that need to move fast without breaking things. Either way, you get a fixed quote and a team that explains decisions in plain language, not agency jargon.",
    caseStudy: {
      client: "a Salt Lake Sector V-based B2B SaaS startup",
      industry: "startups-saas",
      result: "shipped a new marketing site with self-serve demo booking that doubled their qualified inbound leads within the first quarter",
    },
    nearby: ["hyderabad", "chennai", "lucknow"],
  },
  {
    slug: "surat",
    name: "Surat",
    state: "Gujarat",
    population: "4.5 million",
    lat: 21.1702,
    lng: 72.8311,
    businessHubs: ["Ring Road", "Adajan", "Vesu", "Katargam Industrial Area", "Pandesara"],
    localIndustries: ["manufacturing", "ecommerce-retail", "real-estate", "logistics"],
    intro:
      "Surat runs on textiles and diamonds, but the businesses built on top of that base — export houses, D2C fashion brands, real estate developers in Vesu and Adajan — increasingly need websites that can handle serious B2B and B2C traffic, not a five-page template. DevelopX Web builds custom websites and web applications for Surat businesses that have outgrown what a local freelancer or page-builder site can support.",
    landscape:
      "The diamond and textile export houses around Katargam and Pandesara typically need multilingual, catalogue-heavy B2B sites built to handle serious buyer traffic from overseas. Surat's fast-growing D2C fashion and apparel sellers, many shipping out of Ring Road warehouses, need e-commerce builds that can handle festival-season traffic spikes without crashing checkout. Real estate developers around Vesu need project microsites with fast-loading galleries and lead capture that doesn't lose enquiries.",
    whyUs:
      "Surat's export-heavy economy means a lot of our clients here need sites that perform well for international buyers, not just local search — we build with that from day one rather than retrofitting it later.",
    caseStudy: {
      client: "a Ring Road-based apparel export brand",
      industry: "ecommerce-retail",
      result: "moved from a template Shopify theme to a custom storefront that held up through a Diwali sale traffic spike with zero downtime",
    },
    nearby: ["ahmedabad", "mumbai", "pune"],
  },
  {
    slug: "indore",
    name: "Indore",
    state: "Madhya Pradesh",
    population: "3.2 million",
    lat: 22.7196,
    lng: 75.8577,
    businessHubs: ["Vijay Nagar", "Rau Industrial Area", "AB Road", "Palasia", "Super Corridor"],
    localIndustries: ["startups-saas", "education", "manufacturing", "healthcare"],
    intro:
      "Indore has quietly become central India's strongest startup and IT hub, with Super Corridor and Vijay Nagar drawing SaaS companies and IT services firms that once would have had to relocate to Bengaluru or Pune. DevelopX Web builds product sites, web applications and custom software for Indore-based startups and established businesses who want metro-quality development without a metro-city retainer.",
    landscape:
      "Super Corridor's SaaS and IT companies are usually competing nationally, so their sites need to hold up against Bengaluru-built competitors — fast load times, clean product messaging, credible design. Vijay Nagar's education and healthcare businesses need admission and appointment systems that actually reduce front-desk workload, not just look good. Manufacturing firms around Rau Industrial Area still mostly rely on word-of-mouth and need their first real B2B web presence.",
    whyUs:
      "We treat Indore projects with the same seniority-first team structure as our Delhi or Mumbai work — no junior-only team just because the client is in a tier-2 city.",
    caseStudy: {
      client: "a Super Corridor-based edtech startup",
      industry: "startups-saas",
      result: "rebuilt their marketing site and onboarding flow, cutting signup drop-off by a third within six weeks of launch",
    },
    nearby: ["pune", "ahmedabad", "hyderabad"],
  },
  {
    slug: "nagpur",
    name: "Nagpur",
    state: "Maharashtra",
    population: "2.9 million",
    lat: 21.1458,
    lng: 79.0882,
    businessHubs: ["MIHAN", "Dharampeth", "Civil Lines", "Butibori Industrial Area", "Sadar"],
    localIndustries: ["logistics", "manufacturing", "healthcare", "education"],
    intro:
      "Nagpur's location at the geographic centre of India, combined with the MIHAN logistics and IT hub, has built a genuine base of logistics, manufacturing and healthcare businesses that need serious digital infrastructure — not just a homepage. DevelopX Web builds websites, booking systems and B2B platforms for businesses across Nagpur that are outgrowing basic websites.",
    landscape:
      "MIHAN's logistics and IT companies need sites and portals that can represent serious operational scale to national clients. Healthcare providers around Civil Lines and Dharampeth increasingly need patient-facing appointment and information systems, especially as Nagpur's hospital network draws patients from across Vidarbha. Manufacturing units in Butibori need B2B catalogue and enquiry systems built for buyers well outside the city.",
    whyUs:
      "Nagpur businesses often serve a much wider region than the city itself — we build sites with that regional reach in mind, from SEO structure to server response times for visitors well outside Maharashtra.",
    caseStudy: {
      client: "a Civil Lines multi-specialty hospital",
      industry: "healthcare",
      result: "launched a patient appointment portal that cut phone-based booking volume by over half within two months",
    },
    nearby: ["hyderabad", "pune", "lucknow"],
  },
  {
    slug: "kochi",
    name: "Kochi",
    state: "Kerala",
    population: "2.3 million",
    lat: 9.9312,
    lng: 76.2673,
    businessHubs: ["Infopark", "Marine Drive", "Kakkanad", "Fort Kochi", "Edappally"],
    localIndustries: ["startups-saas", "hospitality-travel", "healthcare", "logistics"],
    intro:
      "Kochi's Infopark and Kakkanad IT corridor has built a real base of SaaS and services startups, sitting alongside a hospitality and tourism industry centred around Fort Kochi and Marine Drive that draws visitors from across the world. DevelopX Web builds product websites and booking platforms for businesses across both sides of that mix.",
    landscape:
      "Infopark-based startups need marketing and product sites that hold their own against Bengaluru and Chennai competitors for the same enterprise clients. Fort Kochi and Marine Drive's hospitality and tour operators need booking-ready sites that convert well for an international, English-first audience — a segment where a slow or clunky site directly costs bookings. Healthcare providers around Kakkanad increasingly need multilingual patient information and appointment systems.",
    whyUs:
      "Kerala's high digital literacy and strong tourism inflow mean visitors judge Kochi businesses against genuinely global competition — we build accordingly rather than treating this as a smaller-market project.",
    caseStudy: {
      client: "a Fort Kochi-based boutique tour operator",
      industry: "hospitality-travel",
      result: "rebuilt their booking site with real-time availability, increasing direct bookings and cutting third-party commission costs",
    },
    nearby: ["hyderabad", "chennai", "bengaluru"],
  },
  {
    slug: "patna",
    name: "Patna",
    state: "Bihar",
    population: "2.5 million",
    lat: 25.5941,
    lng: 85.1376,
    businessHubs: ["Boring Road", "Kankarbagh", "Fraser Road", "Bailey Road", "Patliputra Industrial Area"],
    localIndustries: ["education", "healthcare", "ecommerce-retail", "finance-fintech"],
    intro:
      "Patna's economy runs heavily on education, healthcare and a fast-growing retail and services sector, with coaching institutes and hospitals around Boring Road and Kankarbagh regularly outgrowing their first website within a year or two of launch. DevelopX Web builds admission systems, appointment platforms and e-commerce sites for Patna businesses that need to compete for attention against Delhi and Kolkata-based options their customers are also considering.",
    landscape:
      "Coaching institutes and colleges around Boring Road and Bailey Road need admission portals that can handle serious seasonal traffic spikes without failing during peak application windows — a real risk with underbuilt sites. Hospitals and clinics around Kankarbagh increasingly need patient-facing appointment and information systems as competition for private healthcare grows. Retail and D2C sellers based out of Patliputra Industrial Area need e-commerce sites that load fast even on the slower mobile connections common outside metro cores.",
    whyUs:
      "We build Patna sites with real attention to mobile performance on average connection speeds, not just desktop demos — because that's how most of your actual customers will experience the site.",
    caseStudy: {
      client: "a Boring Road-based coaching institute",
      industry: "education",
      result: "rebuilt their admissions site ahead of exam season and handled a 6x traffic spike on results day without downtime",
    },
    nearby: ["lucknow", "delhi", "kolkata"],
  },
  {
    slug: "coimbatore",
    name: "Coimbatore",
    state: "Tamil Nadu",
    population: "2.6 million",
    lat: 11.0168,
    lng: 76.9558,
    businessHubs: ["Peelamedu", "Race Course", "Saravanampatti", "SIDCO Industrial Estate", "RS Puram"],
    localIndustries: ["manufacturing", "startups-saas", "education", "healthcare"],
    intro:
      "Coimbatore's manufacturing base — textiles, engineering, pumps and motors — has built a large export-oriented business community, and it now sits alongside a growing IT corridor around Saravanampatti pulling in SaaS and services companies. DevelopX Web builds B2B websites, web applications and custom software for both sides of that economy.",
    landscape:
      "Manufacturing and engineering exporters around SIDCO and Peelamedu typically need multilingual, catalogue-heavy B2B sites built for serious international buyer traffic — a segment where a slow or dated site directly costs credibility with overseas clients. Saravanampatti's IT and SaaS companies need faster-moving marketing sites they can iterate on without waiting weeks for a developer. Education institutions around Race Course increasingly need admission and enquiry systems that reduce manual follow-up.",
    whyUs:
      "Coimbatore's export-heavy manufacturing base means many of our clients here need a website that reads as credible to an international B2B buyer on first look — that's a specific bar, and it's one we build to by default.",
    caseStudy: {
      client: "a SIDCO Industrial Estate-based pump manufacturer",
      industry: "manufacturing",
      result: "launched a multilingual B2B catalogue site that generated qualified export enquiries within the first month of going live",
    },
    nearby: ["chennai", "bengaluru", "hyderabad"],
  },
  {
    slug: "ghaziabad",
    name: "Ghaziabad",
    state: "Uttar Pradesh",
    population: "2.4 million",
    lat: 28.6692,
    lng: 77.4538,
    businessHubs: ["Indirapuram", "Vaishali", "Raj Nagar Extension", "Sahibabad Industrial Area", "Kaushambi"],
    localIndustries: ["manufacturing", "ecommerce-retail", "real-estate", "education"],
    intro:
      "Ghaziabad sits at the edge of Delhi-NCR's industrial belt, with Sahibabad's manufacturing base sitting alongside a fast-growing residential and retail economy around Indirapuram and Vaishali. Being this close to Noida, we work with a lot of Ghaziabad businesses directly — real estate developers, D2C sellers, and manufacturers who've outgrown a basic website but don't want to pay Delhi-agency prices for it.",
    landscape:
      "Manufacturing units around Sahibabad and the industrial belt typically need straightforward B2B sites with strong product catalogues and enquiry forms built for buyers who are comparing multiple regional suppliers. Real estate developers in the Raj Nagar Extension and Indirapuram corridor need fast-loading project microsites with credible photography and lead capture that doesn't lose enquiries to a clunky form. Retail and D2C sellers based in Ghaziabad increasingly compete directly with Delhi and Noida sellers online, which raises the bar on site speed and design.",
    whyUs:
      "Being based in neighbouring Noida means Ghaziabad clients get the same senior team and turnaround as our NCR work generally, with the option of an in-person meeting when it's useful — not something every agency quoting from outside the region can offer.",
    caseStudy: {
      client: "a Raj Nagar Extension real estate developer",
      industry: "real-estate",
      result: "launched a project microsite with virtual tours and a streamlined enquiry form that cut cost-per-lead by nearly half compared to their previous site",
    },
    nearby: ["noida", "delhi", "gurgaon"],
  },
  {
    slug: "faridabad",
    name: "Faridabad",
    state: "Haryana",
    population: "1.8 million",
    lat: 28.4089,
    lng: 77.3178,
    businessHubs: ["Sector 15-16 Market", "NIT Faridabad", "Ballabgarh Industrial Area", "Neelam Chowk", "Old Faridabad"],
    localIndustries: ["manufacturing", "logistics", "healthcare", "education"],
    intro:
      "Faridabad is one of Haryana's oldest and largest industrial belts, with a manufacturing and auto-ancillary base that's been exporting for decades but, for a lot of businesses here, has never had a website built past a basic one-pager. DevelopX Web builds proper B2B websites, catalogue systems and web applications for Faridabad's manufacturers, logistics operators and healthcare providers.",
    landscape:
      "Manufacturing and auto-ancillary businesses around Ballabgarh and NIT need multilingual, catalogue-heavy B2B sites capable of handling serious enquiry volume from both domestic and export buyers — a segment where an outdated site actively costs credibility with larger buyers doing due diligence. Logistics operators need booking and tracking systems, not just a brochure page. Healthcare providers around Neelam Chowk increasingly need appointment booking systems as private healthcare competition in the city grows.",
    whyUs:
      "A lot of Faridabad's older, established manufacturing businesses have strong reputations that their current website — often built once a decade ago and never touched since — actively undersells. We rebuild that credibility for a digital-first buyer without changing what the business actually is.",
    caseStudy: {
      client: "a Ballabgarh-based auto-ancillary manufacturer",
      industry: "manufacturing",
      result: "replaced a decade-old static site with a modern B2B catalogue and enquiry system that generated export enquiries within weeks of launch",
    },
    nearby: ["delhi", "noida", "gurgaon"],
  },
  {
    slug: "vadodara",
    name: "Vadodara",
    state: "Gujarat",
    population: "2.1 million",
    lat: 22.3072,
    lng: 73.1812,
    businessHubs: ["Alkapuri", "Gorwa Industrial Estate", "Sayajigunj", "Makarpura Industrial Area", "Fatehgunj"],
    localIndustries: ["manufacturing", "healthcare", "education", "real-estate"],
    intro:
      "Vadodara's economy runs on heavy engineering and chemical manufacturing around Makarpura and Gorwa, alongside a strong education and healthcare sector that serves much of central Gujarat. DevelopX Web builds B2B websites, patient systems and admission platforms for Vadodara businesses that need to look as credible as their actual operations are.",
    landscape:
      "Engineering and chemical manufacturers around Makarpura and Gorwa typically need serious, catalogue-heavy B2B sites built for buyers doing technical due diligence, not a marketing-led design. Education institutions serving students from across central Gujarat need admission portals that can handle serious seasonal application volume. Healthcare providers around Alkapuri and Fatehgunj increasingly need appointment and information systems as private healthcare competition grows in the city.",
    whyUs:
      "Vadodara's manufacturing base is genuinely technical, and a website that leads with generic marketing language rather than real technical credibility undersells it — we build with that specificity in mind rather than a one-size-fits-all template.",
    caseStudy: {
      client: "a Gorwa Industrial Estate engineering components manufacturer",
      industry: "manufacturing",
      result: "launched a technical B2B catalogue site with downloadable spec sheets that measurably shortened their sales cycle with new enquiries",
    },
    nearby: ["ahmedabad", "surat", "indore"],
  },
  {
    slug: "bhopal",
    name: "Bhopal",
    state: "Madhya Pradesh",
    population: "2.4 million",
    lat: 23.2599,
    lng: 77.4126,
    businessHubs: ["MP Nagar", "Arera Colony", "New Market", "Govindpura Industrial Area", "Bairagarh"],
    localIndustries: ["education", "healthcare", "manufacturing", "startups-saas"],
    intro:
      "Bhopal's economy centres on education, healthcare and a growing government and services sector, with MP Nagar functioning as the city's main commercial hub. DevelopX Web builds admission systems, patient platforms and business websites for Bhopal institutions and companies that need a stronger digital presence than the city's still-developing web design market typically offers.",
    landscape:
      "Education institutions across the city need admission portals capable of handling serious seasonal application spikes without failing during peak windows. Healthcare providers around Arera Colony and MP Nagar increasingly need patient appointment and information systems as private healthcare options expand. Manufacturing businesses around Govindpura need straightforward B2B sites and catalogues built for regional and national buyers.",
    whyUs:
      "Bhopal doesn't yet have the density of specialist web development studios that Indore or Bengaluru do — we bring the same senior-team standard we apply everywhere else to a market that's often stuck choosing between a local freelancer and an overpriced Delhi agency.",
    caseStudy: {
      client: "an MP Nagar-based diagnostic centre chain",
      industry: "healthcare",
      result: "launched an online appointment and report-download portal that cut front-desk call volume significantly within the first month",
    },
    nearby: ["indore", "nagpur", "lucknow"],
  },
];

export function getCityBySlug(slug: string) {
  return cities.find((c) => c.slug === slug);
}

export function citySlugToRoute(slug: string) {
  return `/web-development-company-${slug}`;
}
