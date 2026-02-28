import { z } from "zod";

export const CreateCallSchema = z.object({
    title: z.string().nullable().optional(),
    ninniku: z.number().min(0).max(4).nullable().optional(),
    yasai: z.number().min(0).max(2).nullable().optional(),
    abura: z.number().min(0).max(2).nullable().optional(),
    karame: z.number().min(1).max(2).nullable().optional(),
    masi: z.number().min(1).max(2).nullable().optional(),
    masimasi: z.number().min(1).max(2).nullable().optional(),

});

export type CreateCallInput = z.infer<typeof CreateCallSchema>;

// test
