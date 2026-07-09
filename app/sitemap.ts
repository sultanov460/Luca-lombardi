import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.luca-lombardi.store";
  const routes = [
    "",
    "/women-collection",
    "/men-collection",
    "/sunglasses-collection",
    "/new-collection",
    "/about",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
