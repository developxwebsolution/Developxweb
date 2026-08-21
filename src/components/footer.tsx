import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "./container";
import { SocialIcon } from "./social-icons";
import { NewsletterForm } from "./newsletter-form";
import { site } from "@/data/site";
import type { Service } from "@/data/services";
import type { City } from "@/data/cities";

const FALLBACK_COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];
const FALLBACK_RESOURCE_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/technologies", label: "Technologies" },
  { href: "/pricing", label: "Pricing" },
  { href: "/search", label: "Search" },
];

export function Footer({
  services,
  cities,
  companyLinks,
  resourceLinks,
}: {
  services: Service[];
  cities: City[];
  companyLinks?: { href: string; label: string }[];
  resourceLinks?: { href: string; label: string }[];
}) {
  const year = new Date().getFullYear();
  const company = companyLinks && companyLinks.length > 0 ? companyLinks : FALLBACK_COMPANY_LINKS;
  const resources = resourceLinks && resourceLinks.length > 0 ? resourceLinks : FALLBACK_RESOURCE_LINKS;

  return (
    <footer className="border-t border-line bg-paper-raised">
      <Container className="grid grid-cols-2 gap-10 py-16 sm:grid-cols-3 lg:grid-cols-6">
        <div className="col-span-2 lg:col-span-2">
          {/* <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink">
            <span className="flex size-7 items-center justify-center rounded-md bg-indigo text-sm text-white">D</span>
            {site.shortName}
          </Link> */}
               {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
        >
          <img
            src="/logo-icon.webp"
            alt="Laser Web Maker"
            className="h-20 w-auto object-contain"
          />
        </Link>
          <p className="max-w-xs text-sm leading-6 text-ink-soft">{site.description}</p>
          <div className="mt-5 max-w-xs">
            <p className="mb-2 text-xs font-medium text-ink">Get occasional updates, no spam</p>
            <NewsletterForm />
          </div>
          <div className="mt-5 flex flex-col gap-2 text-sm text-ink-soft">
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-indigo">
              <Mail className="size-4" /> {site.email}
            </a>
            <a href={site.phoneHref} className="flex items-center gap-2 hover:text-indigo">
              <Phone className="size-4" /> {site.phone}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="size-4" /> {site.addressLocality}, {site.addressRegion}, India
            </span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <a href={site.social.linkedin} target="_blank" aria-label="LinkedIn" className="flex size-8 items-center justify-center rounded-full border border-line text-ink-soft hover:border-indigo hover:text-indigo">
              <SocialIcon name="linkedin" className="size-3.5" />
            </a>
            <a href={site.social.twitter} target="_blank" aria-label="Twitter" className="flex size-8 items-center justify-center rounded-full border border-line text-ink-soft hover:border-indigo hover:text-indigo">
              <SocialIcon name="twitter" className="size-3.5" />
            </a>
            <a href={site.social.instagram} target="_blank" aria-label="Instagram" className="flex size-8 items-center justify-center rounded-full border border-line text-ink-soft hover:border-indigo hover:text-indigo">
              <SocialIcon name="instagram" className="size-3.5" />
            </a>
            <a href={site.social.github} target="_blank" aria-label="GitHub" className="flex size-8 items-center justify-center rounded-full border border-line text-ink-soft hover:border-indigo hover:text-indigo">
              <SocialIcon name="github" className="size-3.5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-ink-soft">Services</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {services.slice(0, 7).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-sm text-ink-soft hover:text-indigo">
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-ink-soft">Locations</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {cities.slice(0, 7).map((c) => (
              <li key={c.slug}>
                <Link href={`/web-development-company-${c.slug}`} className="text-sm text-ink-soft hover:text-indigo">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/locations" className="text-sm text-indigo">
                All cities →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-ink-soft">Company</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {company.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-soft hover:text-indigo">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-ink-soft">Resources</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {resources.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-soft hover:text-indigo">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-line py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-ink-soft sm:flex-row">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-indigo">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-indigo">Terms</Link>
            <Link href="/refund-policy" className="hover:text-indigo">Refund Policy</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
