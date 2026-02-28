import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { Env } from "../../types/env";
import { createContainer } from "../../container";
import { CreatePostSchema, updatePostSchema, userIdGetPostsSchema, } from "@repo/schemas";

const postsRoute = new Hono<{Bindings:Env}>();

postsRoute.post("/", zValidator("json", CreatePostSchema), async (c) => {
    const body = c.req.valid("json")
    // //後で差し替え
    // const userId = "hsmt"

    const payload = c.get("jwtPayload");
    const userId = payload.sub;
    const { createPostUseCase } = createContainer(c.env);
    
    try {
        const post = await createPostUseCase.execute(body,userId);
        return c.json(post, 201);
    } catch (error) {
        console.log(error)
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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
        return c.json({ error: "Not Found" }, 404);
    }
})

postsRoute.post("/images/:postId", async (c) => {
    const postId = Number(c.req.param("postId"));

    const formData = await c.req.formData();
    const image = formData.get("image") as File | null;

    if (!image || typeof image === "string") {
        return c.json({ error: "画像が必要です" }, 400);
    }

    const file = {
    buffer: await image.arrayBuffer(),
    contentType: image.type,
    };

    const { uploadPostImageUseCase } = createContainer(c.env);

    try {
        await uploadPostImageUseCase.execute(postId, file);
        return c.json({ message: "アップロード成功" });
    } catch (error) {
        console.log(error)
        return c.json({ error: "失敗" }, 400);
    }
});

postsRoute.get("/images/:userId", async (c) => {
    const userId = c.req.param("userId");
    console.log("userId:", userId); // ← 追加

    if (!userId) {
        return c.json({ error: "userId is missing" }, 400);
    }
    const { findPostsByUserIdUseCase } = createContainer(c.env);

    const posts = await findPostsByUserIdUseCase.execute(userId);

    const baseUrl =
    "https://pub-25b3273b858541b2bce490e28e512b1c.r2.dev";

    const images = posts
        .filter((p) => p.imageKey)
        .map((p) => ({
            postId: p.id,
            imageUrl: `${baseUrl}/${p.imageKey}`,
        })
    );
    return c.json(images);
})

export default postsRoute;