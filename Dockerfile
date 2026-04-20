# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Кеширование зависимостей
COPY package*.json ./
RUN npm ci

# Копирование исходного кода
COPY . .

# Проброс переменных окружения для Vite (встраиваются в бандл при сборке)
ARG VITE_API_URL
ARG VITE_ENABLE_MSW=false
ARG VITE_APP_ENV=prod

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_ENABLE_MSW=$VITE_ENABLE_MSW
ENV VITE_APP_ENV=$VITE_APP_ENV

# Собираем только Vite (без lint/format — они для CI отдельно)
RUN npx vite build

# Stage 2: Production Server (Nginx)
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
