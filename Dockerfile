# syntax=docker/dockerfile:1
# ^ BuildKit: нужен для --mount=type=secret (токен Sentry не попадает в слои)

# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Кеширование зависимостей
COPY package*.json ./
RUN npm ci

# Копирование исходного кода
COPY . .

# Build args (Vite вшивает VITE_* в бандл на этапе сборки). ARG виден в RUN как
# переменная окружения, поэтому ENV не нужен: значения не остаются в слоях.
# Всё VITE_* попадает в JS-бандл и публично — настоящих секретов здесь быть не должно
ARG VITE_API_URL
ARG VITE_ENABLE_MSW=false
ARG VITE_APP_ENV=prod
# Мониторинг: DSN публичный, release = тег образа из деплоя
ARG VITE_SENTRY_DSN
ARG VITE_APP_RELEASE
# Не секреты: куда грузить source maps (сам токен — только через --secret)
ARG SENTRY_ORG
ARG SENTRY_PROJECT

# Тайпчек и сборка (lint/format/тесты — в CI отдельно).
# Токен Sentry монтируется только на время этого RUN и не остаётся в образе;
# без секрета плагин выключен и source maps не генерируются.
RUN --mount=type=secret,id=sentry_token \
	export SENTRY_AUTH_TOKEN="$(cat /run/secrets/sentry_token 2>/dev/null || true)" && \
	npx tsc -b && npx vite build

# Stage 2: Production Server (Nginx)
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
