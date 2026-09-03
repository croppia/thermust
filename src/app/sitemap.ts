import type { MetadataRoute } from "next";
import {
  allTemperaturePages,
  SITE_CONTENT_UPDATED_AT,
  SITE_URL,
} from "@/lib/temperature-pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const temperaturePages: MetadataRoute.Sitemap = allTemperaturePages().map(
    (page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  return [
    {
      url: SITE_URL,
      lastModified: SITE_CONTENT_UPDATED_AT,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...temperaturePages,
  ];
}
