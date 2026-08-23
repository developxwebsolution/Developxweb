import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema } from "@/lib/seo";
import { site } from "@/data/site";
import { GoogleAnalytics } from "@/components/google-analytics";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Website Development Company in India`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "website development company",
    "web design company India",
    "Next.js development company",
    "custom software development",
    "ecommerce website development",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
};

// This root layout is intentionally minimal — it wraps EVERY route,
// including /admin, so it only holds things every route needs (fonts, theme,
// org-wide JSON-LD). The public navbar/footer live in `(site)/layout.tsx`
// instead, so the admin panel doesn't get the public site's chrome around it.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
       <body className="min-h-full flex flex-col bg-paper text-ink">
        <ThemeProvider>{children}</ThemeProvider>
        <JsonLd data={organizationSchema()} />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
