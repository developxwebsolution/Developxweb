import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, act } from "@testing-library/react";

// The real ContactForm pulls in a server action (DB, next/headers) that
// can't run in jsdom — mock it so we're testing the popup's own show/hide
// timing logic in isolation, not the form internals (already verified
// separately via real HTTP requests against the running app).
vi.mock("./contact-form", () => ({
  ContactForm: () => <div data-testid="mock-contact-form" />,
}));

import { LeadPopup } from "./lead-popup";

const STORAGE_KEY = "developx_popup_last_shown";

describe("LeadPopup", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("does not show immediately on first visit", () => {
    render(<LeadPopup />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows after 5 seconds on a genuine first visit (no localStorage entry)", () => {
    render(<LeadPopup />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(4999));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("writes a timestamp to localStorage once it shows", () => {
    render(<LeadPopup />);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();

    act(() => vi.advanceTimersByTime(5000));
    expect(window.localStorage.getItem(STORAGE_KEY)).not.toBeNull();
  });

  it("does NOT show again on a second visit within 24 hours", () => {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    render(<LeadPopup />);

    act(() => vi.advanceTimersByTime(24 * 60 * 60 * 1000 - 1)); // 23h59m59.999s later
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows again once 24 hours have fully passed since it was last shown", () => {
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000 - 1000;
    window.localStorage.setItem(STORAGE_KEY, String(twentyFourHoursAgo));
    render(<LeadPopup />);

    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("still shows on first visit even if localStorage throws (private browsing)", () => {
    const getItemSpy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError: localStorage disabled");
    });

    render(<LeadPopup />);
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    getItemSpy.mockRestore();
  });

  it("closes on Escape key", () => {
    render(<LeadPopup />);
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const event = new KeyboardEvent("keydown", { key: "Escape" });
    act(() => document.dispatchEvent(event));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
