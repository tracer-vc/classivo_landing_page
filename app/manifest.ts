import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

/** Web-App-Manifest: Name, Farben und Icons, z. B. für „Zum Home-Bildschirm hinzufügen“ */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${brand.name} – ${brand.claim}`,
    short_name: brand.name,
    description: brand.description,
    lang: "de",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf8f5",
    theme_color: "#fbf8f5",
    categories: ["education", "productivity"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
