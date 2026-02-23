import { Hono } from 'hono'
import { serve } from "bun";
import postsRoute from './presentation/posts/posts.route';
import usersRoute from "./presentation/users/users.route";

const app = new Hono();

app.route("posts", postsRoute);
app.route("users", usersRoute);

serve({
  fetch: app.fetch,
  port: 3001,
});

console.log("Server running on http://localhost:3001");

export default app
