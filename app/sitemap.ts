import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/config";
import { faresData } from "./lib/fares";

const lastModified = new Date(faresData.meta.lastUpdated);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified, priority: 1 },
    { url: `${SITE_URL}/stb`, lastModified, priority: 0.9 },
    { url: `${SITE_URL}/metrorex`, lastModified, priority: 0.9 },
    { url: `${SITE_URL}/integrat`, lastModified, priority: 0.9 },
    { url: `${SITE_URL}/metrorex/istoric`, lastModified, priority: 0.7 },
    { url: `${SITE_URL}/surse`, lastModified, priority: 0.4 },
  ];
}
