// src/container.ts
import { Env } from "./types/env";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./infra/db/schema";
import { D1PostsRepository } from "./infra/repository/d1_posts.repository";
import { CreatePostUseCase } from "./application/posts/create_post.usecase";
export const createContainer = (env: Env) => {
    const db = drizzle(env.DB, {schema});
    const postRepository = new D1PostsRepository(db);
    return {
        createPostUseCase : new CreatePostUseCase(postRepository),
    };
};