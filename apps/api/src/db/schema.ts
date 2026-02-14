import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name"),
    email: text("email").notNull(),
    createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});
