import type { Store } from "./store.entity";

export interface StoreRepository {
  findById(id: number): Promise<Store | null>;

  findByName(name: string): Promise<Store | null>;

  create(name: string, lat: number, lng: number): Promise<Store>;

  update(
    id: number,
    data: {
      name?: string;
      lat?: number;
      lng?: number;
    }
  ): Promise<void>;

  delete(id: number): Promise<void>;

  getAll(): Promise<Store[]>;
}