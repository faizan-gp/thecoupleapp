import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TheCoupleApp",
    short_name: "TheCoupleApp",
    description: "A library of apps for couples.",
    start_url: "/",
    display: "browser",
    background_color: "#f2f0f6",
    theme_color: "#4a3fbf",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
