import { treaty } from "@elysiajs/eden";
import type { App } from "server";

export const { api } = treaty<App>(
  import.meta.env.DEV ? "localhost:4321" : import.meta.env.SITE
);

export interface Note {
  path: string;
  content: string;
  ttl?: number;
}
