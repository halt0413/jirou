import { z } from "zod";

// バリデーションSchema
export const RegisterSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const userIdGetPostsSchema = z.object({
    userId: z.string()
})

export const UpdateProfileSchema = z
  .object({
    store: z.string().nullable().optional(),
    review: z.number().int().nullable().optional(),
  })
  .refine(
    (data) => data.store !== undefined || data.review !== undefined,
    {
      message: "少なくとも1つは更新項目が必要です",
    }
  );