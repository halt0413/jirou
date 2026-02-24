import { Posts } from "../../domain/posts/posts.entity";
import { PostsRepository } from "../../domain/posts/posts.repository";
import type { CreatePostInput } from "@repo/schemas";

//create_post.usecase
export class CreatePostUseCase {
    constructor(private repo: PostsRepository){}

    async execute(input: CreatePostInput, userId: string): Promise<Posts> {
        const post = new Posts(
            undefined, 
            input.storeName,
            userId,
            input.score,
            input.comment ?? null,
            null,
            new Date()
        );
        const id = await this.repo.create(post);
        return new Posts(
            id,
            post.storeName,
            post.userId,
            post.score,
            post.comment,
            post.imageKey,
            post.createdAt
        );
    }
}
