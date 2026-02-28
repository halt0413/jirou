import { Hono } from 'hono'
import { cors } from "hono/cors";
import postsRoute from './presentation/posts/posts.route';
import usersRoute from "./presentation/users/users.route";
import callsRoute from './presentation/calls/calls.route';
import storesRoute from './presentation/stores/stores.route';
import { authMiddleware } from './presentation/middlewares/authMiddleware';

const app = new Hono();

app.use(
    "*",
    cors({
    origin: ["https://jirou-dw3.pages.dev", "http://localhost:3000"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    })
);

app.use("/posts/*", authMiddleware);
app.use("/calls/*", authMiddleware);
app.use("/stores/*", authMiddleware);

app.route("/posts", postsRoute);
app.route("/users", usersRoute);
app.route("/calls", callsRoute);
app.route("/stores", storesRoute);

export default app
