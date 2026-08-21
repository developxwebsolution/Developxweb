import { describe, it, expect, beforeEach } from "vitest";
import { lockBodyScroll, unlockBodyScroll } from "./scroll-lock";

describe("scroll-lock", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  it("locks scroll on first lock", () => {
    lockBodyScroll();
    expect(document.body.style.overflow).toBe("hidden");
    unlockBodyScroll();
  });

  it("unlocks scroll when the single lock is released", () => {
    lockBodyScroll();
    unlockBodyScroll();
    expect(document.body.style.overflow).toBe("");
  });

  it("stays locked if a second caller locks after the first, then the first unlocks — the exact bug this module prevents", () => {
    // e.g. mobile menu opens (locks), then the popup timer fires and also
    // locks, then the user closes the mobile menu — scroll must stay
    // locked because the popup is still open.
    lockBodyScroll(); // mobile menu opens
    lockBodyScroll(); // popup also opens
    unlockBodyScroll(); // mobile menu closes
    expect(document.body.style.overflow).toBe("hidden"); // popup still open — must stay locked

    unlockBodyScroll(); // popup closes
    expect(document.body.style.overflow).toBe(""); // now nothing holds the lock
  });

  it("never goes negative if unlock is called more times than lock", () => {
    unlockBodyScroll();
    unlockBodyScroll();
    lockBodyScroll();
    expect(document.body.style.overflow).toBe("hidden");
    unlockBodyScroll();
    expect(document.body.style.overflow).toBe("");
  });
});
