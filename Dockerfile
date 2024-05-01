FROM oven/bun:latest as base

WORKDIR /app

FROM base AS build

RUN mkdir -p /temp/dev && cd /temp/dev
COPY . .
RUN bun install --frozen-lockfile && bun run build

# then copy all (non-ignored) project files into the image
FROM base AS prod
COPY --from=build /temp/dev/app/client/dist public
COPY --from=build /temp/dev/app/server/dist .
COPY --from=build /temp/dev/app/server/package.json .
COPY --from=build /temp/dev/app/server/bun.lockb .
RUN bun install --production --frozen-lockfile

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "start" ]