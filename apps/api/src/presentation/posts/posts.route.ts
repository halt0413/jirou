import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { Env } from "../../types/env";
import { createContainer } from "../../container";
import { CreatePostSchema, updatePostSchema, userIdGetPostsSchema, } from "@repo/schemas";

const postsRoute = new Hono<{Bindings:Env}>();

postsRoute.post("/", zValidator("json", CreatePostSchema), async (c) => {
    const body = c.req.valid("json")
    //後で差し替え
    const userId = "hsmt"
    const { createPostUseCase } = createContainer(c.env);
    
    try {
        const post = await createPostUseCase.execute(body,userId);
        return c.json(post, 201);
    } catch (error) {
        return c.json({error: "エラー" }, 500);
    }
})

postsRoute.get("user/:userId", zValidator("param", userIdGetPostsSchema), async (c) => {
    const { userId } = c.req.valid("param");
    const { findPostsByUserIdUseCase } = createContainer(c.env);

    try {
        const posts = await findPostsByUserIdUseCase.execute(userId);
        return c.json(posts, 200);
    } catch (error) {
        return c.json({error: "エラー" }, 500);
    }
})

postsRoute.get("post/:postId", async (c) => {
    const postId = Number(c.req.param("postId"));

    const { findPostsByPostIdUseCase } = createContainer(c.env);

    try {
        const post = await findPostsByPostIdUseCase.execute(postId);
        return c.json(post, 200);
    } catch (error) {
        return c.json({ error: "Not Found" }, 404);
    }
});

postsRoute.put("/:postId", zValidator("json", updatePostSchema), async (c) => {
    const postId = Number(c.req.param("postId"));
    const input = c.req.valid("json");

    const { updatePostUseCase } = createContainer(c.env);

    try {
        const result = await updatePostUseCase.execute(postId,input);
        return c.json({ updated: result }, 200);
    } catch (error) {
        return c.json({ error: "Not Found" }, 404);
    }
})

export default postsRoute;