export type Testimonial = {
  name: string;
  role: string;
  company: string;
  city: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Anish Kapoor",
    role: "Founder",
    company: "Vantara Interiors",
    city: "Jaipur",
    quote:
      "Our old site took nine seconds to load on mobile. DevelopX rebuilt it, and now it loads under two seconds and our enquiry form submissions have roughly doubled.",
    rating: 5,
  },
  {
    name: "Ritika Sethi",
    role: "Marketing Head",
    company: "Novara Health",
    city: "Delhi",
    quote:
      "They didn't just build what we asked for - they pushed back on a few decisions that would have hurt our SEO, and they were right every time.",
    rating: 5,
  },
  {
    name: "Manav Oberoi",
    role: "CEO",
    company: "Fleetwise Logistics",
    city: "Mumbai",
    quote:
      "The dashboard they built now runs our entire dispatch team's day. It replaced three spreadsheets and a WhatsApp group.",
    rating: 5,
  },
  {
    name: "Divya Nair",
    role: "Co-founder",
    company: "Curated Threads",
    city: "Bengaluru",
    quote:
      "Our Shopify store went from a template feel to something that actually looks like our brand. Conversion rate is up since launch.",
    rating: 5,
  },
  {
    name: "Karan Malhotra",
    role: "Director",
    company: "Malhotra Legal Associates",
    city: "Gurgaon",
    quote:
      "Straightforward process, clear timelines, and they actually explained the SEO decisions instead of just doing them.",
    rating: 4,
  },
  {
    name: "Priya Iyer",
    role: "Operations Lead",
    company: "Sunrise Learning",
    city: "Pune",
    quote:
      "We needed an admission portal built fast before intake season. They delivered two weeks ahead of schedule and it hasn't gone down once.",
    rating: 5,
  },
];
