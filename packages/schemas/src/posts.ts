import {z} from "zod";

export const CreatePostSchema = z.object({
    storeName: z.string(),
    userId: z.string(),
    score: z.number().min(1).max(5),
    comment: z.string().nullable().optional(),
    imageKey: z.string(),
});

export type CreatePostInput = z.infer<typeof CreatePostSchema>;