FROM node:24-alpine AS base
RUN corepack enable
WORKDIR /app

# Dependencies. Installed from the lockfile so builds are reproducible; .npmrc
# is copied too, since it pins @juki-team to the public npm registry.
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

# Build. `prisma generate` writes the client into node_modules/.prisma, so the
# runtime stage must take node_modules from here, not from `deps`.
#
# The bundles @juki-team/base-ui pulls in (mermaid, cytoscape, excalidraw, katex)
# blow past V8's default ~2GB heap on a small build server. 3072 leaves headroom
# for the OS on a 4GB host; raise it if the builder gets more memory.
FROM base AS build
ENV NODE_OPTIONS=--max-old-space-size=3072
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm db:generate && pnpm build

FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build

# remix-serve serves `public/` statically at runtime, relative to cwd, in
# addition to the built assets — that is what makes uploaded PDFs reachable.
COPY --from=build /app/public ./public

# Needed by the `pnpm db:migrate` pre-deploy step, which reads prisma.config.ts.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc prisma.config.ts ./
COPY prisma ./prisma

EXPOSE 3000
CMD ["pnpm", "start"]
