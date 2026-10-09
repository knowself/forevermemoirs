import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";

// Run `npm run db:push` with DATABASE_URL set (Neon) to create this table.
export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  tier: text("tier").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  // --- Consent proof (FM Door item 4) ---
  // Clickwrap agreement to the Terms of Service and the photo-rights warranty,
  // captured from the order form's required checkboxes. Stored per order with
  // timestamps and the policy version in effect, so consent is provable from
  // the database — not just server logs. Required before paid uploads.
  agreedToTerms: boolean("agreed_to_terms").notNull().default(false),
  agreedToTermsAt: timestamp("agreed_to_terms_at"),
  termsVersion: text("terms_version"),
  confirmedPhotoRights: boolean("confirmed_photo_rights").notNull().default(false),
  confirmedPhotoRightsAt: timestamp("confirmed_photo_rights_at"),
  photoRightsVersion: text("photo_rights_version"),
  // --- Uploaded photo keys (secure uploads) ---
  // R2 object keys for the customer's images, e.g. "uploads/<uuid>-scan.jpg".
  // Image bytes live in Cloudflare R2; the database holds only the keys.
  photoKeys: text("photo_keys").array(),
});
