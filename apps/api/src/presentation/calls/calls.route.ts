import { zValidator } from "@hono/zod-validator";
import { CreateCallSchema } from "@repo/schemas";
import { Hono } from "hono";
import { createContainer } from "../../container";
import { Env } from "../../types/env";



const callsRoute = new Hono<{Bindings:Env}>();

callsRoute.post("/", zValidator("json", CreateCallSchema), async (c) => {
    const body = c.req.valid("json")
    //後で差し替え
    const userId = "bc6b45f0-51fa-4a18-9eec-17fabc4fa6f0"
    const { createCallUseCase } = createContainer(c.env);
    
    try {
        const call = await createCallUseCase.execute(body,userId);
        return c.json(call, 201);
    } catch (error) {
        console.log(error)
        return c.json({error: "エラー" }, 500);
    }
})

export default callsRoute;