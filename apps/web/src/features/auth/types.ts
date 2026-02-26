import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("メールアドレスの形式で入力してください"),
  password: z
    .string()
    .min(1, "パスワードを入力してください")
    .min(6, "6文字以上で入力してください"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
