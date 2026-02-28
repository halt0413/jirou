import type { StoreRepository } from "../../domain/stores/store.repository";
import type { Store } from "../../domain/stores/store.entity";

export class GetStoreUseCase {
  constructor(private storeRepo: StoreRepository) {}

  async execute(id: number): Promise<Store | null> {
    return await this.storeRepo.findById(id);
  }
}