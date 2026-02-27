import {z} from "zod";

export const CreatePostSchema = z.object({
    storeName: z.string(),
    score: z.number().min(1).max(5),
    comment: z.string().nullable().optional(),
    imageKey: z.string().optional(),
});

export const updatePostSchema = z.object({
    score: z.number().min(1).max(5).optional(),
    comment: z.string().nullable().optional(),
}) 

export type CreatePostInput = z.infer<typeof CreatePostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;