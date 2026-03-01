import { Posts } from "./posts.entity";

export interface PostsRepository {
    create(post: Posts): Promise<number>;
    findByUserId(userId: string): Promise<Posts[]>;
    findByPostId(postId: number): Promise<Posts>;
    update(post: Posts): Promise<number>;
    findByStore(storeName: string): Promise<Posts[]>
    getAverageScore(storeName: string): Promise<number>;
}

