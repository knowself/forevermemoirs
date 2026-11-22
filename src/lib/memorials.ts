/**
 * Living Memorials registry.
 *
 * Each memorial is one family's home page for a life, kept at
 * /memorials/<slug>. Visibility is a per-memorial setting, not a property
 * of the folder:
 *
 * - "public"  — the family has chosen to share this memorial openly.
 *               It may appear on the public /memorials index and be linked
 *               from anywhere on the site.
 * - "private" — invite-only, for families who do not want their memorial
 *               publicly viewable. A private memorial is NEVER listed on
 *               the public index, and must never be linked from a public
 *               page. (Enforcement of private access — sign-in, invite
 *               links — is a dashboard concern and comes with the family
 *               dashboard in phase 2; this registry is the source of truth
 *               the dashboard will read and write.)
 *
 * The Steward of each memorial controls its visibility in the dashboard.
 * Until then, the flag below is set by the family and the build.
 */

export type MemorialVisibility = "public" | "private";

export interface Memorial {
  slug: string;
  name: string;
  dates: string;
  blurb: string;
  steward: string;
  visibility: MemorialVisibility;
}

export const MEMORIALS: Memorial[] = [
  {
    slug: "jared-terry",
    name: "Jared Nathanael Terry",
    dates: "September 7, 1994 — November 6, 2026",
    blurb:
      "A son, husband, father, ballplayer, and quiet philosopher — his life told in chapters, with a playlist for every chapter.",
    steward: "Joe Terry",
    visibility: "public",
  },
];

/** Only memorials their families have chosen to share publicly. */
export const PUBLIC_MEMORIALS: Memorial[] = MEMORIALS.filter(
  (m) => m.visibility === "public",
);

export function getMemorial(slug: string): Memorial | undefined {
  return MEMORIALS.find((m) => m.slug === slug);
}
