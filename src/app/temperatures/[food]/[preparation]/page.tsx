import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemperatureExplorer } from "@/components/TemperatureExplorer";
import {
  allTemperaturePages,
  SITE_CONTENT_UPDATED_AT,
  SITE_URL,
  temperaturePageFromSlugs,
} from "@/lib/temperature-pages";

type TemperatureRouteProps = {
  params: Promise<{
    food: string;
    preparation: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return allTemperaturePages().map((page) => ({
    food: page.foodSlug,
    preparation: page.preparationSlug,
  }));
}

export async function generateMetadata({
  params,
}: TemperatureRouteProps): Promise<Metadata> {
  const { food, preparation } = await params;
  const page = temperaturePageFromSlugs(food, preparation);
  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url: page.path,
      siteName: "Thermust",
      title: page.title,
      description: page.description,
      modifiedTime: SITE_CONTENT_UPDATED_AT,
    },
    twitter: {
      card: "summary",
      title: page.title,
      description: page.description,
    },
  };
}

export default async function TemperatureRoute({
  params,
}: TemperatureRouteProps) {
  const { food, preparation } = await params;
  const page = temperaturePageFromSlugs(food, preparation);
  if (!page) {
    notFound();
  }

  const absoluteUrl = `${SITE_URL}${page.path}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: page.title,
        description: page.description,
        url: absoluteUrl,
        dateModified: SITE_CONTENT_UPDATED_AT,
        isPartOf: {
          "@type": "WebSite",
          name: "Thermust",
          url: SITE_URL,
        },
        about: {
          "@type": "Thing",
          name: `${page.guidance.label} safe internal temperature`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Thermust",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.guidance.label,
            item: absoluteUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <TemperatureExplorer page={page} />
    </>
  );
}
