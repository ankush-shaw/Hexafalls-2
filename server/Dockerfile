# ─── AegisOS Enterprise Multi-Agent AI OS Backend ───────────────────────────
# Backend container (Node.js / TypeScript)
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci

COPY src ./src
RUN npm run build

# ─── Production image ────────────────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 5000

CMD ["node", "dist/server.js"]
