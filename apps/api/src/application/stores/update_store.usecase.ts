import type { StoreRepository } from "../../domain/stores/store.repository";

export interface UpdateStoreDTO {
  id: number;
  name?: string;
  lat?: number;
  lng?: number;
}

export class UpdateStoreUseCase {
  constructor(private storeRepo: StoreRepository) {}

  async execute(data: UpdateStoreDTO): Promise<void> {
    await this.storeRepo.update(data.id, {
      name: data.name,
      lat: data.lat,
      lng: data.lng,
    });
  }
}