FROM oven/bun:latest AS build
WORKDIR /temp/build

COPY package.json .
COPY app/client/package.json app/client/package.json
COPY app/server/package.json app/server/package.json
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM oven/bun:alpine AS prod
WORKDIR /app
COPY package.json ./
COPY --from=build /temp/build/app/client/dist ./public
COPY --from=build /temp/build/app/server/dist/index.js ./

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "start" ]