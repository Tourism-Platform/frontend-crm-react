# Frontend CRM React (Tourism Platform)

Frontend-приложение для управления CRM туристической платформы.

## Описание

React-приложение (на базе Vite) для менеджеров и турагентов, позволяющее работать с каталогом туров, корзиной и заказами.

## Особенности

- ✅ React + TypeScript + Vite
- 📋 FSD архитектура
- 🔄 Автоматическое обновление при разработке
- ⚡ RTK Query для взаимодействия с API

## Требования

- **Node.js** 18+

## Установка

```bash
# Клонируйте репозиторий
git clone https://github.com/Tourism-Platform/frontend-crm-react.git
cd frontend-crm-react

# Установите зависимости
npm install

# Скопируйте файл окружения
cp .env.example .env
```

## Переменные окружения

Создайте файл `.env` в корне проекта (по образу `.env.example`):

```env
VITE_API_URL=
VITE_ENABLE_MSW=
VITE_APP_ENV=
```

### Описание переменных

| Переменная | Описание | Обязательная |
|------------|----------|--------------|
| `VITE_API_URL` | Base URL для API сервера | ✅ |
| `VITE_ENABLE_MSW` | Флаг включения Mock Service Worker (mock API) | ❌ |
| `VITE_APP_ENV` | Текущее окружение приложения (dev, prod и т.д.) | ✅ |

## Команды

```bash
# Разработка с hot-reload
npm run dev

# Сборка проекта
npm run build

# Превью собранного проекта
npm run preview
```
