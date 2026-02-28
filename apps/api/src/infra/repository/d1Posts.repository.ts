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

    async update(post: Posts): Promise<number> {
        if (!post.id) {
            throw new Error("Post id is required for update");
        }
        
        const result = await this.db
        .update(schema.posts)
        .set({
            storeName: post.storeName,
            score: post.score,
            comment: post.comment,
            imageKey: post.imageKey,
        })
        .where(eq(schema.posts.id, post.id));

        return result.meta?.changes ?? 0;
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

    async findByPostId(postId: number): Promise<Posts> {
        const result = await this.db.select().from(schema.posts).where(eq(schema.posts.id, postId));
        const row = result[0]

        if(!row) {
            throw new Error("Postが存在しない")
        }

        return new Posts(
            row.id,
            row.storeName,
            row.userId,
            row.score,
            row.comment,
            row.imageKey,
            new Date(row.createdAt)
        );
    }

    async findByStore(storeName: string): Promise<Posts[]> {
        const storePosts = await this.db.select().from(schema.posts).where(eq(schema.posts.storeName, storeName));
        return storePosts.map((row) => new Posts(
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
