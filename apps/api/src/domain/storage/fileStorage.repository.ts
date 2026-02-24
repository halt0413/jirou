export interface FileStorageRepository {
    upload(key: string, file: ArrayBuffer, contentType: string): Promise<string>;
}