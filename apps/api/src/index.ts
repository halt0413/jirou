import { Hono } from 'hono'
import postsRoute from './presentation/posts/posts.route';

const app = new Hono();

app.route("post", postsRoute);

export default app
