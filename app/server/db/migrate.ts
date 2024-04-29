import { db, connection } from "./db";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

migrate(db, { migrationsFolder: "drizzle/" });

connection.close();
