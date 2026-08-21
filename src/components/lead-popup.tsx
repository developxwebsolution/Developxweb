"use client";

import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { ContactForm } from "./contact-form";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";

const STORAGE_KEY = "developx_popup_last_shown";
const SHOW_AFTER_MS = 5_000;
const REPEAT_AFTER_MS = 24 * 60 * 60 * 1000; // 24 hours

export function LeadPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastShown: number | null = null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      lastShown = raw ? Number(raw) : null;
    } catch {
      // localStorage unavailable (privacy mode, etc.) — treat as never shown.
      lastShown = null;
    }

    const dueToShow = !lastShown || Date.now() - lastShown >= REPEAT_AFTER_MS;
    if (!dueToShow) return;

    const timer = setTimeout(() => {
      setOpen(true);
      try {
        window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
      } catch {
        // If storage write fails, the popup will just show again next visit —
        // acceptable degradation, not worth surfacing to the user.
      }
    }, SHOW_AFTER_MS);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    lockBodyScroll();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockBodyScroll();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-popup-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <button
        aria-label="Close"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-up cursor-default"
        style={{ animationDuration: "0.25s" }}
      />
      <div className="relative w-full max-w-[720px] animate-fade-up" style={{ animationDuration: "0.35s" }}>
        <div className="card-raised relative max-h-[90vh] overflow-y-auto p-6 shadow-2xl sm:p-8">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close popup"
            className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-ink-soft hover:bg-paper-raised hover:text-ink cursor-pointer"
          >
            <X className="size-4" />
          </button>

          <div className="mb-3 flex flex-col items-center text-center">
            {/* <span className="mb-3 flex size-11 items-center justify-center rounded-xl bg-indigo-soft text-indigo">
              <Sparkles className="size-5" />
            </span> */}
            <h2 id="lead-popup-title" className="font-display text-xl font-semibold text-ink">
              Before you go — let&apos;s talk about your project.
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-ink-soft">
              Tell us what you&apos;re building and we&apos;ll send a fixed quote within one business day. No
              obligation, no spam.
            </p>
          </div>

          <ContactForm context="Homepage popup" />
        </div>
      </div>
    </div>
  );
}
