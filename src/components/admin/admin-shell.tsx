"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  MapPin,
  FileText,
  FolderKanban,
  MessageSquareQuote,
  HelpCircle,
  Image as ImageIcon,
  Search,
  Menu as MenuIcon,
  Settings,
  BarChart3,
  Mail,
  Users,
  LogOut,
  UserCircle,
  ExternalLink,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { site } from "@/data/site";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/cities", label: "Cities", icon: MapPin },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderKanban },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/seo", label: "SEO Manager", icon: Search },
  { href: "/admin/menu", label: "Menu Builder", icon: MenuIcon },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/users", label: "Users", icon: Users, adminOnly: true },
  { href: "/admin/settings", label: "Settings", icon: Settings, adminOnly: true },
  { href: "/admin/account", label: "My Account", icon: UserCircle },
];

export function AdminShell({ children, role }: { children: React.ReactNode; role: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-paper-raised">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-paper lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-line px-5 font-display text-base font-semibold text-ink">
           <img
            src="https://res.cloudinary.com/vatxiwgf/image/upload/v1787412844/developx-web/essrp4a2g4i98t9ogpgp.webp"
             alt="DevelopXWeb Logo"
            onError={(e) => {
    e.currentTarget.src = "/logo-icon.webp";
  }}
      
           
            className="h-20 w-auto object-contain"
          />
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {nav.map((item) => {
            if (item.adminOnly && role !== "admin") return null;
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active ? "bg-indigo-soft text-indigo font-medium" : "text-ink-soft hover:bg-paper-raised hover:text-ink"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-line p-3">
          <Link href="/" target="_blank" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-paper-raised hover:text-ink">
            <ExternalLink className="size-4" /> View site
          </Link>
          <button onClick={handleSignOut} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-paper-raised hover:text-ink cursor-pointer">
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
