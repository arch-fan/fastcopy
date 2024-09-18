FROM oven/bun:latest AS build
WORKDIR /temp/build

FROM build AS client-build
COPY app/client/package.json bun.lockb ./
RUN bun install
COPY . .
RUN bun run build

FROM build AS server-build
COPY app/server/package.json bun.lockb ./
RUN bun install
COPY . .
RUN bun run build

FROM oven/bun:alpine AS prod
WORKDIR /app
COPY package.json ./
COPY --from=client-build /temp/build/app/client/dist ./public
COPY --from=server-build /temp/build/app/server/dist/index.js ./

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "start" ]