import { Posts } from "../../domain/posts/posts.entity";
import { PostsRepository } from "../../domain/posts/posts.repository";

export class FindPostsByUserIdUseCase {
    constructor(private repo: PostsRepository){}

    async execute(userId: string): Promise<Posts[]> {
        return await this.repo.findByUserId(userId)
    }
}