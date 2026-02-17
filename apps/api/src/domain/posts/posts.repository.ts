import { Posts } from "./posts.entity";

export interface PostsRepository {
    create(post: Posts): Promise<void>;
    allGet(posts: Posts): Promise<void>;
}