"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { isTrackablePath } from "@/lib/analytics";

const AnalyticsTracker = () => {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!isTrackablePath(pathname)) return;
    if (lastTrackedPath.current === pathname) return;

    lastTrackedPath.current = pathname;

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      keepalive: true,
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer || undefined,
      }),
    }).catch(() => {
      lastTrackedPath.current = null;
    });
  }, [pathname]);

  return null;
};

export default AnalyticsTracker;
