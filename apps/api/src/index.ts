import { Hono } from 'hono'
import postsRoute from './presentation/posts/posts.route';
import usersRoute from "./presentation/users/users.route";
import callsRoute from './presentation/calls/calls.route';

const app = new Hono();

app.route("posts", postsRoute);
app.route("users", usersRoute);
app.route("calls", callsRoute);

export default app
