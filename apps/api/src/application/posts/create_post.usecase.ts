import { Posts } from "../../domain/posts/posts.entity";
import { PostsRepository } from "../../domain/posts/posts.repository";
import type { CreatePostInput } from "@repo/schemas";

//create_post.usecase
export class CreatePostUseCase {
    constructor(private repo: PostsRepository){}

    async execute(input: CreatePostInput): Promise<Posts> {
        const post = new Posts(
            undefined, 
            input.storeName,
            input.userId,
            input.score,
            input.comment ?? null,
            input.imageKey ?? null,
            new Date()
        );
        await this.repo.create(post);
        return post;
    }
}