import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import notes from "./routes/notes";
import note from "./routes/note";
import { staticPlugin } from "@elysiajs/static";

const api = new Elysia({ prefix: "/api" })
  .use(cors())
  .use(swagger())
  .use(notes)
  .use(note);

const app = new Elysia()
  .use(
    staticPlugin({
      prefix: "/",
      alwaysStatic: true,
    })
  )
  .get("/", () => Bun.file("public/index.html"))
  .use(api)
  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
