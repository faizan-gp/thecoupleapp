import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TheCoupleApp",
    short_name: "TheCoupleApp",
    description: "A library of apps for couples.",
    start_url: "/",
    display: "browser",
    background_color: "#171111",
    theme_color: "#f0609f",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
