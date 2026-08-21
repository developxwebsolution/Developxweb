// Both the mobile nav menu and the lead popup can independently want to
// lock body scroll while open. Without coordination, closing one while the
// other is still open would incorrectly unlock scrolling (each effect's
// cleanup just resets `overflow` unconditionally). A simple reference count
// fixes this: scroll stays locked as long as at least one caller holds it.

let lockCount = 0;

export function lockBodyScroll() {
  lockCount += 1;
  if (lockCount === 1) {
    document.body.style.overflow = "hidden";
  }
}

export function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = "";
  }
}
