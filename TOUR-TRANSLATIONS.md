# Переводы туров: как подключены языки на фронте

Как фронт запрашивает контент тура на языке интерфейса, запускает автоперевод и показывает его статус. Что умеет бэкенд, что подключено, какие правила соблюдать в новом коде и что пока не работает.

---

## 1. Контракт бэкенда

| Механизм | Где | Что делает |
| --- | --- | --- |
| `?read_lang=<LanguageCode>` | GET-роуты контента тура: публичное превью, лендинг, события, pricing-breakdown, каталог | Отдаёт текст на указанном языке. По умолчанию `en` |
| `?lang=<LanguageCode>` | Детали заказа: `/booking/order/{agency,operator,user}/{id}` | Язык, на котором отдаются данные заказа |
| `POST /tour/computed/i18n/tour/{tourId}/regenerate?force=` | — | Ставит в очередь перевод лендинга и событий на языки тура (`tour.languages`). Ответ: `TourRegenerateResponse` |
| `translation: "source" \| "pending" \| "ready"` | В каждом `TourEventResponse` | Статус перевода события целиком |

Особенности:

- `PATCH /tour/{id}/landing` **не принимает** `read_lang`: редактирование всегда идёт на исходном языке.
- В `TRANSLATIONS_PATHS.regenerateTourTranslations` кодоген указал `response: void`, на деле приходит `TourRegenerateResponse`. Тип исправлен вручную в `tour-translations.types.ts`.
- Языки UI (`ENUM_LANGUAGES` из `@/shared/config`: en/ru/uz) и языки тура (`ENUM_LANGUAGES` из `@/entities/tour/landing`) — это **разные enum'ы**. `read_lang` строится из языка UI.

---

## 2. Главное правило: на каких экранах передаётся язык

| Экран | Язык | Почему |
| --- | --- | --- |
| Публичное и draft-превью тура, превью опции, бронирование из превью | ✅ `read_lang` = язык UI | Экраны только для чтения, их видит клиент или агент |
| Детали заказа (agency, operator), инвойс | ✅ `lang` = язык UI | Только чтение |
| Каталог, фильтры, подсказки локаций | ✅ (было сделано раньше) | Только чтение |
| Мутации событий (copy, attach, autosave и т. п.) | ✅ (было сделано раньше) | Язык ответа мутации |
| **Форма лендинга, формы событий, itinerary-доска, список опций** | ❌ **не передаём** | Если загрузить форму в переводе и сохранить, перевод перезапишет оригинал |

Язык в формы редактирования не добавлять, пока бэкенд не начнёт принимать язык при записи.

---

## 3. Общие кирпичики

### `useCurrentLanguage` — [src/shared/hooks/use-current-language.ts](src/shared/hooks/use-current-language.ts)

```ts
export const useCurrentLanguage = (): ENUM_LANGUAGES_TYPE => {
	const { i18n } = useTranslation();

	return i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
};
```

### Конвертеры query — [src/shared/converters/language-code.converters.ts](src/shared/converters/language-code.converters.ts)

```ts
mapReadLangQueryToBackend(language)  // → { read_lang } | {}
mapOrderLangQueryToBackend(language) // → { lang } | {}
```

Оба всегда возвращают объект, чтобы в сервисах не было тернарников (паттерн как у `mapEventReadLangQueryToBackend`). Языки, которых нет в `languageCodeMapper`, превращаются в `en`.

---

## 4. Как добавить язык в запрос (паттерн)

1. **Язык входит в аргумент query.** RTK Query кэширует по аргументу: если язык передать в обход аргумента, после переключения языка придёт закэшированный ответ на старом языке.

   ```ts
   // types/preview-tour-query.types.ts
   export interface IPreviewTourQueryArgs {
   	tourId: string;
   	language: ENUM_LANGUAGES_TYPE;
   }
   ```

2. **Сервис превращает язык в query через конвертер:**

   ```ts
   getPreviewTour: builder.query<IPreviewTourData, IPreviewTourQueryArgs>({
   	query: ({ tourId, language }) => ({
   		...TOUR_PUBLIC_PATHS.getPublicLandingPage(tourId),
   		params: mapReadLangQueryToBackend(language)
   	}),
   	transformResponse: (response: TPreviewTourBackend) =>
   		mapPreviewTourToFrontend(response)
   }),
   ```

   В `queryFn` с ручными вызовами `baseQuery` то же самое: `toQueryArgs({ ...PATH(...), params: mapReadLangQueryToBackend(language) })`.

3. **Язык берётся в хуке данных** (`use-*-page-data.ts`, `use-order-details.ts`) через `useCurrentLanguage()`, а не на странице. Так сигнатуры страниц не меняются.

4. **Теги не зависят от языка.** `providesTags` строится по `id`, без языка, чтобы инвалидация сбрасывала кэш сразу на всех языках:

   ```ts
   providesTags: (_result, _error, { bookingId }) => [
   	{ type: ENUM_API_TAGS.BOOKING_ORDERS, id: bookingId }
   ]
   ```

---

## 5. Что подключено

### 5.1 Превью тура — [preview-tour.service.ts](src/entities/tour/preview-tour/api/preview-tour.service.ts)

| Endpoint RTK | Роут | Аргумент |
| --- | --- | --- |
| `getPreviewTourGeneral` | `GET /tour/{id}/public` | `IPreviewTourQueryArgs` |
| `getPreviewTour` | `GET /tour/{id}/public/landing` | `IPreviewTourQueryArgs` |
| `getPreviewOption` | `GET /tour/{id}/public/option/{optionId}/itinerary` | `IPreviewOptionQueryArgs` |
| `getDraftPreviewLanding` | `GET /tour/{id}/landing` (только чтение) | `IPreviewTourQueryArgs` |
| `getDraftPreviewOptions` | `GET .../option/{id}/pricing-breakdown` для каждой опции | `IPreviewTourQueryArgs` |
| `getDraftPreviewOption` | `GET .../option/{id}/pricing-breakdown` | `IPreviewOptionQueryArgs` |

Где берётся язык:

- [use-preview-tour-page-data.ts](src/entities/tour/preview-tour/api/use-preview-tour-page-data.ts);
- [use-preview-option-page-data.ts](src/entities/tour/preview-tour/api/use-preview-option-page-data.ts);
- [use-preview-option-detail.ts](src/entities/tour/preview-tour/api/use-preview-option-detail.ts);
- [use-preview-booking.ts](src/widgets/tours/preview-booking/model/hooks/use-preview-booking.ts). Здесь переменная называется `readLanguage`, потому что `language` в этом хуке — язык тура в форме бронирования.

### 5.2 Детали заказа — `src/entities/booking/order/api/booking-order-*.service.ts`

`getAgencyBookingOrder`, `getOperatorBookingOrder` и `getUserBookingOrder` принимают `IBookingOrderQueryArgs { bookingId, language }` и отправляют `?lang=`.

Где вызываются:

- `widgets/booking-agency/order-id/model/hooks/use-order-details.ts`;
- `widgets/booking-operator/order-id/model/hooks/use-order-details.ts`;
- `widgets/finance-operator/invoice-id/ui/invoice-id.tsx`.

`useGetUserBookingOrderQuery` пока нигде не вызывается.

### 5.3 Запуск автоперевода

**Entity** — `src/entities/tour/tour/`:

- `types/tour-translations.types.ts` — `IRegenerateTranslationsArgs`, `IRegenerateTranslationsResult`, backend-типы;
- `converters/tour-translations.converters.ts` — `mapRegenerateTranslationsQueryToBackend(force)` (`{}` или `{ force: true }`) и `mapRegenerateTranslationsToFrontend` (snake → camel);
- `api/tour-translations.service.ts` — мутация `regenerateTourTranslations`, после неё инвалидируется `ENUM_API_TAGS.TOURS_EVENTS`.

**Feature** — [src/features/tours/regenerate-translations/](src/features/tours/regenerate-translations/ui/regenerate-translations-button.tsx), кнопка `RegenerateTranslationsButton` в блоке «Переводы»:

- «Перевести тур» отправляет `regenerate` без `force`, готовые переводы пропускаются;
- «Перевести всё заново» сначала спрашивает подтверждение через `requestConfirm`, затем отправляет `regenerate?force=true`;
- тост показывает `eventsScheduled` и `targetLanguages`, при ошибке — `general.translations.toasts.error`.

**Подключение:** [general-info.tsx](src/widgets/tours/settings/ui/general-info/general-info.tsx), под формой и вне `<form>`, чтобы кнопка не сабмитила форму. Перевод идёт по **сохранённым** языкам тура: после смены языков сначала нужно сохранить настройки.

### 5.4 Статус перевода события

Цепочка:

```
TourEventResponse.translation  (TranslationState)
  → eventTranslationMapper.from()           entities/tour/itinerary/converters/event-translation.converters.ts
  → ITourEvent.translation                  ENUM_EVENT_TRANSLATION: source | ready | pending
  → IDayItem.isTranslating                  widgets/tours/itinerary/model/hooks/use-itinerary-events.ts
  → <Badge>«Перевод…»</Badge>               widgets/tours/itinerary/ui/droppable-day-container/draggable-day-item.tsx
```

- Если статуса нет или он неизвестен, событие считается `SOURCE`.
- Бейдж есть только у события целиком. У альтернатив внутри события с несколькими вариантами своего статуса нет.

### 5.5 i18n-ключи

- `public/locales/{en,ru}/tours/tour_settings_page.json` → `general.translations.*` (заголовок, описание, кнопки, подтверждение, тосты);
- `public/locales/{en,ru}/tours/tour_itinerary_page.json` → `trip_details.translation.pending`.

---

## 6. Ограничения и что ждёт бэкенд

| Проблема | Причина | Что нужно |
| --- | --- | --- |
| Названия и описания опций не переводятся | У `GET /tour/{id}/option/all` и `GET /tour/{id}/public/option/all` нет `read_lang`, у `TourOptionModel` нет поля `translation` | Бэкенд: язык в обоих списках опций и перевод опций |
| Бейдж «Перевод…» не исчезает сам | Статус не опрашивается | Фронт при необходимости: `pollingInterval`, пока есть `pending` события |
| Бейдж может не появиться сразу после запуска | Фронт рассчитывает, что `regenerate` сразу ставит событиям `pending` | Проверить на живом бэкенде |
| Формы редактирования на исходном языке | Запись (`PATCH`) идёт без языка | Это осознанное решение, см. раздел 2 |
| Slug-роут `/tour/slug/{slug}` не используется | Отдельная задача про роутинг и SEO | — |

Отложенный рефакторинг: около 20 мест вручную пишут `i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN`, а в itinerary есть свой `mapEventReadLangQueryToBackend`. Их можно перевести на `useCurrentLanguage` и `mapReadLangQueryToBackend`.

---

## 7. Тесты и проверка

Юнит-тесты:

- `src/shared/converters/language-code.converters.test.ts`;
- `src/entities/tour/tour/converters/tour-translations.converters.test.ts`;
- `src/entities/tour/itinerary/converters/event-translation.converters.test.ts`.

Ручная проверка:

1. Превью тура (публичное и draft): переключить язык, в Network должны уйти новые запросы с `?read_lang=ru`. При обратном переключении ответ берётся из кэша.
2. Детали заказа (agency и operator): запрос уходит с `?lang=ru`.
3. Настройки тура → General → «Перевести тур»: тост со счётчиками. «Перевести всё заново» сначала спрашивает подтверждение.
4. Itinerary: у событий в `pending` виден бейдж «Перевод…».
5. Форма лендинга и формы событий: в GET-запросах **нет** `read_lang`.
