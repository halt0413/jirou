import { zValidator } from "@hono/zod-validator";
import { CreateCallSchema } from "@repo/schemas";
import { Hono } from "hono";
import { createContainer } from "../../container";
import { Env } from "../../types/env";



const callsRoute = new Hono<{Bindings:Env}>();

callsRoute.post("/", zValidator("json", CreateCallSchema), async (c) => {
    const body = c.req.valid("json")

    const payload = c.get("jwtPayload");
    const userId = payload.sub;
    const { createCallUseCase } = createContainer(c.env);
    
    try {
        const call = await createCallUseCase.execute(body,userId);
        return c.json(call, 201);
    } catch (error) {
        console.log(error)
        return c.json({error: "エラー" }, 500);
    }
})

callsRoute.get("/", async (c) => {
    const payload = c.get("jwtPayload");
    const userId = payload.sub;
    
    const { findCallsByUserIdUseCase } = createContainer(c.env);

    try {
        const posts = await findCallsByUserIdUseCase.execute(userId);
        return c.json(posts, 200);
    } catch (error) {
        console.log(error)
        return c.json({error: "エラー" }, 500);
    }
})

callsRoute.delete("/:callId", async (c) => {
    const callId = Number(c.req.param("callId"));

    const payload = c.get("jwtPayload");
    const userId = payload.sub;

    const { deleteCallUseCase } = createContainer(c.env);

    try {
        await deleteCallUseCase.execute(userId, callId);
        return c.json({ message: "Deleted" }, 200);
    } catch (error) {
        console.log(error);
        return c.json({ error: "エラー" }, 500);
    }
});

export default callsRoute;