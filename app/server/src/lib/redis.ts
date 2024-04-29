import { createClient } from "redis";

export const client = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();
