# Ошибки, сессия и мониторинг

## Обновление после деплоя — `vite:preloadError`

После деплоя старые чанки удаляются, и открытая со старой версией вкладка не может загрузить ленивую страницу. [src/main.tsx](../src/main.tsx) слушает `vite:preloadError` и перезагружает вкладку на новую версию. Защита от цикла — не чаще раза в 10 секунд (ключ `chunk-reload-at` в `sessionStorage`).

- Срабатывает только в сборке: в dev-режиме preload-хелпера Vite нет.
- Если на странице есть несохранённый автосейв, `beforeunload` из `use-autosave` покажет браузерный диалог «Покинуть сайт?».

## Истёкшая сессия — `sessionExpired`

- `authBaseQuery` (бизнес-API в `authApi`) диспатчит `sessionExpired` на любой 401.
- `baseApi` (только auth: `/auth/me`, логин, выход) делает это на 401 от `/auth/me` и `/auth/logout`. 401 на логине — это неверные данные, а не истёкшая сессия.

[auth-session.listener.ts](../src/entities/auth/model/auth-session.listener.ts) выполняет выход один раз, даже если параллельно пришло несколько 401:

1. Если `isAuth` уже `false`, ничего не делает.
2. `logout()` сразу снимает флаг.
3. `signOut` закрывает сессию на сервере. Без этого живая cookie вернула бы аккаунт на `/me`, и 401 пошёл бы по кругу.
4. `resetAllApiState` сбрасывает кэш всех API, включая аккаунт в `baseApi`. После этого `ProtectedRoute` перезапрашивает `/me` и уводит на `/login`.

## Мониторинг — `monitoring` (Sentry)

Код приложения знает только порт [monitoring](../src/shared/lib/monitoring/monitoring.ts) из `@/shared/lib`:

```ts
monitoring.captureError(error, { tags, extra, fingerprint });
monitoring.setUser({ id, role }); // null — выход
monitoring.addBreadcrumb(message, data);
```

Sentry SDK импортируется только в `src/shared/lib/monitoring/sentry/**`. ESLint запрещает `@sentry/*` в остальном коде (группа `sentry` в `eslint.config.js`).

**Когда включён:** в production-сборке при заданном `VITE_SENTRY_DSN`. В dev — только при `VITE_SENTRY_ENABLED=true`. Иначе работает пустой адаптер: ничего не отправляет, в dev пишет `[monitoring] …` в `console.debug`.

Условие включения читается в [monitoring.ts](../src/shared/lib/monitoring/monitoring.ts) напрямую из `import.meta.env`, а не через `ENV`. Vite подставляет значения при сборке, поэтому **без DSN SDK Sentry и Replay вырезаются из бандла** (около 86 КБ gzip). С DSN Sentry попадает в главный чанк.

**Что уходит автоматически:**

- ошибки рендера всех ErrorBoundary и необработанные ошибки — через React 19 `onCaughtError` / `onUncaughtError` / `onRecoverableError` в `createRoot` ([main.tsx](../src/main.tsx));
- ошибки API ([api-error-monitoring.middleware.ts](../src/app/providers/store/api-error-monitoring.middleware.ts)) — только 5xx и `FETCH_ERROR` / `PARSING_ERROR` / `TIMEOUT_ERROR` при `navigator.onLine`. 4xx — это бизнес-логика, они не отправляются. Ошибки группируются по `["api", endpoint, status]`;
- пользователь ([auth-monitoring.listener.ts](../src/entities/auth/model/auth-monitoring.listener.ts)) — `id` и `role` при входе и восстановлении сессии, без email;
- навигация с параметризованными роутами — через `wrapCreateBrowserRouter` в `router.tsx`;
- Session Replay — только вокруг ошибки, текст, поля ввода и медиа замаскированы.

**Чего нет:** cookies, заголовков и тел запросов. Чувствительные query-параметры (`token`, `password`, `key`…) заменяются на `[Filtered]` ([sentry.scrubber.ts](../src/shared/lib/monitoring/sentry/sentry.scrubber.ts)).

**Порядок инициализации:** `import "@/shared/lib/monitoring/monitoring.init"` в `main.tsx` должен идти раньше `@/app`, потому что роутер создаётся при импорте App. С алиасами `@/` сортировка импортов Prettier ставит `@/shared/*` раньше `@/app/*` автоматически. Относительные импорты (`./app`, `./shared`) в `main.tsx` не используйте.

### Сборка и деплой

| Переменная | Где | Зачем |
| --- | --- | --- |
| `VITE_SENTRY_DSN` | build arg | DSN проекта (публичный) |
| `VITE_APP_ENV` | build arg | `environment` в Sentry |
| `VITE_APP_RELEASE` | build arg | тег образа; тот же релиз у source maps |
| `SENTRY_ORG`, `SENTRY_PROJECT` | build arg | куда грузить source maps |
| `SENTRY_AUTH_TOKEN` | BuildKit-секрет `sentry_token` | загрузка source maps; в слоях образа не остаётся |

```bash
DOCKER_BUILDKIT=1 docker build \
  --build-arg VITE_SENTRY_DSN=... --build-arg VITE_APP_ENV=prod \
  --build-arg VITE_APP_RELEASE="$TAG" --build-arg SENTRY_ORG=... --build-arg SENTRY_PROJECT=... \
  --secret id=sentry_token,env=SENTRY_AUTH_TOKEN \
  -t tourfirm:"$TAG" .
```

Без токена плагин `@sentry/vite-plugin` выключен, и source maps не генерируются. С токеном карты собираются как `hidden`, загружаются в Sentry и удаляются из `dist`, так что nginx их не раздаёт.

События идут напрямую в Sentry, без туннеля через свой домен, поэтому часть из них могут резать блокировщики рекламы. Туннель (`location /monitoring` в nginx) — отдельная задача.
