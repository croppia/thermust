import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thermust.com"),
  title: "Safe Internal Cooking Temperature Chart | Thermust",
  description:
    "Find safe minimum internal cooking temperatures for meat, poultry, fish, shellfish, eggs, leftovers, and more.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Thermust",
    title: "Safe Internal Cooking Temperature Chart | Thermust",
    description:
      "Minimum cooking temperatures, rest times, and seafood doneness cues.",
  },
  twitter: {
    card: "summary",
    title: "Safe Internal Cooking Temperature Chart | Thermust",
    description:
      "Minimum cooking temperatures, rest times, and seafood doneness cues.",
  },
  icons: {
    icon: "/favicon/favicon-32x32.png",
    apple: "/favicon/apple-icon-180x180.png",
  },
  verification: {
    google: "k3c5ao1hTkoyLLnA4jANDZCrqP3H1JUTr-_eH7D-m4w",
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
