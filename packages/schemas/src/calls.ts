import { z } from "zod";

export const CreateCallSchema = z.object({
    title: z.string().optional(),
    ninniku: z.number().min(0).max(3).optional(),
    yasai: z.number().min(0).max(3).optional(),
    abura: z.number().min(0).max(3).optional(),
    karame: z.number().min(1).max(3).optional(),
});

export type CreateCallInput = z.infer<typeof CreateCallSchema>;