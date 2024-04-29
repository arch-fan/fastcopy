import { db } from "db";
import { Elysia, t } from "elysia";
import { notes } from "db";
import { lt, sql } from "drizzle-orm";
import { cron } from "@elysiajs/cron";

export default new Elysia({ prefix: "/notes" })
  .decorate("db", db)
  .use(
    cron({
      name: "Clean notes",
      pattern: "*/10 * * * * *",
      run: async () => {
        console.log("Cleaning notes...", Date.now());

        const note = await db
          .select({ time: sql`TIMEDIFF(${notes.timestamp} + ${notes.ttl})` })
          .from(notes)
          .where(lt(sql`${notes.timestamp} + ${notes.ttl}`, Date.now()));

        console.log(note);
      },
    })
  )
  .get(
    "/:path",
    async ({ params: { path }, db, set }) => {
      const note = await db
        .select()
        .from(notes)
        .where(eq(notes.path, path))
        .limit(1);

      if (note.length === 0) {
        set.status = 404;
        return {
          message: "Note not found",
        };
      }

      return note[0];
    },
    {
      params: t.Object({
        path: t.String(),
      }),
      response: {
        200: t.Object({
          path: t.String(),
          id: t.Number(),
          timestamp: t.Number(),
          content: t.String(),
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
    async ({ body, db, set }) => {
      const ifExists = await db
        .select()
        .from(notes)
        .where(eq(notes.path, body.path))
        .limit(1);

      if (ifExists.length > 0) {
        set.status = "Conflict";

        return {
          message: "Note already exists",
        };
      }

      await db.insert(notes).values({
        ...body,
      });
    },
    {
      body: t.Object({
        path: t.String(),
        content: t.String(),
        ttl: t.Number({ minimum: 0, maximum: 604800000 }),
      }),
    }
  );
