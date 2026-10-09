import { pgTable, text, timestamp, uuid, boolean, integer } from "drizzle-orm/pg-core";

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

// --- Gift certificates (Q4 gifting) ---
// A buyer purchases a tier as a gift; the recipient redeems the code after
// the holidays (or whenever they're ready) and the redemption creates a
// normal order row. Payment is NOT wired yet — certificates are created with
// status "pending_payment" and a Stripe checkout/webhook will flip them to
// "issued" (see POST /api/gift). Until then this table doubles as the
// committed-buyer lead list for launch day.
export const giftCertificates = pgTable("gift_certificates", {
  id: uuid("id").defaultRandom().primaryKey(),
  // Human-readable code, e.g. "FM-7X2K9P". Unique; shown on the certificate.
  code: text("code").notNull().unique(),
  tier: text("tier").notNull(),
  amountCents: integer("amount_cents").notNull(),
  buyerName: text("buyer_name").notNull(),
  buyerEmail: text("buyer_email").notNull(),
  recipientName: text("recipient_name").notNull(),
  recipientEmail: text("recipient_email").notNull(),
  message: text("message"),
  // When the certificate should be delivered to the recipient. Null = now.
  deliverAt: timestamp("deliver_at"),
  // pending_payment -> issued -> redeemed
  status: text("status").notNull().default("pending_payment"),
  // Clickwrap consent to the gift purchase terms, same pattern as orders.
  agreedToTerms: boolean("agreed_to_terms").notNull().default(false),
  agreedToTermsAt: timestamp("agreed_to_terms_at"),
  termsVersion: text("terms_version"),
  redeemedAt: timestamp("redeemed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
