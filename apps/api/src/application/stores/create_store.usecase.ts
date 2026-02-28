import type { StoreRepository } from "../../domain/stores/store.repository";
import type { Store } from "../../domain/stores/store.entity";

export class CreateStoreUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(data: {
    name: string;
    lat: number;
    lng: number;
  }): Promise<Store> {
    return this.storeRepository.create(data.name, data.lat, data.lng);
  }
}