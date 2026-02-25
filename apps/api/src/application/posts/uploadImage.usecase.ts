import { PostsRepository } from "../../domain/posts/posts.repository";
import { FileStorageRepository } from "../../domain/storage/fileStorage.repository";

export class UploadImagesUseCase {
    constructor(private repo: PostsRepository, private storage: FileStorageRepository ) {}

    async execute(postId: number, file: { buffer: ArrayBuffer; contentType: string }): Promise<void> {
        const post = await this.repo.findByPostId(postId)

        if (!post) {
            throw new Error("postが存在しない")
        }

        if (!file.contentType.startsWith("image/")) {
            throw new Error("画像のみアップロード可能");
        }

        if (post.imageKey) {
            await this.storage.delete(post.imageKey);
        }

        const extension = file.contentType.split("/")[1] ?? "jpg";
        const key = `posts/${postId}/${crypto.randomUUID()}.${extension}`;

        const imageKey = await this.storage.upload(key, file.buffer, file.contentType);

        const updateImage = post.updateImage(imageKey)
        await this.repo.update(updateImage)

    }
}