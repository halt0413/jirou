import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { Env } from "../../types/env";
import { createContainer } from "../../container";
import { CreatePostSchema, userIdGetPostsSchema, } from "@repo/schemas";

const postsRoute = new Hono<{Bindings:Env}>();

postsRoute.post("/", zValidator("json", CreatePostSchema), async (c) => {
    const body = c.req.valid("json")
    //後で差し替え
    const userId = "hsmt"
    const { createPostUseCase } = createContainer(c.env);
    
    try {
        const post = await createPostUseCase.execute(body,userId,);
        return c.json(post, 201);
    } catch (error) {
        return c.json({error: "エラー" }, 500);
    }
})

postsRoute.get("/:userId", zValidator("param", userIdGetPostsSchema), async (c) => {
    const { userId } = c.req.valid("param");
    const { FindPostsByUserIdUseCase } = createContainer(c.env);

    try {
        const posts = await FindPostsByUserIdUseCase.execute(userId);
        return c.json(posts, 200);
    } catch (error) {
        return c.json({error: "エラー" }, 500);
    }
})

export default postsRoute;