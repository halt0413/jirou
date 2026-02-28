import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import type { Env } from "../../types/env";
import type { Store } from "../../domain/stores/store.entity";
import { createContainer } from "../../container";
import { createStoreSchema, updateStoreSchema, deleteStoreSchema, getStoreSchema } from "@repo/schemas";

export const storesRoute = new Hono<{ Bindings: Env }>();

storesRoute.get("/", async (c) => {
  const { getStoreUseCase } = createContainer(c.env);

  const stores: Store[] = await getStoreUseCase.getAll?.() || [];
  return c.json(stores);
});


// 取得 (GET)
storesRoute.get("/:id", zValidator("param", getStoreSchema), async (c) => {
  const { id } = c.req.valid("param");
  const { getStoreUseCase } = createContainer(c.env);

  const store: Store | null = await getStoreUseCase.execute(id);
  if (!store) return c.json({ message: "Store not found" }, 404);

  return c.json(store);
});

// 作成 (POST)
storesRoute.post("/", zValidator("json", createStoreSchema), async (c) => {
  const { createStoreUseCase } = createContainer(c.env);
  const payload = c.get("jwtPayload");
  const userId = payload.sub;
  if (!userId) return c.json({ message: "Unauthorized" }, 401);

  const body = c.req.valid("json");

  try {
    const store = await createStoreUseCase.execute({
      name: body.name,
      lat: body.lat,
      lng: body.lng,
    });

    return c.json({ message: "Store created", store });
  } catch (err: unknown) { 
    if (err instanceof Error) { 
      if (err.message.includes("UNIQUE constraint failed")) {
        return c.json({ message: "This store name already exists" }, 400);
      }
    }
    return c.json({ message: "Failed to create store" }, 500);
  }
});

// 更新 (PUT)
storesRoute.put("/", zValidator("json", updateStoreSchema), async (c) => {
  const { id, name, lat, lng } = c.req.valid("json");
  const payload = c.get("jwtPayload");
  const userId = payload?.sub;
  if (!userId) return c.json({ message: "Unauthorized" }, 401);

  const { getStoreUseCase, updateStoreUseCase } = createContainer(c.env);

  const store = await getStoreUseCase.execute(id);
  if (!store) return c.json({ message: "Store not found" }, 404);

  await updateStoreUseCase.execute({ id, name, lat, lng });
  return c.json({ message: "Store updated" });
});

// 削除 (DELETE)
storesRoute.delete("/", zValidator("json", deleteStoreSchema), async (c) => {
  const { id } = c.req.valid("json");
  const payload = c.get("jwtPayload");
  const userId = payload?.sub;
  if (!userId) return c.json({ message: "Unauthorized" }, 401);

  const { getStoreUseCase, deleteStoreUseCase } = createContainer(c.env);

  const store = await getStoreUseCase.execute(id);
  if (!store) return c.json({ message: "Store not found" }, 404);

  await deleteStoreUseCase.execute(id);
  return c.json({ message: "Store deleted" });
});

export default storesRoute;