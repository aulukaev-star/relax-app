# 1) deps
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 2) build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3) run
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# если используешь Next.js standalone (не обяз.), можно улучшить позже
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./ 2>/dev/null || true

EXPOSE 3000
CMD ["npm", "run", "start"]