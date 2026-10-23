# Покрытие бэкенд-API фронтендом

Срез: генерация от `89ecd859` (2026-10-11), анализ 2026-10-14. `npx tsc --noEmit` — без ошибок.

Метод:
1. Все ключи `XXX_PATHS.*` из `src/shared/api/generated/paths/*.paths.ts` сопоставлены с их использованием в `src/` (кроме `generated/`). **used** — вызывается из `*/api/*.service.ts|*.api.ts`; **types-only** — упоминается только в типах/моках; **unused** — нигде.
2. Через TypeScript Compiler API для каждого вызова сравнены типы `body` / `params` / `transformResponse` с `_types.body|query|response` эндпоинта.
3. Проверка на уровне значений: какие ключи body конвертер реально заполняет и какие поля ответа реально читает.

## 1. Сводка

| | Кол-во |
|---|---|
| Эндпоинтов в OpenAPI | 286 |
| Используются | 219 |
| Только в типах/моках | 3 |
| Не используются | 64, из них 11 — дубли того же URL под другим тегом → **53 уникальных** |

Дубли (уже покрыты через другой тег, можно игнорировать): `OPERATOR_FILES_PATHS.*` (4) = `OPERATOR_DOCUMENTS_PATHS.*`; `SUPPLIER_PRODUCT_IMAGES_PATHS.*` (7) = `SUPPLIER_PRODUCT_PATHS.*`.

## 2. Эндпоинты бэкенда, которые фронт не использует

### Тур (конструктор)
| Эндпоинт | Метод / URL |
|---|---|
| `TOUR_PATHS.deleteTour` | DELETE `/tour/{tourId}` |
| `TOUR_PATHS.validateTour` | GET `/tour/{tourId}/validate` |
| `TOUR_PATHS.uploadTourCover` / `deleteTourCover` | POST/DELETE `/tour/{tourId}/cover` |
| `TOUR_PATHS.listOneDayTours` | GET `/tour/one-day` |
| `TOUR_SLUG_PATHS.resolveTourSlug` / `listSitemap` | GET `/tour/slug/{slug}`, `/tour/slug/sitemap` |
| `TOUR_OPTION_PATHS.getPriceMatrix` | GET `/tour/{tourId}/option/{optionId}/price-matrix` |
| `TOUR_PACKAGES_PATHS.deletePackage` | DELETE `/tour/{tourId}/{optionId}/package/{packageId}` |
| `TOUR_EVENTS_PATHS.validateEvent` | GET `…/event/{eventId}/validate` |
| `TOUR_EVENTS_PATHS.setEventOptional` | PATCH `…/event/{eventId}/optional` |
| `TOUR_EVENTS_PATHS.retypeOption` | POST `…/event/{eventId}/option/{eventOptionId}/retype` |
| `TOUR_EVENT_MEDIA_PATHS.uploadEventNodeImages` / `deleteEventNodeImage` / `setPrimaryEventNodeImage` | `…/event/{eventId}/node/{nodeId}/images…` |
| `TOUR_SCHEDULE_PATHS.bulkAddFixedDates` / `bulkRemoveFixedDates` | POST/DELETE `/tour/{tourId}/schedule/date/bulk` |
| `TOUR_SCHEDULE_PATHS.bulkAddExcludedDates` / `bulkRemoveExcludedDates` | POST/DELETE `/tour/{tourId}/schedule/exclude/bulk` |
| `TOUR_CATALOG_PATHS.listAgencyCatalog` | GET `/tour/catalog/agency` |

### Бронирования
| Эндпоинт | Метод / URL |
|---|---|
| `BOOKING_ORDER_PATHS.deleteBookingOrder` | DELETE `/booking/order/{bookingId}` |
| `BOOKING_REVISION_PATHS.addEvent` / `updateEvent` / `removeEvent` | `/booking/revision/{bookingId}/event[/{eventId}]` |
| `BOOKING_REVISION_PATHS.listEdits` | GET `/booking/revision/{bookingId}/edits` |
| `BOOKING_VOUCHER_PATHS.getVoucher` / `uploadVoucher` / `deleteVoucher` | `/booking/voucher/{bookingId}` |

### Финансы
| Эндпоинт | Метод / URL |
|---|---|
| `INVOICE_PATHS.generateInvoice` | POST `/invoice` |
| `INVOICE_PATHS.uploadInvoicePdf` | POST `/invoice/{invoiceId}/pdf` |
| `INVOICE_PATHS.recordInvoicePayment` | POST `/invoice/{invoiceId}/payment` |
| `LEDGER_PATHS.listLedgerEntries` / `listDebtors` / `listCreditors` | GET `/ledger/operator[/debtors|/creditors]` |
| `OPERATOR_FX_RATE_PATHS.getFxRate` | GET `/operator/fx-rate/{fxRateId}` |
| `OPERATOR_PAYMENT_ROUTES_PATHS.getPaymentRoute` | GET `/operator/payment-routes/{routeId}` |

### Поставщики
| Эндпоинт | Метод / URL |
|---|---|
| `SUPPLIER_PATHS.search` | GET `/supplier/search` |
| `SUPPLIER_PATHS.getLogo` | GET `/supplier/{supplierId}/logo` |
| `SUPPLIER_PRODUCT_PATHS.listSupplierProducts` | GET `/supplier/{supplierId}/product` |
| `SUPPLIER_PRODUCT_PATHS.listProductLinks` | GET `/supplier/{supplierId}/product/{productId}/links` |

### Права, аудит, админка, авторизация
| Эндпоинт | Метод / URL |
|---|---|
| `PERMISSION_GROUPS_PATHS.createPermissionGroup` / `updatePermissionGroup` / `deletePermissionGroup` | `/auth/permission/group[/{groupId}]` |
| `PERMISSIONS_PATHS.getPermissionCatalog` *(types-only)* | GET `/auth/permission/catalog` |
| `AUDIT_PATHS.listOrgAudit` / `listAllAudit` | GET `/audit/all`, `/audit/admin/all` |
| `ADMIN_PATHS.*` (6: CRUD пользователей + `rebuildLocationProjection`) | `/admin/…` |
| `ACCOUNT_PATHS.getAccountType` | GET `/account/type` |
| `AUTH_PATHS.registerUser` *(types-only, только в моке)* | POST `/auth/register` |
| `AUTH_PATHS.googleLogin` *(types-only, используется `.url` для редиректа — это норма)* | GET `/auth/google/login` |
| `AUTH_PATHS.googleCallback` | GET `/auth/google/callback` (вызывается браузером, фронту не нужен) |

## 3. Фронт обращается к URL, которых нет в бэкенд-API

Эти сервисы используют захардкоженные URL. Таких путей нет в OpenAPI, так что работают они только на MSW-моках.

| Сервис | URL | Используется в UI |
|---|---|---|
| [commission.service.ts](src/entities/commission/api/commission.service.ts) | `/commissions`, `/commissions/{id}` | только `useGetCommissionsQuery` (1 место) |
| [activity-log.service.ts](src/entities/tour/activity-log/api/activity-log.service.ts) | `/tours/{tourId}/activity-log` | да (2 места). Ближайший бэкенд-аналог — `AUDIT_PATHS.listOrgAudit` |
| [catalog-tour.service.ts:68](src/entities/tour/catalog/api/catalog-tour.service.ts#L68) | `/tours/recently-searched`, `/tours/popular` | да |
| [tour-order.service.ts](src/entities/tour/order/api/tour-order.service.ts) | `/tours/orders` | нет (мёртвый код) |
| [preview-booking.service.ts](src/entities/tour/preview-booking/api/preview-booking.service.ts) | `/api/v1/tours/{tourId}/booking/submit` | нет (мёртвый код) |

`invoice-document.service.ts` (`/api/documents/invoice`) ходит в отдельный сервис `VITE_DOCUMENT_API_URL` — это нормально.

## 4. Неполные или рассинхронизированные схемы фронта

### P0/P1 — запрос отправляет не то, что ждёт бэкенд
| Где | Проблема |
|---|---|
| [operator-business.service.ts:20](src/entities/user/operator/api/operator-business.service.ts#L20) `createOperator` | Бэкенд ждёт `OperatorCreateSchema { name }`. Фронт шлёт поля `OperatorInfoModel` (business_name, legal_name, …) без `name` → 422. Ответ типизирован как `OperatorInfoModel`, хотя бэкенд возвращает `OperatorModel`. Хук `useCreateOperatorBusinessInfoMutation` нигде не используется. |
| [agency-business.service.ts:20](src/entities/user/agency/api/agency-business.service.ts#L20) `createAgency` | То же самое: `CreateAgencySchema { name }` против полей info-модели. Хук не используется. |
| [tour-all.converters.ts:17](src/entities/tour/tour/converters/tour-all.converters.ts#L17) `mapTourFinanceToBackend` | Возвращает `Partial<TTourFinanceBackend>` (модель ответа) вместо `CreateFinancialSchema`/`UpdateFinancialSchema`. **`markup` не отправляется и не читается** — наценки тура на фронте нет. `currency_type` (required) может уйти как `undefined`. |
| [option.converters.ts:24](src/entities/tour/itinerary/converters/option.converters.ts#L24) `mapOptionUpdateToBackend` | `TourOptionUpdateSchema` поддерживает `markup` и `languages`. Фронт шлёт только `name`/`description` и эти поля не читает из ответа. |
| [landing.converters.ts:10](src/entities/tour/landing/converters/landing.converters.ts#L10) + [landing.schema.ts](src/entities/tour/landing/schema/landing.schema.ts) | В бэкенде есть `overview`, `overview_description`, а в zod-схеме и конвертерах их нет. Ни отправляются, ни отображаются. |

### P1 — типы ответа не совпадают с реальным ответом
| Где | Проблема |
|---|---|
| [account-backend.interface.ts:3](src/entities/user/account/types/account-backend.interface.ts#L3) | `TAccountBackend = AuthUserProfileModel`, а `getMyAccount` возвращает `MyAccountRead` (нет `id`/`user_id`, есть `email`). Конвертер работает только с общими полями, `email` теряется. |
| [operator-currency-rate.service.ts:39](src/entities/commission/api/operator-currency-rate.service.ts#L39) `updateOperatorCurrencyRate` | `ResultType = IOperatorCurrencyRate`, но `transformResponse` нет → компоненту приходит сырой `OperatorFxRateModel` (`rate: string` вместо `number`). |
| [operator-payment-routes.service.ts:16](src/entities/finance/finance-information/api/operator-payment-routes.service.ts#L16) | `listPaymentRoutes`: `transformResponse: (response: any)`. Для `create`/`updatePaymentRoute` заявлен `TOperatorPaymentRoute`, но без конвертера. Фронтовые `details` описаны как `classic_swift | wise`, а в бэкенде `classic_swift | custom`. |
| [tour.service.ts:44](src/entities/tour/tour/api/tour.service.ts#L44) `createTour` | Заявлен `ITourCard`, `transformResponse` закомментирован. Сейчас результат не используется, поэтому вреда нет, но тип вводит в заблуждение. |

### P2 — поля ответа, которые фронт не использует (кандидаты в фичи)
- `TourModel`: `slug`, `cover_image_path` — согласуется с неиспользуемыми `tour-slug` и `cover`-эндпоинтами.
- `TOUR_PUBLIC_PATHS.getTour`: в превью не показываются `group_size_min`, `duration_hours`, `languages`.
- `TOUR_PACKAGES_PATHS.create/updatePackage`: `expenses`, `fees`, `markup` из ответа игнорируются.
- `BOOKING_ORDER_AGENCY/USER.get*BookingOrder`: `discount`.
- `INVOICE_PATHS.getInvoice`: `typ`, `amount`, `payment_details`.
- `CLIENT_PAYMENT_*`: `client_name`, `rate`, `base_amount`, `attachment_count`.
- `OPERATOR_SUPPLIER_PAYMENT_*`: `rate`, `base_amount`.
- `OPERATOR_PATHS.getOperatorFinancials`: `default_currency`.

### P2 — не передаются опциональные query-параметры
- `TOUR_EVENTS_PATHS.listTourEvents` ([event.service.ts:150](src/entities/tour/itinerary/api/event.service.ts#L150)): `read_lang`, `skip`, `limit` — важно для переводов (см. `TOUR-TRANSLATIONS.md`).
- `TOUR_OPTION_PATHS.getPricingBreakdown`: `as_of`, `pax`, `date` (в превью ещё и `currency`).
- `TOUR_PUBLIC_PATHS.getPublicTourOption`: `currency`.

## 5. Ограничения анализа
- Multipart-тела (`file`, `images`, `files`) собираются через `FormData`, поэтому они исключены как ложные срабатывания.
- `queryFn`-эндпоинты (превью тура, `updateOption`/`updatePoolMember`) сверены вручную по `as`-кастам: расхождений нет.
- Для списочных ответов (массивы, пагинация) проверка «поле не читается» не применялась.
- zod-ограничения (min/max/pattern) против OpenAPI (`@maxLength` и т. п.) автоматически не сверялись. Проверялось только наличие полей.

Скрипты анализа (не в репозитории): `endpoints.mjs`, `schemas.cjs`, `converters.cjs`. Их можно положить в `scripts/` и запускать после `npm run codegen`.
