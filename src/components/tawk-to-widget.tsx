"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export function TawkToWidget() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Delay Tawk.to until 3 seconds after the page is interactive, so its
    // ~450KB of JS/CSS never competes with the initial page load, LCP, or
    // main-thread time — a visitor is very unlikely to need live chat in
    // the first 3 seconds anyway.
    const timer = setTimeout(() => setShouldLoad(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) return null;
  return (
    <Script id="tawk-to-widget" strategy="afterInteractive">
      {`
        var Tawk_API = Tawk_API || {};
        var Tawk_LoadStart = new Date();
        (function () {
          var s1 = document.createElement("script"),
            s0 = document.getElementsByTagName("script")[0];
          s1.async = true;
          s1.src = "https://embed.tawk.to/69cab925ecf7021c36680972/1jkvu6fq1";
          s1.charset = "UTF-8";
          s1.setAttribute("crossorigin", "*");
          s0.parentNode.insertBefore(s1, s0);
        })();
      `}
    </Script>
  );
}