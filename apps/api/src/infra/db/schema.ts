import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  store: text("store"),
  review: integer("review"),
  created_at: text("created_at"),
});

export const posts = sqliteTable("posts",{
    id: integer("id").primaryKey({autoIncrement: true}),
    storeName: text("store_name").notNull(),
    userId: text("user_id").notNull(),
    score: integer("score").notNull(),
    comment: text("comment"),
    imageKey: text("image_key"),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
})

export const calls = sqliteTable("calls", {
  id: integer("id").primaryKey({autoIncrement: true}),
  userId: text("user_id").notNull(),
  title: text("title"),
  ninniku: integer("ninniku"),
  yasai: integer("yasai"),
  abura: integer("abura"),
  karame: integer("karame"),
  masi: integer("masi"),
  masimasi: integer("masimasi")
})
