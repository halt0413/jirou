import { Hono } from 'hono'
import { Env } from './types/env'
// import { getDB } from './db/client'
// import { users } from './db/schema'

const app = new Hono<{Bindings : Env }>();

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

//テスト
// app.get("/users", async (c) => {
//   const db = getDB(c.env);
//   const result = await db.select().from(users);
//   return c.json(result);
// });


export default app
