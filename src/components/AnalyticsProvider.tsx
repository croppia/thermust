"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "";

  posthog.init(key, {
    api_host: host,
  });
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
