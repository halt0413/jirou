import { Hono } from 'hono'
import { cors } from "hono/cors";
import postsRoute from './presentation/posts/posts.route';
import usersRoute from "./presentation/users/users.route";
import callsRoute from './presentation/calls/calls.route';
import { authMiddleware } from './presentation/middlewares/authMiddleware';

const app = new Hono();

app.use(
    "*",
    cors({
    origin: "https://jirou-dw3.pages.dev",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    })
);

app.use("/posts/*", authMiddleware);
app.use("/calls/*", authMiddleware);

app.route("/posts", postsRoute);
app.route("/users", usersRoute);
app.route("/calls", callsRoute);

export default app
