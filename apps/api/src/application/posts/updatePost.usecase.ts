import { z } from "zod";
import { Posts } from "../../domain/posts/posts.entity";
import { PostsRepository } from "../../domain/posts/posts.repository";
import { updatePostSchema } from "@repo/schemas";

export type UpdatePostInput = z.infer<typeof updatePostSchema>;

export class UpdatePostUseCase {
    constructor(private repo: PostsRepository) {}

    async execute(
        postId: number,
        input: UpdatePostInput
    ): Promise<number> {

    const existing = await this.repo.findByPostId(postId);

    if (!existing) {
        throw new Error("postが存在しない")
    }

    const updatedPost = new Posts(
        existing.id,
        existing.storeName,
        existing.userId,
        input.score ?? existing.score,
        input.comment ?? existing.comment,
        existing.imageKey,
        existing.createdAt
    );

    return await this.repo.update(updatedPost);
    }
}