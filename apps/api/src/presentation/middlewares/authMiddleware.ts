import { jwt } from "hono/jwt";
import { Env } from "../../types/env";
import { MiddlewareHandler } from "hono";

export const authMiddleware: MiddlewareHandler<{ Bindings: Env }> =
  async (c, next) => {
    const middleware = jwt({
      secret: c.env.JWT_SECRET,
      alg: "HS256",
    });

    return middleware(c, next);
  };