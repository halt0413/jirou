// src/container.ts
import { Env } from "./types/env";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./infra/db/schema";
import { D1PostsRepository } from "./infra/repository/d1Posts.repository";
import { CreatePostUseCase } from "./application/posts/createPost.usecase";
import { FindPostsByUserIdUseCase } from "./application/posts/findPostsByUserId.usecase";
import { UpdatePostUseCase } from "./application/posts/updatePost.usecase";
import { FindPostsByPostIdUseCase } from "./application/posts/findPostByPostId.usecase";
export const createContainer = (env: Env) => {
    const db = drizzle(env.DB, {schema});
    const postRepository = new D1PostsRepository(db);
    return {
        createPostUseCase : new CreatePostUseCase(postRepository),
        findPostsByUserIdUseCase: new FindPostsByUserIdUseCase(postRepository),
        findPostsByPostIdUseCase: new FindPostsByPostIdUseCase(postRepository),
        updatePostUseCase: new UpdatePostUseCase(postRepository),
    };
};