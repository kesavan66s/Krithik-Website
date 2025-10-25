import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("reader"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const chapters = pgTable("chapters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  coverImage: text("cover_image"),
  songUrl: text("song_url"),
  order: integer("order").notNull(),
});

export const insertChapterSchema = createInsertSchema(chapters).omit({
  id: true,
});

export type InsertChapter = z.infer<typeof insertChapterSchema>;
export type Chapter = typeof chapters.$inferSelect;

export const sections = pgTable("sections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  chapterId: varchar("chapter_id").notNull().references(() => chapters.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  mood: text("mood").array(),
  tags: text("tags").array(),
  thumbnail: text("thumbnail"),
  songUrl: text("song_url"),
  order: integer("order").notNull(),
});

export const insertSectionSchema = createInsertSchema(sections)
  .omit({
    id: true,
  })
  .extend({
    mood: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  });

export type InsertSection = z.infer<typeof insertSectionSchema>;
export type Section = typeof sections.$inferSelect;

export const pages = pgTable("pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sectionId: varchar("section_id").notNull().references(() => sections.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  pageNumber: integer("page_number").notNull(),
});

export const insertPageSchema = createInsertSchema(pages).omit({
  id: true,
});

export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;

export const readingProgress = pgTable("reading_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  sectionId: varchar("section_id").notNull().references(() => sections.id, { onDelete: "cascade" }),
  pageId: varchar("page_id").references(() => pages.id, { onDelete: "cascade" }),
  currentPageNumber: integer("current_page_number").default(1),
  completed: boolean("completed").notNull().default(false),
  lastReadAt: timestamp("last_read_at").notNull().defaultNow(),
  visitedPages: text("visited_pages").array().default(sql`ARRAY[]::text[]`),
});

export const insertReadingProgressSchema = createInsertSchema(readingProgress).omit({
  id: true,
  lastReadAt: true,
});

export type InsertReadingProgress = z.infer<typeof insertReadingProgressSchema>;
export type ReadingProgress = typeof readingProgress.$inferSelect;

export const analyticsEvents = pgTable("analytics_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  pageId: varchar("page_id").notNull().references(() => pages.id, { onDelete: "cascade" }),
  sectionId: varchar("section_id").notNull().references(() => sections.id, { onDelete: "cascade" }),
  chapterId: varchar("chapter_id").notNull().references(() => chapters.id, { onDelete: "cascade" }),
  eventType: text("event_type").notNull(),
  duration: integer("duration"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).omit({
  id: true,
  timestamp: true,
});

export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;

export const likedSections = pgTable("liked_sections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  sectionId: varchar("section_id").notNull().references(() => sections.id, { onDelete: "cascade" }),
  likedAt: timestamp("liked_at").notNull().defaultNow(),
}, (table) => {
  return {
    // Add unique constraint to prevent duplicate likes
    uniqueUserSection: unique().on(table.userId, table.sectionId),
  };
});

export const insertLikedSectionSchema = createInsertSchema(likedSections).omit({
  id: true,
  likedAt: true,
});

export type InsertLikedSection = z.infer<typeof insertLikedSectionSchema>;
export type LikedSection = typeof likedSections.$inferSelect;
