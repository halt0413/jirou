// src/application/stores/get_store.usecase.ts
import type { StoreRepository } from "../../domain/stores/store.repository";
import type { Store } from "../../domain/stores/store.entity";

export class GetStoreUseCase {
  // private で宣言することで this.storeRepository が使える
  constructor(private storeRepository: StoreRepository) {}

  // ID指定で取得
  async execute(id: number): Promise<Store | null> {
    return this.storeRepository.findById(id);
  }

  // 全件取得
  async getAll(): Promise<Store[]> {
    return this.storeRepository.getAll();
  }
}