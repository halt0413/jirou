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