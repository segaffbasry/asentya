import { insights } from "@/content/site-data";
import type { MetadataRoute } from "next";

const siteUrl = "https://www.asentya.com";
const publicPaths = [
  "/",
  "/about",
  "/services",
  "/peoples",
  "/careers",
  "/insights",
  "/contact",
  "/zidny-assegaf",
  "/raditya-rahmadhan",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [...publicPaths, ...insights.map((article) => article.path)].map(
    (path) => ({ url: new URL(path, siteUrl).toString() }),
  );
}
