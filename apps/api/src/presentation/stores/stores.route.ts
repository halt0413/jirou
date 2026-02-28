// stores.route.ts
import { Hono } from "hono";
import type { Env } from "../../types/env";
import type { Store } from "../../domain/stores/store.entity";
import { createContainer } from "../../container";
import { authMiddleware } from "../../presentation/middlewares/authMiddleware";

export const storesRoute = new Hono<{ Bindings: Env }>();

// GET /stores/:id → 取得は URL パラメータのまま（認証不要）
storesRoute.get("/:id", async (c) => {
  const { getStoreUseCase } = createContainer(c.env);
  const id = Number(c.req.param("id"));

  if (isNaN(id)) {
    return c.json({ message: "Invalid store ID" }, 400);
  }

  const store: Store | null = await getStoreUseCase.execute(id);

  if (!store) {
    return c.json({ message: "Store not found" }, 404);
  }

  return c.json(store);
});

// PUT /stores → 更新（bodyからidを受け取り、認証必須）
storesRoute.put("/", authMiddleware, async (c) => {
  const { updateStoreUseCase } = createContainer(c.env);
  const payload = c.get("jwtPayload");
  const userId = payload.sub;
  if (!userId) return c.json({ message: "Unauthorized" }, 401);

  const body = await c.req.json();
  const id = Number(body.id);
  if (isNaN(id)) {
    return c.json({ message: "Invalid store ID" }, 400);
  }

  const data = {
    name: body.name,
    lat: body.lat,
    lng: body.lng,
  };

  await updateStoreUseCase.execute({ id, ...data });

  return c.json({ message: "Store updated" });
});

// DELETE /stores → 削除（bodyからidを受け取り、認証必須）
storesRoute.delete("/", authMiddleware, async (c) => {
  const { deleteStoreUseCase } = createContainer(c.env);
  const payload = c.get("jwtPayload");
  const userId = payload.sub;
  if (!userId) return c.json({ message: "Unauthorized" }, 401);

  const body = await c.req.json();
  const id = Number(body.id);
  if (isNaN(id)) {
    return c.json({ message: "Invalid store ID" }, 400);
  }

  await deleteStoreUseCase.execute(id);

  return c.json({ message: "Store deleted" });
});

// POST /stores → 作成（認証必須、idはAUTOINCREMENTなので不要）
storesRoute.post("/", authMiddleware, async (c) => {
  const { createStoreUseCase } = createContainer(c.env);
  const payload = c.get("jwtPayload");
  const userId = payload.sub;
  if (!userId) return c.json({ message: "Unauthorized" }, 401);

  const body = await c.req.json();

  const store = await createStoreUseCase.execute({
    name: body.name,
    lat: body.lat,
    lng: body.lng,
  });

  return c.json({ message: "Store created", store });
});

export default storesRoute;