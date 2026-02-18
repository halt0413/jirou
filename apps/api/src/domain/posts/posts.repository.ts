import { Posts } from "./posts.entity";

export interface PostsRepository {
    create(post: Posts): Promise<number>;
}