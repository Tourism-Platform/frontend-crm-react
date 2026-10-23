# Аудит бэкенд-типов на фронте

Срез: генерация от `89ecd859`, анализ 2026-10-14. Итерация исправлений 1 — 2026-10-18 (см. [§8](#8-скоуп-итерации-1) и [§9](#9-журнал-исправлений)). Дополняет [API-COVERAGE.md](API-COVERAGE.md).

**Статусы в таблицах:** ✅ исправлено · ⏭ вне скоупа итерации 1 · ❎ не баг (уточнено при исправлении) · — без изменений.

**Правило, которое проверялось:** бэкенд-тип на фронте должен быть алиасом на сгенерированный тип:
```ts
export type TAgencyDocumentBackend = AgencyFilesModel;                                // ✅
export type TAuthAccountBackend = typeof AUTH_PATHS.getMyAccount._types.response;    // ✅ лучше всего
```
Только так `npm run codegen` + `tsc` сами ловят расхождения с бэкендом. Самописный `interface`, неверный алиас, `Partial<…>`, `any` и `as`-касты эту проверку отключают.

**Как искали.** Через TypeScript Compiler API собраны все экспортируемые `type`/`interface` вне `api/generated`, у которых в имени или файле есть `Backend` или есть snake_case-поля (399 шт.). Каждый тип классифицирован по происхождению. Затем для 249 мест вызова (`body`, `params`, `transformResponse`) объявленный тип сравнен с эталоном эндпоинта `X_PATHS.k._types.*`: поля, optional, null, примитивы, enum-значения, вложенность до 4 уровней. Для самописных типов без привязки к эндпоинту эталон подбирался по сходству полей. Все находки потом перепроверены вручную.

## 1. Сводка

| Класс | До (10-14) | После итерации 1 (10-18) | Комментарий |
|---|---|---|---|
| ✅ алиас на `Api.ts` / `typeof X_PATHS…` | 342 | 345 | норма |
| ✅ производные от `_PATHS` (`Extract<…>`, `["events"][number]`) | 20 | 20 | норма |
| ❌ самописные | 37 | 30 | из оставшихся бэкенд описывают 9: 7 MSW-only, document-сервис и `IManager` (§3) |
| ❌ неверный алиас | 6 | 2 | остался create оператора/агентства (⏭) |
| ⚠ `Partial<ReadModel>` вместо body-схемы | 2 | 0 | |
| ⚠ `any` | 2 | 1 | остался `preview-booking.converters.ts:9` (⏭) |
| ⚠ `as`-касты при сборке body (`{…} as TXxxBackend`) | 27 | 27 | ⏭ |

## 2. P0/P1 — реальные несостыковки

| # | Где | Что не так | Как исправить | Статус |
|---|---|---|---|---|
| 1 | [operator-finance-info.service.ts](src/entities/finance/finance-information/api/operator-finance-info.service.ts) + [converters](src/entities/finance/finance-information/converters/operator-finance-info.converters.ts) | Эндпоинт `getOperatorFinancials` возвращает `OperatorFinancialSettingsRead \| null`, а тип параметра — без `null`. У нового оператора без настроек `backend.default_markup` → **TypeError, страница падает**. | `typeof OPERATOR_PATHS.getOperatorFinancials._types.response` + обработать `null` | ✅ S1 |
| 2 | [operator-business.converters.ts:38](src/entities/user/operator/converters/operator-business.converters.ts#L38) / [agency-business.converters.ts:38](src/entities/user/agency/converters/agency-business.converters.ts#L38) | Один конвертер на create и update. Тип возврата — `…UpdateBackend`, а `createOperator`/`createAgency` ждут `{ name }` (required) → 422. Ответ create типизирован как `…InfoModel`, а приходит `OperatorModel`/`AgencyModel`. Хуки create пока не используются. | Отдельные типы `= typeof X_PATHS.createOperator._types.body/response` и отдельный конвертер | ⏭ нужно решение: удалить или доделать |
| 3 | [tour-all.converters.ts](src/entities/tour/tour/converters/tour-all.converters.ts) `mapTourFinanceToBackend` | Возвращал `Partial<TTourFinanceBackend>` (модель **ответа**) вместо `CreateFinancialSchema`. В типе `currency_type` становился optional, просачивались `id`/`tour_meta_id`. *Уточнение:* в рантайме `currency_type` всегда уходит, потому что поле обязательно в `SETTINGS_FINANCE_FORM_SCHEMA`. `markup` не отправляется — это отсутствующая фича, а не ошибка типа. | Тип возврата `TTourFinanceCreateBackend` | ✅ S3 (тип) · ⏭ `markup` |
| 4 | [account-backend.interface.ts](src/entities/user/account/types/account-backend.interface.ts) | `getMyAccount` возвращает `MyAccountRead` (нет `id`/`user_id`, есть `email`), а типизировался как `AuthUserProfileModel`. *Уточнение:* для `updateMyProfile`/`uploadAvatar` `AuthUserProfileModel` верен, поэтому алиас не меняли, а добавили отдельный тип. | `TMyAccountBackend = typeof PROFILE_INFO_PATHS.getMyAccount._types.response` | ✅ S2 |
| 5 | [operator-payment-routes.service.ts](src/entities/finance/finance-information/api/operator-payment-routes.service.ts) | `transformResponse: (response: any)`. У `create`/`update` заявлен результат `TOperatorPaymentRoute`, но конвертера не было. *Уточнение:* `wise` ↔ `custom` — **не баг**: конвертер сознательно маппит бэкендовый `custom { items: [{key,val}] }` во фронтовый `TWiseDetails`. | Типизировать ответ, добавить `transformResponse` в create/update | ✅ S4 · ❎ `wise/custom` |
| 6 | [operator-finance-info.converters.ts](src/entities/finance/finance-information/converters/operator-finance-info.converters.ts) | Update-body типизирован как `Partial<Read>`, хотя готовый `TOperatorFinanceInfoBackendUpdate` уже объявлен. | Использовать `TOperatorFinanceInfoBackendUpdate` | ✅ S2 |
| 7 | [operator-currency-rate.service.ts](src/entities/commission/api/operator-currency-rate.service.ts) + [converters](src/entities/commission/converters/operator-currency-rate.converters.ts) | `updateOperatorCurrencyRate` объявляет результат `IOperatorCurrencyRate`, но конвертера нет (`rate` строкой). В list-конвертере захардкожено `total: 100`. | Добавить `transformResponse`, `total: data.length` | ✅ S5 |

## 3. Самописные типы, описывающие данные бэкенда (15)

| Фронт-тип | Ближайший эталон в `Api.ts` | Состояние | Рекомендация | Статус |
|---|---|---|---|---|
| [ICommissionBackend](src/entities/commission/types/commission-backend.interface.ts#L1) | — (URL `/commissions` нет в API) | MSW-only | Перевести на `SEASONAL_COMMISSION_PATHS` или удалить | ⏭ |
| [ITourOrderBackend](src/entities/tour/order/types/tour-order-backend.interface.ts#L5), `TTourOrderPaginatedResponseBackend` | — (`/tours/orders`) | MSW-only, мёртвый код | Удалить вместе с сервисом/моками/хендлером | ⏭ |
| [IActivityLogBackend](src/entities/tour/activity-log/types/activity-log-backend.interface.ts#L3) | `AUDIT_PATHS.listOrgAudit` (кандидат) | MSW-only, используется в UI | Перевести на audit-эндпоинт | ⏭ |
| [IRecentSearchBackend](src/entities/tour/catalog/types/recent-search-backend.interface.ts#L1), [TPopularToursBackendResponse](src/entities/tour/catalog/types/catalog-tour-backend.interface.ts#L26) | — | MSW-only | Ждать бэкенд / убрать из UI | ⏭ |
| [IPreviewBookingSubmitBackendResponse](src/entities/tour/preview-booking/types/preview-booking.types.ts#L28) | — | MSW-only, мёртвый код | Удалить вместе с сервисом/моками | ⏭ |
| [IGenerateInvoiceDocumentBackend](src/entities/finance/invoice/types/invoice-document-backend.interface.ts#L1) | — (отдельный document-сервис, вне OpenAPI) | OK | Оставить | — |
| `ILandingBackend` | `LandingPageResponse` | был устаревшим (camelCase), использовался только в моке | Удалить, мок типизировать `TGetLandingBackendResponse` | ✅ S6 |
| `IReconciliationDetailBackend` + `…SupplierPaymentBackend` | `BookingFinancialsResponse` (35%) | конвертер нигде не вызывался | Удалить | ✅ S6 |
| `ICatalogTourInfoBackend` | нет | `mapCatalogTourStatsToFrontend` нигде не вызывался | Удалить | ✅ S6 |
| `IFilterOptionBackend`, `IPriceHistogramItemBackend` | нет | конвертеры нигде не вызывались | Удалить | ✅ S6 |
| `IApplyReviewItemBackend` | нет | `mapApplyReviewItemToBackend` нигде не вызывался | Удалить | ✅ S6 |
| [IManager](src/entities/tour/tour/types/manager.types.ts#L1) | `StaffRead` (50%) | используется в `manager-card.tsx` | Если данные со staff-эндпоинта: `Pick<StaffRead, …>` | ⏭ |

**Ложные срабатывания** (фронтовые модели/формы со snake_case, *не* бэкенд): `IAuthAccount`, `IOperatorCurrencyRate`, `IPreviewTourData`, `IPreviewOperator`, `IOptionDay`, `IOptionEvent`, `ITravellerPaxInput`, `IPackageFormPayload`, `IOverrideUnitFormRow`, `IBookingPax`, `TBookingPaxFile`, `IUploadPassengerPassportRequest`, `TGeoFormValue`, а также i18n/роуты/UI-props. Их не трогаем.

## 4. Неверные алиасы (тип из `Api.ts`, но не тот)

| Фронт-тип | Было | Эндпоинт ждёт | Статус |
|---|---|---|---|
| ответ `getMyAccount` | `TAccountBackend = AuthUserProfileModel` | `MyAccountRead` | ✅ S2 — новый `TMyAccountBackend` |
| `TOperatorBusinessInfoUpdateBackend` в create | `OperatorInfoUpdate…` | `OperatorCreateSchema` | ⏭ |
| `TOperatorBusinessInfoBackend` в create-ответе | `OperatorInfoModel` | `OperatorModel` | ⏭ |
| `TAgencyBusinessInfo(Update)Backend` в create | то же для агентства | `CreateAgencySchema` / `AgencyModel` | ⏭ |
| `TAuthUserBackend` | `AuthUserIn` | `SignInIn` | ✅ S2 — `typeof AUTH_PATHS.authUser._types.body` |
| ответ `getOperatorFinancials` | `OperatorFinancialSettingsRead` | `… \| null` | ✅ S1 — `TOperatorFinanceInfoBackendResponse` |

## 5. Касты, отключающие проверку

- **`any`:** ~~operator-payment-routes.service.ts:19~~ ✅ S4. Остался [preview-booking.converters.ts:9](src/entities/tour/preview-booking/converters/preview-booking.converters.ts#L9) (⏭, MSW-only флоу).
- **`{…} as TXxxBackend` при сборке body: 27 мест.** Разобраны в итерации 2, см. [§10](#10-итерация-2--as-касты). Итог: 9 ✅ убраны, 16 оставлены (ограничение TS на коррелированные union), 2 ⏭ (create оператора/агентства).
- **`result.data as T` в `queryFn`:** 8 мест (auth, event, preview-tour). Проверены вручную, тип в касте совпадает с `_types.response`. —

## 6. Рекомендуемые правила

1. Бэкенд-типы объявлять только алиасом: `= typeof X_PATHS.key._types.body|query|response` (предпочтительно) или `= ModelFromApi`.
2. Тип возврата конвертеров `…ToBackend` — `_types.body` конкретного эндпоинта, а не модель ответа и не `Partial<…>`.
3. Вместо `{…} as TBackend` использовать `satisfies TBackend` или явную аннотацию возврата.
4. Не использовать `any` в `transformResponse`.
5. Самописный `interface …Backend` допустим только для URL вне OpenAPI (document-сервис, MSW-заглушки), с комментарием, почему.
6. Если эндпоинт может вернуть `null`, `transformResponse` принимает `typeof …_types.response` и сам обрабатывает `null`.

## 7. Порядок исправлений

1. ~~Падение на `null` в финансах оператора~~ ✅
2. ~~Неверные алиасы и `Partial`-body: account, tour finance, operator finance update~~ ✅ · operator/agency create ⏭
3. ~~`any` в платёжных маршрутах и fx-rate update~~ ✅
4. ~~Удалить мёртвые типы и конвертеры (reconciliation detail, catalog stats/filters/histogram, apply-review, `ILandingBackend`)~~ ✅ · tour-order, preview-booking submit ⏭
5. Постепенно заменить `as TBackend` на `satisfies` в конвертерах событий ⏭

## 8. Скоуп итерации 1

### В скоупе
| # | Что |
|---|---|
| S1 | Падение на `null` в финансах оператора |
| S2 | Неверные алиасы: ответ account, update финансов оператора, body авторизации |
| S3 | Тип body финансов тура |
| S4 | `any` в платёжных маршрутах + результат create/update |
| S5 | Курсы валют: конвертер ответа update и `total: 100` |
| S6 | Удаление мёртвых бэкенд-типов и конвертеров, мок лендинга на сгенерированный тип |
| S7 | Этот журнал |

### Вне скоупа
| Что | Почему |
|---|---|
| Create оператора/агентства (`{ name }`, отдельный конвертер) | Хуки не используются, нужно решение: удалить или доделать |
| Наценка `markup` тура/опции, `overview` лендинга, `languages` опции | Новые фичи UI, а не правка типов |
| MSW-only сервисы: `/commissions`, `activity-log`, `popular`, `recently-searched` | Нужно продуктовое решение или бэкенд |
| Удаление сервисов `tour-order` и `preview-booking submit` целиком (с моками и хендлерами) | Затрагивает MSW-инфраструктуру, отдельная задача |
| 27 `as TBackend` → `satisfies` | Большой рефакторинг, каждое место может вскрыть новые ошибки |
| `IManager` → `Pick<StaffRead, …>` | Нужно понять источник данных карточки менеджера |
| Неиспользуемые эндпоинты из `API-COVERAGE.md` | Отдельные фичи |
| Очистка `paths/` в генераторе, удаление `operator-files.paths.ts`, ESLint-правила, скрипты аудита в `scripts/` | Инфраструктура, отдельная задача |
| `any` в `preview-booking.converters.ts:9` | MSW-only флоу |
| Необязательные query-параметры (`currency`, `as_of`, `pax`, `date`) у общих хелперов `mapReadLangQueryToBackend` / `mapOrderLangQueryToBackend` | Совместимы по типу, передача доп. параметров — фича |

## 9. Журнал исправлений

| Дата | Пункт | Что сделано | Файлы | Статус |
|---|---|---|---|---|
| 2026-10-18 | §2 п.1 · S1 | `getOperatorFinanceInfo` возвращает `TOperatorFinanceInfo \| null`. `transformResponse` принимает `TOperatorFinanceInfoBackendResponse` и при `null` отдаёт `null`. UI уже работает через `useOptionalResourceQuery` (при `!data` → режим create), правки UI не понадобились. | `finance-information/api/operator-finance-info.service.ts`, `finance-information/types/operator-finance-info-backend.interface.ts` | ✅ |
| 2026-10-18 | §2 п.6 · S2 | `mapOperatorFinanceInfoToBackend` возвращает `TOperatorFinanceInfoBackendUpdate` | `finance-information/converters/operator-finance-info.converters.ts` | ✅ |
| 2026-10-18 | §2 п.4 · S2 | Добавлен `TMyAccountBackend` для `getMyAccount`. `mapAccountToFrontend` принимает `TMyAccountBackend \| TAccountBackend`. `TAccountBackend` оставлен для update/avatar. | `user/account/types/account-backend.interface.ts`, `user/account/api/account.service.ts`, `user/account/converters/account.converters.ts` | ✅ |
| 2026-10-18 | §4 · S2 | `TAuthUserBackend = typeof AUTH_PATHS.authUser._types.body` | `auth/types/auth-backend.interface.ts` | ✅ |
| 2026-10-18 | §2 п.3 · S3 | Добавлен `TTourFinanceCreateBackend`. `mapTourFinanceToBackend` возвращает его, `currency_type` с `!` (гарантирует zod). Совместим и с update-body. | `tour/tour/types/tour-backend.interface.ts`, `tour/tour/converters/tour-all.converters.ts` | ✅ |
| 2026-10-18 | §2 п.5 · S4 | `any` → `TOperatorPaymentRouteBackend[]`. В create/update добавлен `transformResponse: mapOperatorPaymentRouteToFrontend`. | `finance-information/api/operator-payment-routes.service.ts` | ✅ |
| 2026-10-18 | §2 п.5 | `wise` ↔ `custom` — сознательный маппинг в конвертере | — | ❎ |
| 2026-10-18 | §2 п.7 · S5 | `updateOperatorCurrencyRate` получил `transformResponse`. `total: 100` → `total: data.length`. | `commission/api/operator-currency-rate.service.ts`, `commission/converters/operator-currency-rate.converters.ts` | ✅ |
| 2026-10-18 | §3 · S6 | Удалены `IReconciliationDetailBackend`, `IReconciliationSupplierPaymentBackend` (файл) и `mapReconciliationDetailToFrontend` | `finance/reconciliation/types/reconciliation-details-backend.interface.ts` (удалён), `types/index.ts`, `converters/reconciliation.converters.ts` | ✅ |
| 2026-10-18 | §3 · S6 | Удалены `IFilterOptionBackend`, `IPriceHistogramItemBackend` (файлы) и `catalog-tour-filters.converters.ts`. Фронтовые `IFilterOption`/`IPriceHistogramItem` оставлены. | `tour/catalog/types/*`, `tour/catalog/converters/*` | ✅ |
| 2026-10-18 | §3 · S6 | Удалены `ICatalogTourInfoBackend` и `mapCatalogTourStatsToFrontend` | `tour/catalog/types/catalog-tour-info.interface.ts`, `tour/catalog/converters/catalog-tour.converters.ts` | ✅ |
| 2026-10-18 | §3 · S6 | Удалены `IApplyReviewItemBackend`, `apply-review-item.converters.ts`, `apply-review-item.types.ts` (использовались только друг другом) | `booking/order/types/*`, `booking/order/converters/*` | ✅ |
| 2026-10-18 | §3 · S6 | Удалён `ILandingBackend`. `TOUR_LANDING_MOCK` типизирован `TGetLandingBackendResponse`, поля переименованы в snake_case. Убран `photos` (картинки идут отдельным эндпоинтом), добавлены `id`/`title`/`overview*`/`languages`/даты. | `tour/landing/types/landing-backend.interface.ts`, `tour/landing/mock/landing.mock.ts` | ✅ |

**Проверка итерации 1:**
- `npx tsc --noEmit -p tsconfig.app.json` — 0 ошибок.
- `eslint` по затронутым entity — 0 ошибок.
- `vitest` (auth, user, finance, commission, tour/tour, tour/catalog, tour/landing, booking) — 6 файлов, 21 тест, всё зелёное.
- Повторный прогон скрипта аудита: пункты S1–S6 больше не флагаются.
- Ручная проверка в браузере (финансы оператора с `null`, платёжные маршруты, курсы валют, аккаунт) — **не выполнялась**.

## 10. Итерация 2 — `as`-касты

Дата: 2026-10-18. Каждый каст заменяли на `satisfies` или аннотацию и смотрели на ошибки `tsc`. Если ошибка оказывалась реальной дырой в типах, чинили тип, а не данные.

### Почему не всегда `satisfies`
`as T` отключает проверку: TS не ловит ни нехватку обязательных полей, ни лишние поля. `: T` (аннотация) и `satisfies T` проверяют одинаково полно. Разница только в типе результата: аннотация приводит его к `T`, а `satisfies` оставляет узкий выведенный тип. Аннотацию ставим в сигнатуру функции, `satisfies` — внутри вложенных выражений, где аннотацию поставить некуда.

### Убрано (9) ✅
| Место | Было | Стало | Что вскрылось |
|---|---|---|---|
| [activity.converters.ts](src/entities/tour/itinerary/converters/event/activity/activity.converters.ts) (offerings еды) | `as unknown as TActivityFoodOfferingInputBackend[]` | `satisfies …[]` | `getCurrentOfferings` возвращал offerings как `Record<string, unknown>` без `charge`. Сделан generic `<TOffering>`: для еды вызывается с `TActivityFoodOfferingInputBackend` |
| [guide-pricing.converters.ts](src/entities/tour/itinerary/converters/event/guide/guide-pricing.converters.ts) ×2 | `.filter(Boolean) as T[]` | `.filter((category) => category !== null)` | — (TS 5.5+ сам выводит предикат) |
| [transportation-pricing.converters.ts](src/entities/tour/itinerary/converters/event/transfer/transportation-pricing.converters.ts) (цены per-car) | `mapToFixedCharge(…) as TFixedChargeInputBackend` | `if (!charge) return null` + `.filter(…)` | `mapToFixedCharge` возвращает `undefined` и без валюты, а фильтр выше проверял только `cost`. Раньше в body уходила строка без обязательного `charge`, теперь такая строка не отправляется. **Изменение поведения** |
| [event.service.ts](src/entities/tour/itinerary/api/event.service.ts) | `as TTourEventUpdateBackend` | `satisfies` | — |
| [split-event-update.converters.ts](src/entities/tour/itinerary/converters/event/common/split-event-update.converters.ts) (option update) | `as TTourEventOptionUpdateBackend` | `satisfies` | — |
| [accommodation-pricing.converters.ts](src/entities/tour/itinerary/converters/event/accommodation/accommodation-pricing.converters.ts) ×2 | `as THousingSpecInputBackend` | `satisfies` + type guard `hasBaseRate` | `every(room => room.rate.base)` не сужал тип, и `rate.base` оставался `FixedChargeInput \| undefined`. Поведение то же: спека пишется, только если у всех комнат есть ставка |
| [package.converters.ts](src/entities/tour/itinerary/converters/package.converters.ts) | `mapPackageFormToPayload(form) as TPackageCreateBackend` | без каста | Общий конвертер был объявлен с более широким `PackageUpdate` (`name` optional). Тип возврата сужен до `PackageCreate`, он подходит и для update |

### Оставлено (16) — коррелированные union
`typ` и `details`/`pool`/`supply` — это два независимых union. TS не может доказать, что конкретному `typ` достаётся парный `pool`. Здесь `as` — осознанное утверждение о корреляции. Убрать его можно только переписав код на `switch` по каждому типу события, это отдельная задача.
- `event-library.converters.ts`: 291, 313, 325, 338
- `details-read-to-write.converters.ts`: 511, 520, 561
- `empty-event-details.converters.ts`: 17, 86, 109, 140, 161
- `split-event-update.converters.ts`: 98 (member update, `spec: unknown`)
- `event.converters.ts`: 302, 362
- `activity.converters.ts`: pool у `details` (`as TActivityDetailsInputBackend["pool"]`)

### Вне скоупа (2) ⏭
- `operator-business.converters.ts:59`, `agency-business.converters.ts:59` — конвертер create оператора/агентства, хуки не используются.

### Найдено попутно (не исправлено)
| Что | Где | Почему не исправлено |
|---|---|---|
| **Баг codegen:** у general-площадок activity сгенерировано `{ sub_typ: "entertainment" } & GeneralVenueInput`, где `sub_typ` — TS-`enum`. Литерал ∩ enum = `never`, поэтому все general-варианты необитаемы. Отсюда `as never` (не входили в 27). | `activity.converters.ts` (`sub_typ: subTyp as never`, `offerings: […] as never`), `empty-event-details.converters.ts:40` | Чинится в генераторе: генерировать enum'ы как union-литералы (опция `generateUnionEnums` у swagger-typescript-api) или отключить пересечение. Это затронет весь `Api.ts` |
| `mapProductPoolMemberNew` позволяет `source: "product"` для любого `typ`, а `SupplementaryMemberNew` принимает только inline-supply с `spec` | `empty-event-details.converters.ts:144` | Нужно проверить, может ли UI вызвать attach-product для supplementary |

**Проверка итерации 2:** `tsc` — 0 ошибок · `eslint` (itinerary, event-library) — 0 · `vitest` (itinerary, event-library) — 31 файл, 240 тестов, всё зелёное.
