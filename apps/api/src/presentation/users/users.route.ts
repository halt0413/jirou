import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import type { Env } from "../../types/env";
import { createContainer } from "../../container";
import { z } from "zod";

// バリデーションSchema
const RegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const usersRoute = new Hono<{ Bindings: Env }>();

// =========================
// register
// =========================
usersRoute.post(
  "/register",
  zValidator("json", RegisterSchema),
  async (c) => {
    const body = c.req.valid("json");
    const { registerUserUseCase } = createContainer(c.env);

    try {
      const user = await registerUserUseCase.execute(
        body.name,
        body.email,
        body.password
      );

      return c.json(user, 201);
    } catch (error) {
        console.error(error);
      return c.json({ error: "ユーザー作成失敗" }, 400);
    }
  }
);

// =========================
// login
// =========================
usersRoute.post(
  "/login",
  zValidator("json", LoginSchema),
  async (c) => {
    const body = c.req.valid("json");
    const { loginUserUseCase } = createContainer(c.env);

    try {
      const result = await loginUserUseCase.execute(
        body.email,
        body.password
      );

      return c.json(result, 200);
    } catch (error) {
        console.error(error);
      return c.json({ error: "ログイン失敗" }, 401);
    }
  }
);

export default usersRoute;