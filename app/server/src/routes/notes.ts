import { Elysia, t } from "elysia";
import { client } from "@/lib/redis";

export default new Elysia({ prefix: "/notes" })
  .decorate("redis", client)
  .get(
    "/",
    async ({ redis }) => {
      const keys = await redis.keys("*");

      const notes = await Promise.all(
        keys.map(async (key) => ({
          path: key,
          content: (await redis.get(key)) as string,
        }))
      );

      return notes;
    },
    {
      response: {
        200: t.Array(
          t.Object(
            {
              path: t.String(),
              content: t.String(),
            },
            { minProperties: 0 }
          )
        ),
      },
    }
  )
  .delete(
    "/",
    async ({ redis }) => {
      await redis.flushAll();
      return { message: "All notes deleted" };
    },
    {
      response: {
        200: t.Object({
          message: t.String(),
        }),
      },
    }
  );
