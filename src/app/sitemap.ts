import type { MetadataRoute } from "next";
import { siteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/contact", priority: 0.6 },
  ].map(({ path, priority }) => ({
    url: new URL(path, siteUrl).href,
    changeFrequency: "monthly",
    priority,
  }));
}
