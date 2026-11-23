import type { MetadataRoute } from "next";

const BASE_URL = "https://www.forevermemoirs.com";

/* Every real public route. /grandma and /easyjoecoloringforseniors are
 * server-side redirects to Amazon, not pages, so they are not listed. */
const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/about", priority: 0.7 },
  { path: "/business", priority: 0.8 },
  { path: "/business/funeral-homes", priority: 0.8 },
  { path: "/memorials", priority: 0.9 },
  { path: "/memorials/jared-terry", priority: 0.7 },
  { path: "/glossary", priority: 0.6 },
  { path: "/gift", priority: 0.7 },
  { path: "/order", priority: 0.8 },
  { path: "/storykeepers", priority: 0.7 },
  { path: "/storykeepers/library", priority: 0.6 },
  { path: "/storykeepers/kitchen-table-interview", priority: 0.6 },
  { path: "/storykeepers/when-memories-hurt", priority: 0.6 },
  { path: "/storykeepers/faq", priority: 0.6 },
  { path: "/storykeepers/finished-journal", priority: 0.6 },
  { path: "/storykeepers/printables", priority: 0.6 },
  { path: "/beta-agreement", priority: 0.3 },
  { path: "/nda", priority: 0.3 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
  { path: "/redeem", priority: 0.5 },
  { path: "/gift/success", priority: 0.3 },
  { path: "/release", priority: 0.3 },
  { path: "/waitlist", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.path === "/" ? "weekly" : "monthly",
    priority: route.priority,
  }));
}
