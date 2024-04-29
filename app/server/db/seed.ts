import { db, notes } from "db";
import { sql } from "drizzle-orm";

db.run(sql`DELETE FROM sqlite_sequence WHERE name = ${notes}`);

await db.delete(notes);

await db.insert(notes).values([
  {
    path: "hello",
    content: "Hello, World!",
    ttl: 1000 * 60 * 60 * 24,
  },
  {
    path: "goodbye",
    content: "Goodbye, World!",
    ttl: 1000 * 60 * 2,
  },
]);
