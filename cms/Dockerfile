# Strapi production image (build context: cms/)
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S strapi && adduser -S strapi -G strapi
COPY --from=builder /app ./
USER strapi
EXPOSE 1337
CMD ["npm", "run", "start"]
