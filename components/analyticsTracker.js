"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevKeyRef = useRef(null);

  useEffect(() => {
    const key = pathname + "?" + searchParams.toString();
    if (prevKeyRef.current === key) return; // avoid duplicate fires
    prevKeyRef.current = key;

    (async () => {
      try {
        await fetch("/api/visits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "pageview",
            path: key,
            userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
          }),
          keepalive: true, // survives quick navigations
        });
      } catch (e) {
        console.error("pageview track failed", e);
      }
    })();
  }, [pathname, searchParams]);

  return null;
}
