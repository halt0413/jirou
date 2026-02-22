//d1_posts.repository
import { eq } from "drizzle-orm";
import type { PostsRepository } from "../../domain/posts/posts.repository";
import { Posts } from "../../domain/posts/posts.entity";
import * as schema from "../db/schema";
import { DrizzleD1Database } from "drizzle-orm/d1";

export class D1PostsRepository implements PostsRepository {
    constructor(private readonly db: DrizzleD1Database<typeof schema>) {}

    async create(post: Posts): Promise<number> {
        const result = await this.db.insert(schema.posts).values({
            storeName: post.storeName,
            userId: post.userId,
            score: post.score,
            comment: post.comment,
            imageKey: post.imageKey,
            createdAt: post.createdAt.toISOString(),
            });
        const insertedId = result.meta?.last_row_id;
            
        if (!insertedId) {
            throw new Error("Failed to insert post");
        }

        return  Number(insertedId)
    }

    async findByUserId(userId: string): Promise<Posts[]> {
        const result = await this.db.select().from(schema.posts).where(eq(schema.posts.userId, userId));
        return result.map((row) => new Posts(
            row.id,
            row.storeName,
            row.userId,
            row.score,
            row.comment,
            row.imageKey,
            new Date(row.createdAt)
        ));
    }
}
