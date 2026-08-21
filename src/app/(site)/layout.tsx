import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LeadPopup } from "@/components/lead-popup";
import { getServices, getCities, getMenuItems } from "@/lib/content";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TawkToWidget } from "@/components/tawk-to-widget";
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [services, cities, primaryLinks, companyLinks, resourceLinks] = await Promise.all([
    getServices(),
    getCities(),
    getMenuItems("primary"),
    getMenuItems("footer_company"),
    getMenuItems("footer_resources"),
  ]);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar services={services} cities={cities} primaryLinks={primaryLinks} />
      <main className="flex-1">{children}</main>
      <Footer services={services} cities={cities} companyLinks={companyLinks} resourceLinks={resourceLinks} />
      <LeadPopup />
      <TawkToWidget />
       <WhatsAppButton />
    </div>
  );
}
