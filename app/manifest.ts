import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TheCoupleApp",
    short_name: "TheCoupleApp",
    description: "A library of apps for couples.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#171717",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
