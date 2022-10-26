FROM node:16-alpine AS node-base

FROM node-base AS build-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node-base AS builder
WORKDIR /app
COPY . .
COPY --from=build-deps /app/node_modules ./node_modules
RUN yarn build

FROM gcr.io/distroless/nodejs:16 AS runner
WORKDIR /app

# Mark as prod, disable telemetry, set port
ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

# Copy from build
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/next-i18next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

ENV LINE_LOGIN_CHANNEL_ID ${LINE_LOGIN_CHANNEL_ID}
ENV DATABASE_URL ${DATABASE_URL}

EXPOSE 3000

# Run app command
CMD ["./node_modules/next/dist/bin/next", "start"]