// drizzle-store.repository.ts
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import * as schema from "../db/schema";
import { stores } from "../db/schema";

import type { StoreRepository } from "../../domain/stores/store.repository";
import type { Store } from "../../domain/stores/store.entity";

export class DrizzleStoreRepository implements StoreRepository {
  private db: DrizzleD1Database<typeof schema>;

  constructor(db: DrizzleD1Database<typeof schema>) {
    this.db = db;
  }

  async findById(id: number): Promise<Store | null> {
    const result = await this.db
      .select()
      .from(stores)
      .where(eq(stores.id, id));

    if (!result[0]) return null;

    const row = result[0];

    return {
      id: row.id,
      name: row.name,
      lat: row.lat,
      lng: row.lng,
    };
  }

  async findByName(name: string): Promise<Store | null> {
    const result = await this.db
      .select()
      .from(stores)
      .where(eq(stores.name, name));

    if (!result[0]) return null;

    const row = result[0];

    return {
      id: row.id,
      name: row.name,
      lat: row.lat,
      lng: row.lng,
    };
  }

  async create(name: string, lat: number, lng: number): Promise<Store> {
    const result = await this.db
      .insert(stores)
      .values({ name, lat, lng })
      .returning();

    const row = result[0];

    return {
      id: row.id,
      name: row.name,
      lat: row.lat,
      lng: row.lng,
    };
  }

  async update(
    id: number,
    data: { name?: string; lat?: number; lng?: number }
  ): Promise<void> {
    const updateData: Record<string, unknown> = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.lat !== undefined) updateData.lat = data.lat;
    if (data.lng !== undefined) updateData.lng = data.lng;

    await this.db
      .update(stores)
      .set(updateData)
      .where(eq(stores.id, id));
  }

  async delete(id: number): Promise<void> {
    await this.db
      .delete(stores)
      .where(eq(stores.id, id));
  }

  async getAll(): Promise<Store[]> {
    const result = await this.db.select().from(stores);

    return result.map((row) => ({
      id: row.id,
      name: row.name,
      lat: row.lat,
      lng: row.lng
    }));
  }
}