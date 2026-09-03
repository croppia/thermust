import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thermust.com"),
  title: "Thermust — Safe cooking temperatures",
  description:
    "Look up current U.S. government minimum cooking temperatures, rest times, and seafood doneness cues.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Thermust",
    title: "Thermust — Safe cooking temperatures",
    description:
      "Minimum cooking temperatures, rest times, and seafood doneness cues.",
  },
  twitter: {
    card: "summary",
    title: "Thermust — Safe cooking temperatures",
    description:
      "Minimum cooking temperatures, rest times, and seafood doneness cues.",
  },
  icons: {
    icon: "/favicon/favicon-32x32.png",
    apple: "/favicon/apple-icon-180x180.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#9ec1c5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  );
}
