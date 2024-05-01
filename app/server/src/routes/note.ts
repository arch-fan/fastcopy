import { client } from "@/lib/redis";
import { Elysia, t } from "elysia";

export default new Elysia({ prefix: "/note" })
  .decorate("redis", client)
  .get(
    "/:path",
    async ({ params: { path }, redis, set }) => {
      const note = await redis.get(decodeURI(path));

      if (!note) {
        set.status = 404;
        return {
          message: "Note not found",
        };
      }

      return { note, ttl: await redis.ttl(path) };
    },
    {
      params: t.Object({
        path: t.String(),
      }),
      response: {
        200: t.Object({
          note: t.String(),
          ttl: t.Number(),
        }),
        404: t.Object({
          message: t.String(),
        }),
      },
    }
  )
  .post(
    "/",
    async ({ body, redis, set }) => {
      const exists = (await redis.exists(body.path)) === 1 ? true : false;

      if (!exists) {
        set.status = "Created";
        await redis.set(body.path, body.content);
        await redis.expire(body.path, body.ttl);
        return;
      }

      set.status = "Conflict";
      return { message: "Note already exists" };
    },
    {
      body: t.Object({
        path: t.String(),
        content: t.String(),
        ttl: t.Number({
          minimum: 0,
          maximum: 60 * 60 * 24 * 7,
          default: 60 * 60 * 24,
        }),
      }),
      response: {
        201: t.Void(),
        409: t.Object({ message: t.String() }),
      },
    }
  )
  .get(
    "/raw/:path",
    async ({ params: { path }, redis, set }) => {
      const note = await redis.get(decodeURI(path));

      if (!note) {
        return;
      }

      set.headers["Content-Type"] = "text/plain; charset=utf-8";
      return note;
    },
    {
      params: t.Object({
        path: t.String(),
      }),
      response: {
        200: t.String(),
        404: t.Void(),
      },
    }
  );
