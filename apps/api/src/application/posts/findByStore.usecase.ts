import { PostsRepository } from "../../domain/posts/posts.repository";

export class FindPostsByStoreUseCase {
    constructor (private repo: PostsRepository) {}

    async execute(storeName: string) {
        const post = await  this.repo.findByStore(storeName)

        if(!post) {
            throw new Error ("postが存在しない")
        }
        return post
    }
}