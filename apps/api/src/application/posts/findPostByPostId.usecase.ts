import { Posts } from "../../domain/posts/posts.entity";
import { PostsRepository } from "../../domain/posts/posts.repository";

export class FindPostsByPostIdUseCase {
    constructor(private repo: PostsRepository){}

    async execute(postId: number): Promise<Posts> {
        return await this.repo.findByPostId(postId);
    }
}