import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

export const notes = sqliteTable(
  "notes",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    path: text("path").notNull(),
    content: text("content").notNull(),
    ttl: integer("ttl").notNull(),
    timestamp: integer("timestamp")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    pathIdx: index("path_idx").on(table.path),
  })
);
