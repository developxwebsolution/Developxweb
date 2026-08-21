import type { Metadata } from "next";
import { site } from "@/data/site";
import { getSeoOverride } from "./content";

export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  const url = `${site.url}${opts.path}`;
  return {
    // title.absolute bypasses the root layout's `%s | DevelopX Web` template.
    // Every call site here already builds a complete, final title string
    // (e.g. "X | DevelopX Web") — without `absolute`, Next re-applies the
    // parent template on top and the site name ends up duplicated.
    title: { absolute: opts.title },
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_IN",
      images: [{ url: opts.image ?? `${site.url}/og-default.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [opts.image ?? `${site.url}/og-default.png`],
    },
  };
}

/**
 * Same as buildMetadata, but checks the seo_overrides table first (see
 * SEO Manager in the admin panel) and lets any override win over the
 * code-generated defaults. Used on the dynamic detail templates
 * (service/city/blog/portfolio) where a per-page override is most useful.
 */
export async function buildMetadataWithOverride(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Promise<Metadata> {
  const override = await getSeoOverride(opts.path);

  return buildMetadata({
    title: override?.title || opts.title,
    description: override?.description || opts.description,
    path: opts.path,
    image: override?.ogImage || opts.image,
    noindex: override?.noindex ?? false,
  });
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/logo.png`,
    foundingDate: String(site.founded),
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.addressLocality,
      addressRegion: site.addressRegion,
      addressCountry: site.addressCountry,
    },
    sameAs: Object.values(site.social),
  };
}

export function localBusinessSchema(opts: { city: string; region: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.name} - Web Development Company in ${opts.city}`,
    description: opts.description,
    url: opts.url,
    email: site.email,
    telephone: site.phone,
    areaServed: {
      "@type": "City",
      name: opts.city,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: opts.city,
      addressRegion: opts.region,
      addressCountry: "IN",
    },
    parentOrganization: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };
}

export function serviceSchema(opts: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function articleSchema(opts: { title: string; description: string; path: string; date: string; author: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: `${site.url}${opts.path}`,
    datePublished: opts.date,
    author: { "@type": "Organization", name: opts.author },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };
}
