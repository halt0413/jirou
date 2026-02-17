import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name"),
    email: text("email").notNull(),
    createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export const posts = sqliteTable("posts",{
    id: integer("id").primaryKey({autoIncrement: true}),
    storeName: text("store_name").notNull(),
    userId: text("user_id").notNull(),
    score: integer("score").notNull(),
    comment: text("comment"),
    imageKey: text("image_key"),
    created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
})
