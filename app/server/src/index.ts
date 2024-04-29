import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import notes from "./routes/notes";

const app = new Elysia({ prefix: "/api" })
  .use(swagger())
  .use(notes)
  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
