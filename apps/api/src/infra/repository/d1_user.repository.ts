import type { DrizzleD1Database } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import * as schema from "../db/schema";
import { users } from "../db/schema";

import type { UserRepository } from "../../domain/users/user.repository";
import type { User } from "../../domain/users/user.entity";

export class DrizzleUserRepository implements UserRepository {
  private db: DrizzleD1Database<typeof schema>;

  constructor(db: DrizzleD1Database<typeof schema>) {
    this.db = db;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!result[0]) return null;

    const row = result[0];

    return {
      id: row.id,
      name: row.name,
      email: row.email,
      password: row.password,
      createdAt: row.created_at
        ? new Date(row.created_at)
        : new Date(),
    };
  }

  async create(
    name: string,
    email: string,
    hashedPassword: string
  ): Promise<User> {
    const result = await this.db
      .insert(users)
      .values({
        id: crypto.randomUUID(),
        name,
        email,
        password: hashedPassword,
      })
      .returning();

    const row = result[0];

    return {
      id: row.id,
      name: row.name,
      email: row.email,
      password: row.password,
      createdAt: row.created_at
        ? new Date(row.created_at)
        : new Date(),
    };
  }
}