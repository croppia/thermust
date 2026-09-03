"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const analyticsConfigured = Boolean(posthogKey && posthogHost);

if (typeof window !== "undefined" && analyticsConfigured) {
  posthog.init(posthogKey!, {
    api_host: posthogHost,
    capture_pageview: true,
    capture_pageleave: true,
  });
}

export function captureProductEvent(
  event: string,
  properties: Record<string, string>
): void {
  if (analyticsConfigured) {
    posthog.capture(event, properties);
  }
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  if (!analyticsConfigured) {
    return children;
  }
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
