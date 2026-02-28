import type { StoreRepository } from "../../domain/stores/store.repository";

export class DeleteStoreUseCase {
  constructor(private storeRepo: StoreRepository) {}

  async execute(id: number): Promise<void> {
    await this.storeRepo.delete(id);
  }
}