import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Run `npm run db:push` with DATABASE_URL set (Neon) to create this table.
export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  tier: text("tier").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
