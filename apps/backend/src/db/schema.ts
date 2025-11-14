import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: text("role").$type<"admin" | "owner">().notNull(),
});

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  page: varchar("page", { length: 255 }).notNull(), // e.g., landing, about_us
  section: varchar("section", { length: 255 }).notNull(), // e.g., "hero", "about", "search"
  key: varchar("key", { length: 255 }).notNull(), // e.g., "heading", "paragraph", "button_text"
  value: text("value").notNull(),
  last_updated_at: timestamp("last_updated_at"),
});
