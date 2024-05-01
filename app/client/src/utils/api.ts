import { treaty } from "@elysiajs/eden";
import type { App } from "server";

export const { api } = treaty<App>("localhost:3000");

export interface Note {
  path: string;
  content: string;
  ttl?: number;
}
