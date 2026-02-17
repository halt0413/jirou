import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod"

const createPost = z.object({
    score: z.number().min(1).max(5),
    comment: z.string().optional(),
    imageKey: z.string().optional(),
})

const postsRoute = new Hono<{Bindings: {DB: D1Database}}>();

postsRoute.post("/", zValidator("json", createPost), async (c) => {
    const body = c.req.valid("json")

    //後で差し替え
    const userId = "test"

    const { createPostUseCase } = createCntainer(c.env.DB);

    try {
        const post = await createPostUseCase.execute({
            ...body,
            userId,
            comment: body.comment ?? null,
            imageKey: body.imageKey ?? null,
        });
        return c.json(post, 201)
    } catch (error) {
        return c.json({error: "エラー" }, 500);
    }
})

export default postsRoute;