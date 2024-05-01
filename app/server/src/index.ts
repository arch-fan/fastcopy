import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import notes from "./routes/notes";
import note from "./routes/note";
import { staticPlugin } from "@elysiajs/static";

const app = new Elysia({ prefix: "/api" })
  .use(cors())
  .use(swagger())
  .use(staticPlugin())
  .use(notes)
  .use(note)
  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
