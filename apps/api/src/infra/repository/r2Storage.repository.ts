import { FileStorageRepository } from "../../domain/storage/fileStorage.repository";

export class R2StorageRepository implements FileStorageRepository {
    constructor(private bucket: R2Bucket) {}

    async upload(key: string, file: ArrayBuffer, contentType: string): Promise<string> {
        await this.bucket.put(key, file, {
            httpMetadata: {
                contentType,
            },
        });
        return key;
    }

    async delete(key: string): Promise<void> {
        await this.bucket.delete(key);
    }
}