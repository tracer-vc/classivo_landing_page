import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

/** Nur indexierbare Seiten. Impressum/Datenschutz/Danke-Seite sind bewusst noindex. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: brand.url,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
