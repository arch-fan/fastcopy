FROM oven/bun:latest AS build

WORKDIR /temp/build
COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN bun run build

FROM oven/bun:alpine AS prod
WORKDIR /app
COPY --from=build /temp/build/app/client/dist ./public
COPY --from=build /temp/build/app/server/dist/index.js ./

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "index.js" ]