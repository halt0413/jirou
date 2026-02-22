import {z} from "zod";

export const CreatePostSchema = z.object({
    storeName: z.string(),
    score: z.number().min(1).max(5),
    comment: z.string().nullable().optional(),
    imageKey: z.string(),
});

export const userIdGetPostsSchema = z.object({
    userId: z.string()
})

export type CreatePostInput = z.infer<typeof CreatePostSchema>;