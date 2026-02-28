import { z } from "zod";

export const CreateCallSchema = z.object({
    title: z.string().optional(),
    ninniku: z.number().min(0).max(3).nullable().optional(),
    yasai: z.number().min(0).max(3).nullable().optional(),
    abura: z.number().min(0).max(3).nullable().optional(),
    karame: z.number().min(0).max(3).nullable().optional(),
});

export type CreateCallInput = z.infer<typeof CreateCallSchema>;

// test
