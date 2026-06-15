// app/sitemap.js
// Next.js автоматически отдаст этот файл по адресу /sitemap.xml
// Google Search Console использует sitemap для индексации страниц

import { tools } from "../lib/tools";

export default function sitemap() {
  const base = "https://aitoolsdirectory.tech";
  const toolPages = tools.map((tool) => ({
    url: `${base}/tool/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...toolPages,
  ];
}
