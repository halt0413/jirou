import { CallsRepository } from "../../domain/calls/calls.repository";
import { DrizzleD1Database } from "drizzle-orm/d1";
import { Calls } from "../../domain/calls/calls.entity";
import * as schema from "../db/schema";

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
}