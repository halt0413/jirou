import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1).min(6),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
