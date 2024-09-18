FROM oven/bun:latest as base

WORKDIR /app

FROM base AS build

WORKDIR /temp/build
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM base AS prod
COPY --from=build /temp/build/app/client/dist /app/public
COPY --from=build /temp/build/app/server/dist/index.js /app/

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "index.js" ]