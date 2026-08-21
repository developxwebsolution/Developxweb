import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent, within } from "@testing-library/react";
import { Navbar } from "./navbar";
import type { Service } from "@/data/services";
import type { City } from "@/data/cities";

const mockServices: Service[] = Array.from({ length: 19 }, (_, i) => ({
  slug: `service-${i}`,
  shortName: `Service ${i}`,
  name: `Service ${i} Full Name`,
  icon: "code",
  summary: "Summary",
  description: "Description",
  features: [],
  deliverables: [],
  process: [],
  faqs: [],
  startingPrice: "₹1",
  timeline: "1 week",
}));

const mockCities: City[] = Array.from({ length: 19 }, (_, i) => ({
  slug: `city-${i}`,
  name: `City ${i}`,
  state: "State",
  population: "1",
  lat: 0,
  lng: 0,
  businessHubs: [],
  localIndustries: [],
  intro: "",
  landscape: "",
  whyUs: "",
  caseStudy: { client: "", industry: "", result: "" },
  nearby: [],
}));

// Real production CSS (Tailwind's `hidden`/`lg:flex`) makes the desktop and
// mobile navs mutually exclusive in an actual browser at any given viewport
// width — but jsdom doesn't apply visibility rules from CSS at all, so both
// versions of the nav are simultaneously present in the test DOM. Every
// query below is scoped with `within(mobileMenu)` to avoid false "multiple
// elements found" failures against the desktop nav that's also rendered.

function openMobileMenu() {
  fireEvent.click(screen.getByLabelText("Open menu"));
  return within(screen.getByTestId("mobile-menu"));
}

describe("Navbar — mobile menu", () => {
  afterEach(() => cleanup());

  it("opens the mobile menu when the hamburger button is clicked", () => {
    render(<Navbar services={mockServices} cities={mockCities} />);
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Open menu"));
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
  });

  it("expands the Services accordion and shows every service", () => {
    render(<Navbar services={mockServices} cities={mockCities} />);
    const menu = openMobileMenu();
    fireEvent.click(menu.getByRole("button", { name: /^services$/i }));

    for (const s of mockServices) {
      expect(menu.getByRole("link", { name: s.shortName })).toBeInTheDocument();
    }
    expect(menu.getByRole("link", { name: /view all services/i })).toBeInTheDocument();
  });

  it("expands the Locations accordion and shows every city", () => {
    render(<Navbar services={mockServices} cities={mockCities} />);
    const menu = openMobileMenu();
    fireEvent.click(menu.getByRole("button", { name: /^locations$/i }));

    for (const c of mockCities) {
      expect(menu.getByRole("link", { name: c.name })).toBeInTheDocument();
    }
    expect(menu.getByRole("link", { name: /view all cities/i })).toBeInTheDocument();
  });

  it("collapses Services when clicked again", () => {
    render(<Navbar services={mockServices} cities={mockCities} />);
    const menu = openMobileMenu();
    fireEvent.click(menu.getByRole("button", { name: /^services$/i }));
    expect(menu.getByRole("link", { name: mockServices[0].shortName })).toBeInTheDocument();

    fireEvent.click(menu.getByRole("button", { name: /^services$/i }));
    expect(menu.queryByRole("link", { name: mockServices[0].shortName })).not.toBeInTheDocument();
  });

  it("closes the whole mobile menu when a link inside it is clicked", () => {
    render(<Navbar services={mockServices} cities={mockCities} />);
    const menu = openMobileMenu();
    fireEvent.click(menu.getByRole("button", { name: /^services$/i }));
    fireEvent.click(menu.getByRole("link", { name: mockServices[0].shortName }));

    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  it("falls back to the built-in primary links when none are provided", () => {
    render(<Navbar services={mockServices} cities={mockCities} />);
    const menu = openMobileMenu();
    expect(menu.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(menu.getByRole("link", { name: "Pricing" })).toBeInTheDocument();
  });

  it("uses admin-provided primary links instead of the fallback when given", () => {
    render(<Navbar services={mockServices} cities={mockCities} primaryLinks={[{ href: "/custom", label: "Custom Link" }]} />);
    const menu = openMobileMenu();
    expect(menu.getByRole("link", { name: "Custom Link" })).toBeInTheDocument();
    expect(menu.queryByRole("link", { name: "Pricing" })).not.toBeInTheDocument();
  });

  it("re-opening the menu after closing starts with accordions collapsed again", () => {
    render(<Navbar services={mockServices} cities={mockCities} />);
    let menu = openMobileMenu();
    fireEvent.click(menu.getByRole("button", { name: /^services$/i }));
    expect(menu.getByRole("link", { name: mockServices[0].shortName })).toBeInTheDocument();

    // Close via the hamburger button itself (not a link), then reopen.
    fireEvent.click(screen.getByLabelText("Close menu"));
    menu = openMobileMenu();
    expect(menu.queryByRole("link", { name: mockServices[0].shortName })).not.toBeInTheDocument();
  });
});
