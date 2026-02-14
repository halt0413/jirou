import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import type { Env } from "../types/env";

export const getDB = (env : Env) => {
    return drizzle(env.DB, { schema })
}