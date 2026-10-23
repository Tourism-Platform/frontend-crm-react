# MSW-моки

Полностью изолированный режим фронта: все запросы к API обслуживает MSW, бэкенд не нужен.

## Запуск

```env
VITE_ENABLE_MSW=true
# Можно оставить боевой адрес — незамоканное всё равно не уйдёт в сеть (catch-all 501).
# Для полной уверенности укажите фейковый хост:
VITE_API_URL=http://api.mock
```

MSW стартует только на dev-сервере (`import.meta.env.DEV`). В production-сборку моки не попадают.

| Пользователь | Пароль | Роль |
| --- | --- | --- |
| `damirk355@gmail.com` | `String1!` | operator_admin |
| `damirk366@gmail.com` | `String1!` | agency_admin |

Сессия хранится в `localStorage` (`msw-auth-session`) и переживает перезагрузку. Данные сторов живут в памяти и сбрасываются при перезагрузке страницы.

## Устройство

```
src/app/mws/
  handlers.ts            реестр; порядок важен (см. ниже), последним — catch-all
  unmocked.handlers.ts   501 «Not mocked» для всего незамоканного под VITE_API_URL / VITE_DOCUMENT_API_URL
  browser.ts / server.ts setupWorker / setupServer
  reset-mock-stores.ts   сброс всех сторов к сидам
  setup-msw-server.ts    setupMswServer() — подключить MSW в тестовом файле
  coverage/              тест покрытия и маршрутизации
src/shared/api/msw/utils.ts   createMockHandler, toListResponse, mock*-ответы, createMockId, …
src/entities/<entity>/
  handlers/<entity>.handlers.ts   createMockHandler(X_PATHS.y(":param"), resolver)
  mock/<entity>.mock.ts           детерминированные сиды
  mock/<entity>.store.ts          in-memory стор + CRUD + reset<Entity>Store
```

Связанные данные — один граф: тур → опции → события (product-supply из стора поставщиков) → снапшот брони (ревизии, availability, маршрут оператора). Каталог и публичные страницы строятся из тех же туров.

## Новый эндпоинт

1. Хендлер через `createMockHandler(X_PATHS.y(":id"), ...)` — только сгенерированные `*_PATHS`, без ручных URL.
2. Состояние — в `mock/*.store.ts`, без `let` в хендлере. Добавьте `reset*Store` в `reset-mock-stores.ts`.
3. Зарегистрируйте массив в `src/app/mws/handlers.ts`.
4. `npm run mocks:coverage`.

**Порядок хендлеров.** MSW берёт первый совпавший. `/supplier/:supplierId` перехватит `/supplier/product`, `/tour/:tourId/public` — `/tour/catalog/public`. Конкретные пути регистрируйте раньше параметризованных. Тест покрытия ловит такие перехваты.

## Проверки

`npm run mocks:coverage` (`vitest run src/app/mws`):

- каждый `X_PATHS.y`, используемый в UI, попадает в свой хендлер, а не в чужой или в catch-all;
- ни один замоканный путь не перекрыт хендлером, зарегистрированным раньше;
- сценарии (логин, туры, расписание, маршрут, поставщики, бронь, сотрудники, курсы) проходят через настоящие запросы.
