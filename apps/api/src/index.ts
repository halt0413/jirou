import { Hono } from 'hono'
import postsRoute from './presentation/posts/posts.route';
import usersRoute from "./presentation/users/users.route";

const app = new Hono();

app.route("posts", postsRoute);
app.route("users", usersRoute);

export default app
