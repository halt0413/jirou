import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import type { Env } from "../../types/env";
import { createContainer } from "../../container";
import { LoginSchema, RegisterSchema, UpdateProfileSchema } from "@repo/schemas";
import { authMiddleware } from "../middlewares/authMiddleware";

const usersRoute = new Hono<{
  Bindings: Env;
  Variables: {
    userId: string;
  };
}>();

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

// =========================
// update profile (store / review)
// =========================
usersRoute.patch(
  "/update",
  authMiddleware,
  zValidator("json", UpdateProfileSchema),
  async (c) => {
    const body = c.req.valid("json");

    const { updateProfileUseCase } = createContainer(c.env);

    const payload = c.get("jwtPayload");
    const userId = payload.sub;

    if (!userId) {
      return c.json({ error: "認証が必要です" }, 401);
    }

    try {
      await updateProfileUseCase.execute(userId, body);

      return c.json({ message: "更新成功" }, 200);
    } catch (error) {
      console.error(error);
      return c.json({ error: "更新失敗" }, 400);
    }
  }
);

usersRoute.get("/:userId", async (c) => {
  const userId = c.req.param("userId");

  const { getProfileUseCase } = createContainer(c.env);

  try {
    const profile = await getProfileUseCase.execute(userId);
    return c.json(profile, 200);
  } catch {
    return c.json({ message: "User not found" }, 404);
  }
})

export default usersRoute;