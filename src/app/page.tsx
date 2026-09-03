import type { Metadata } from "next";
import { TemperatureExplorer } from "@/components/TemperatureExplorer";
import { temperaturePageFor, SITE_URL } from "@/lib/temperature-pages";
import { CookingMethod, MeatType } from "@/lib/types";

export const metadata: Metadata = {
  title: "Safe Internal Cooking Temperature Chart | Thermust",
  description:
    "Find safe minimum internal cooking temperatures for meat, poultry, fish, shellfish, eggs, leftovers, and more in Fahrenheit or Celsius.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Safe Internal Cooking Temperature Chart | Thermust",
    description:
      "Look up safe minimum cooking temperatures, rest times, and seafood doneness cues.",
  },
};

export default function Home() {
  const defaultPage = temperaturePageFor(MeatType.beef, CookingMethod.steak);
  if (!defaultPage) {
    throw new Error("The default temperature page is missing.");
  }

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Thermust",
    url: SITE_URL,
    description:
      "Safe minimum internal cooking temperatures from U.S. government guidance.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <TemperatureExplorer page={defaultPage} isLandingPage />
    </>
  );
}
