import { CallsRepository } from "../../domain/calls/calls.repository";
import { DrizzleD1Database } from "drizzle-orm/d1";
import { Calls } from "../../domain/calls/calls.entity";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

export class D1CallsRepository implements CallsRepository {
    constructor(private readonly db: DrizzleD1Database<typeof schema>) {}

    async create(call: Calls): Promise<number> {
        const result = await this.db.insert(schema.calls).values({
            userId: call.userId,
            title: call.title,
            ninniku: call.ninniku,
            yasai: call.yasai,
            abura: call.abura,
            karame: call.karame
        });
        const insertedId = result.meta?.last_row_id;
                    
        if (!insertedId) {
            throw new Error("Failed to insert post");
        }

        return  Number(insertedId)
    }

    async delete(call: Calls): Promise<void> {
        
    }

    async findByUserId(userId: string): Promise<Calls[]> {
        const result = await this.db.select().from(schema.calls).where(eq(schema.calls.userId, userId));
            return result.map((row) => new Calls(
                row.id,
                row.userId,
                row.title,
                row.ninniku,
                row.yasai,
                row.abura,
                row.karame
        ));
    }
}