import { Calls } from "./calls.entity";

export interface CallsRepository {
    create(call: Calls): Promise<number>;
    // findByUserId(userId: string): Promise<Calls[]>;
    // delete(call: Calls): Promise<void>;
}