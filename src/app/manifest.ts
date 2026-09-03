import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Thermust",
    short_name: "Thermust",
    description: "Safe minimum cooking temperature reference",
    start_url: "/",
    display: "standalone",
    background_color: "#ede5d7",
    theme_color: "#9ec1c5",
    icons: [
      {
        src: "/favicon/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
