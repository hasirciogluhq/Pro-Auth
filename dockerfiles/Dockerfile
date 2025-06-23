# 1. Build frontend statik export (Next.js)
FROM node:20 AS frontend

WORKDIR /app
COPY apps/web ./apps/web

RUN cd apps/web && \
    npm install && \
    npm run build && \
    npm run export

# 2. Final production image (çok küçük)
FROM node:20-slim AS runner

WORKDIR /app

# Serve için gerekli paket
RUN npm install -g serve

# Statik dosyaları kopyala
COPY --from=frontend /app/apps/web/out /app/web

EXPOSE 3000

COPY ./scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

