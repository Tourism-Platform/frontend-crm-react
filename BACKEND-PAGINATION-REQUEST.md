# Анализ: пагинация в списочных ручках API

Источник: OpenAPI-спецификация, по которой сгенерированы `src/shared/api/generated` (генерация от 2026-10-11), и то, как фронт вызывает эти ручки.

## 1. Как устроены списки сейчас

В API встречаются два формата ответа у списочных ручек с `skip`/`limit`.

**Формат A — объект с общим числом записей:**
```json
{ "data": [ ... ], "total_count": 42 }
```
Так отвечают, например, `ClientPaymentListResponse` (GET `/booking/payment`), `AgencyListResponse`, `EventLibraryListResponse` (GET `/tour/event/library`). Фронт строит на них таблицы со страницами и бесконечный скролл.

**Формат B — голый массив `X[]`.** Ручка принимает `skip` и `limit` (по спецификации `limit` по умолчанию `10`, максимум `100`), но общее число записей не возвращает.

## 2. Ручки в формате B, которые вызывает фронт

| # | Ручка | Ответ | `limit` по умолчанию |
|---|---|---|---|
| 1 | GET `/operator/fx-rate` | `OperatorFxRateModel[]` | 10 |
| 2 | GET `/operator/payment-routes` | `OperatorPaymentRouteModel[]` | 10 |
| 3 | GET `/operator/me/files` | `OperatorFilesModel[]` | 10 |
| 4 | GET `/agency/me/documents` | `AgencyFilesModel[]` | 10 |
| 5 | GET `/tour/{tour_id}/option/all` | `TourOptionModel[]` | 10 |
| 6 | GET `/tour/{tour_id}/public/option/all` | `TourOptionPreviewSchema[]` | 10 |
| 7 | GET `/tour/{tour_id}/seasonality/` | `SeasonalityCommissionModel[]` | 10 |
| 8 | GET `/tour/{tour_id}/{option_id}/event/itinerary` | `TourEventResponse[]` | не указан |
| 9 | GET `/tour/{tour_id}/landing/images` | `LandingPageImageModel[]` | 10 |
| 10 | GET `/tour/{tour_id}/event/{event_id}/images/all` | `EventImageModel[]` | 10 |
| 11 | GET `/tour/event/library/{library_id}/images/all` | `TourEventLibraryImageModel[]` | 10 |
| 12 | GET `/supplier/{supplier_id}/product/{product_id}/images/all` | `SupplierProductImageModel[]` | 10 |

Ручки в формате B, которые фронт пока не вызывает: GET `/admin/user/all`, GET `/tour/one-day`, GET `/supplier/search`.

Отдельный случай — GET `/booking/order/{booking_id}/pax`: ответ `PaxListResponse { data, count }`. Общее число есть, но поле называется `count`, а не `total_count`.

Ручки, где `limit` ограничивает число подсказок, а не задаёт страницу, в анализ не входят: `/geo/search`, `/geo/reverse`, `/tour/catalog/suggest`, `/tour/slug/sitemap`.

## 3. Что из этого следует для фронта

- **Без `limit` в запросе ответ ограничен 10 записями**, и по ответу не видно, что записей больше. До временного решения (§5) фронт вызывал все 12 ручек без `limit`. Например, у брони с 12 пассажирами или у тура с 11 фото часть данных не отображалась.
- **Без `total_count` фронт не может построить пагинацию** ни одним из принятых в проекте способов: таблице со страницами нужно общее число, бесконечному скроллу — признак, что есть следующая порция.
- **Некоторые списки фронту нужны целиком** (пункты 5, 7, 8): опции тура — это вкладки и расчёт цены, сезонные комиссии сравниваются между собой, события строят маршрут по дням.

## 4. Вопросы к бэкенду

1. Формат B у этих ручек — осознанное решение или они просто не были переведены на формат A?
2. Можно ли ожидать, что ручки 1–4 и 9–12 будут возвращать `{ data, total_count }`, как остальные списки?
3. Для ручек 5, 7 и 8, где нужен весь список, какой вариант правильный: передавать `limit=100` и считать, что больше не бывает; запрашивать без лимита; или постранично догружать до конца?
4. Какие на самом деле значения по умолчанию у `limit` для этих ручек? Совпадают ли они со спецификацией (`10`), и почему у `/event/itinerary` значение по умолчанию не указано?
5. Ожидается ли переименование `count` → `total_count` в `PaxListResponse`?
6. Если формат ответа будет меняться: это делается в тех же ручках (тогда это ломающее изменение и выкладку нужно согласовывать) или через новые ручки или версию?

## 5. Временное решение на фронте (до ответа бэкенда)

Дата: 2026-10-18. Бэкенд не менялся. Фронт сам заворачивает голый массив в пагинационный слой.

### Как устроено

Общих хелперов пагинации нет: как в blogix-admin, каждая сущность собирает пагинацию сама в своём `converters/`.

| Что | Где |
|---|---|
| Временный `total` = `100` | `TEMP_LIST_TOTAL` в [src/shared/config/constants/pagination.config.ts](src/shared/config/constants/pagination.config.ts) |
| Лимиты списков | `INTERSECTION_ELEMENTS` в [src/shared/config/constants/intersection.config.ts](src/shared/config/constants/intersection.config.ts) |

В каждой сущности по одному шаблону:
- `types/*-backend.*` — алиасы `T…BackendQuery` / `T…BackendResponse` на `_types` ручки;
- `types/*` — аргументы `I…Args extends IPaginationRequest` (у курсов валют, платёжных маршрутов и документов это сам `IPaginationRequest`);
- `converters/*` — `map…QueryToBackend` (`page`/`limit` → `skip`/`limit`) и `map…PaginatedToFrontend` (массив → `{ data, total: TEMP_LIST_TOTAL }`);
- `api/*.service.ts` — `params: map…QueryToBackend(args)`, `transformResponse: map…PaginatedToFrontend`;
- виджеты и фичи читают `.data`.

Пример, [operator-currency-rate.converters.ts](src/entities/commission/converters/operator-currency-rate.converters.ts):
```ts
export const mapOperatorCurrencyRateFiltersToBackend = (
	filters: IPaginationRequest
): TOperatorCurrencyRateBackendQuery => ({
	...(filters.page > 1 && { skip: (filters.page - 1) * filters.limit }),
	...(filters.limit && { limit: filters.limit })
});

export const mapOperatorCurrencyRateListToFrontend = (
	data: TOperatorCurrencyRateResponse
): IPaginationResponse<IOperatorCurrencyRate> => ({
	data: data.map(mapOperatorCurrencyRateToFrontend),
	total: TEMP_LIST_TOTAL
});
```

| # | Ручка | Конвертеры | UI пагинации |
|---|---|---|---|
| 1 | `/operator/fx-rate` | `entities/commission/converters/operator-currency-rate.converters.ts` | ✅ таблица в `currency.tsx` |
| 2 | `/operator/payment-routes` | `entities/finance/finance-information/converters/operator-payment-routes.converters.ts` | — |
| 3 | `/operator/me/files` | `entities/user/operator/converters/operator-documents.converters.ts` | — |
| 4 | `/agency/me/documents` | `entities/user/agency/converters/agency-documents.converters.ts` | — |
| 5 | `/tour/{tour_id}/option/all` | `entities/tour/itinerary/converters/option.converters.ts` (+ `queryFn` draft-превью в `preview-tour.service.ts`) | — |
| 6 | `/tour/{tour_id}/public/option/all` | `entities/tour/preview-tour/converters/preview-option.converters.ts` | — |
| 7 | `/tour/{tour_id}/seasonality/` | `entities/tour/schedule/converters/seasonality.converters.ts` | — |
| 8 | `/tour/{tour_id}/{option_id}/event/itinerary` | **не тронута**: у ручки нет `limit` по умолчанию, она отдаёт все события | — |
| 9 | `/tour/{tour_id}/landing/images` | `entities/tour/landing/converters/landing-image.converters.ts` (+ `queryFn` превью лендинга) | — |
| 10 | `/tour/{tour_id}/event/{event_id}/images/all` | `entities/tour/itinerary/converters/event-media.converters.ts` | — |
| 11 | `/tour/event/library/{library_id}/images/all` | `entities/tour/event-library/converters/event-library-media.converters.ts` | — |
| 12 | `/supplier/{supplier_id}/product/{product_id}/images/all` | `entities/supplier/converters/supplier-product-image.converters.ts` | — |

Где UI пагинации нет («—»), потребители передают первую страницу явно в аргументах, `page`/`limit` первыми полями: `{ page: 1, limit: INTERSECTION_ELEMENTS.LANDING_IMAGES, tourId }`. Отдельных констант дефолтных фильтров нет. В запрос уходит `limit=10`, ровно как бэкенд делает по умолчанию, поэтому поведение не изменилось: такие списки по-прежнему показывают не больше 10 записей.

### Особенности, о которых нужно помнить

- **Сезоны** (`seasonality.service.ts`) вручную обновляют кэш через `updateQueryData("getSeasonality", { page: 1, limit: INTERSECTION_ELEMENTS.TOUR_SEASONALITY, tourId }, …)`. Ключ кэша должен совпадать с аргументами в `seasonality-info.tsx`. Если там поменяются `page`/`limit`, поменять и здесь.
- **`queryFn` превью** (`preview-tour.service.ts`) запрашивает первую страницу как `params: { limit: INTERSECTION_ELEMENTS.… }` и читает сырой ответ как массив. Draft-опции (`getDraftPreviewOptions`) возвращают `{ data: cards, total: TEMP_LIST_TOTAL }`, чтобы совпадать по форме с публичными опциями.

## 6. Что сделать, когда бэкенд вернёт `{ data, total_count }`

`TEMP_LIST_TOTAL` подставлен ровно в местах костыля — по нему находятся все:

```bash
grep -rn "TEMP_LIST_TOTAL" src
```

1. **`npm run codegen`** — у ручек поменяется `_types.response` с `X[]` на `{ data, total_count }`. Алиасы `T…BackendResponse` подхватят это сами, а `tsc` покажет все конвертеры, которые нужно поправить.
2. **В каждом `map…PaginatedToFrontend`** заменить массив на поля ответа:
   ```ts
   // сейчас
   ): IPaginationResponse<IOperatorCurrencyRate> => ({
   	data: data.map(mapOperatorCurrencyRateToFrontend),
   	total: TEMP_LIST_TOTAL
   });

   // станет
   ): IPaginationResponse<IOperatorCurrencyRate> => ({
   	data: response.data.map(mapOperatorCurrencyRateToFrontend),
   	total: response.total_count
   });
   ```
3. **`queryFn` превью** (`preview-tour.service.ts`): сырые ответы сейчас читаются как массив (`as LandingPageImageModel[]`, `as TTourOptionBackend[]`) — поменять на `.data`; у draft-опций `total` взять из ответа.
4. **Удалить `TEMP_LIST_TOTAL`** и `pagination.config.ts`, когда `grep` перестанет его находить.
5. **UI пагинации** для списков без неё (галереи, документы, платёжные маршруты, вкладки опций, сезоны) — по ответу на вопрос 3 из §4: либо бесконечный скролл по образцу `use-event-library-search-options.ts`, либо загрузка списка целиком.
6. **Если какие-то ручки останутся в формате B**, оставить у них `total: TEMP_LIST_TOTAL` как есть.
