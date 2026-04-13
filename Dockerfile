# Based on
# https://bun.com/docs/bundler/fullstack#docker-deployment
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Install dependencies (including dev deps needed for the build step).
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source code.
COPY build.ts ./
COPY src ./src

# Build the fullstack executable with Bun.build() so the Tailwind plugin is
# applied during asset bundling.
RUN bun run build

# Production stage — only the compiled output is shipped.
FROM oven/bun:1-slim
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --from=base /usr/src/app/dist/server ./server

EXPOSE 3000
CMD ["./server"]
