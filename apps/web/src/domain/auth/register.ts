import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(1).min(6),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
