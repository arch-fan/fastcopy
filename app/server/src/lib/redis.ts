import { createClient } from "redis";

export const client = await createClient({
  socket: {
    host: Bun.env.NODE_ENV === "development" ? "127.0.0.1" : "redis",
  },
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();
