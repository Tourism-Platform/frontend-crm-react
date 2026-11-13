# Тесты и CI

Три уровня проверок. Все запускаются локально и в CI ([.github/workflows/ci.yml](../.github/workflows/ci.yml)).

| Команда | Что проверяет | Job в CI |
| --- | --- | --- |
| `npx tsc -b` | типы (app, node, e2e) | `Types, lint, format` |
| `npm run lint` | ESLint: FSD-границы, импорты, нейминг | `Types, lint, format` |
| `npm run format:check` | Prettier без записи (`npm run format` — с записью) | `Types, lint, format` |
| `npm test` | Vitest: юнит, хуки, компоненты | `Vitest` |
| `npm run test:coverage` | то же + отчёт покрытия в `coverage/` | — |
| `npm run test:e2e` | Playwright smoke на MSW | `Playwright` |

Секреты CI не нужны: фиктивные `VITE_*` заданы в `vitest.config.ts` и `playwright.config.ts`, Sentry в тестах выключен.

> **Windows:** запускайте `npm test` из PowerShell или терминала VS Code. Git Bash отдаёт путь с маленькой буквой диска (`d:/…`), и Vitest загружает `vitest` дважды. Тогда хуки в `src/app/test/setup.ts` падают с «Vitest failed to find the runner».

## Vitest

Конфиг [vitest.config.ts](../vitest.config.ts) берёт алиасы и плагины из `vite.config.ts` и добавляет:

- `environment: "jsdom"` для всех тестов. Чистой логике, которой DOM мешает, ставьте `// @vitest-environment node` первой строкой (пример — `tiptap-to-html.test.ts`);
- `include: ["src/**/*.test.{ts,tsx}"]`: `e2e/*.spec.ts` запускает только Playwright;
- `TZ: "UTC"`: даты не зависят от пояса машины;
- `restoreMocks`, `unstubGlobals`, `unstubEnvs`: `vi.spyOn`, `vi.stubGlobal` и `vi.stubEnv` сбрасываются после каждого теста.

### Глобальный setup — [src/app/test/setup.ts](../src/app/test/setup.ts)

- jest-dom матчеры;
- i18n подменяется на [src/app/test/i18n.ts](../src/app/test/i18n.ts): синхронный инстанс i18next с переводами из `public/locales/en`, без HttpBackend и детектора;
- заглушки `matchMedia`, `ResizeObserver`, `IntersectionObserver` (их нет в jsdom);
- после каждого теста: `cleanup()`, `localStorage.clear()`, снятие класса темы с `<html>`.

### MSW в тестах — подключается в файле, не глобально

Граф моков тяжёлый, и большинству тестов он не нужен. Тест, которому нужен моковый бэкенд, вызывает [setupMswServer()](../src/app/mws/setup-msw-server.ts) на верхнем уровне файла:

```ts
setupMswServer(); // listen({ onUnhandledRequest: "error" }) + сброс handlers/подписок/мок-сторов
```

Незамоканный запрос — ошибка теста: в тестах нет настоящей сети. Подменить ответ можно так: `server.use(createMockHandler(PATHS.x, () => HttpResponse.json(..., { status: 500 })))`.

### Хелпер `trackRequests`

[trackRequests / requestsTo](../src/app/test/track-requests.ts) — запросы, которые реально ушли в моковый бэкенд (метод, путь, query, тело). Нужен `setupMswServer()` в файле.

```ts
setupMswServer();

const requests = trackRequests();
store.dispatch(sessionExpired());
await vi.waitFor(() => expect(requestsTo(requests, AUTH_PATHS.logoutUser.url)).toHaveLength(1));
```

Пример теста store и слушателей: [auth-session.listener.test.ts](../src/entities/auth/model/auth-session.listener.test.ts).

## Playwright (e2e)

- [playwright.config.ts](../playwright.config.ts) поднимает свой `vite` на порту 5175 с `VITE_ENABLE_MSW=true` и фиктивными `http://api.test` / `http://document.test`. Чужой dev-сервер не переиспользуется.
- [e2e/global-setup.ts](../e2e/global-setup.ts) прогревает Vite перед тестами: проходит обеими ролями все разделы, пока Vite не перестанет перезагружать страницы из-за оптимизации зависимостей.
- [e2e/smoke.spec.ts](../e2e/smoke.spec.ts) — для оператора и агента: вход, затем обход всех пунктов верхнего меню **через само меню** (клиентская навигация SPA, без перезагрузки). На каждом разделе проверяется, что нет экрана ошибки («Ошибка рендеринга», «Unexpected Application Error!»), `pageerror` и `console.error`.
  - Ожидаемые ошибки — только ответы 4xx (например, 401 `/auth/me` до входа).
  - **501 — падение**: это незамоканный эндпоинт. Добавьте мок, а не исключение.
  - Сбои загрузки ресурсов с внешних хостов (картинки из моков: picsum, unsplash) не считаются ошибкой.
  - Сбор разделов проверяет, что каждое подменю раскрылось и дало свои пункты: иначе обход молча свёлся бы к верхнему уровню.
  - Подменю открывается наведением, как у пользователя; по ссылке — обычный `click()` с проверками Playwright. Перед каждым действием тест ждёт, пока страница догрузится (`waitForPageIdle`: нет своих запросов 1 с). Повторяется (`toPass`, до 15 с) только раскрытие подменю: переход идёт в `startTransition`, и пока новая страница грузится, на экране ещё старая шапка, которая затем заменяется.
- Тест на упавший ленивый чанк блокирует модуль страницы счетов через `context.route` (`page.route` не видит запросы через Service Worker MSW). Ожидается фолбэк ErrorBoundary из layout с кнопкой «Обновить», а не страница ошибки React Router.
- Учётки — из [auth.mock.ts](../src/entities/auth/mock/auth.mock.ts), см. также [msw-mocks.md](msw-mocks.md).

Первый запуск локально: `npx playwright install --only-shell chromium`. При падении отчёт и trace лежат в `playwright-report/` и `test-results/`; в CI они загружаются как артефакт.
