// src/container.ts
// import { drizzle } from "drizzle-orm/d1";
// import * as schema from "./infra/db/schema";
// // import { D1PostRepository } from "./infra/repository/d1_posts.repository";
// // import { CreatePostUseCase } from "./appliction/posts/create_post.usecase";

// export const createContainer = (d1: D1Database) => {
//     const db = drizzle(d1, { schema });

//     const postRepository = new D1PostRepository(db);
//     const createPostUseCase = new CreatePostUseCase(postRepository);

//     return {
//         createPostUseCase,
//     };
// };