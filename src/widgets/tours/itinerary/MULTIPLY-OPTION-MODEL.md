# Multiply-option (typ 8): модели и примеры объектов

Наглядное сравнение **текущего API**, **целевой схемы** и **как это лежит во фронте**.

---

## 1. Сейчас: один UUID на родителя, дети в `details[]`

### Ответ `GET /tour/{tourId}/{optionId}/event` (фрагмент)

```json
[
  {
    "id": "aaaaaaaa-bbbb-cccc-dddd-111111111111",
    "tour_option_id": "option-uuid-1",
    "event": {
      "name": "Вариант перелёта",
      "description": "Выбрать один",
      "day": 2,
      "position": 1,
      "typ": "8",
      "details": [
        {
          "typ": "1",
          "name": "Рейс A",
          "day": 2,
          "position": 1,
          "hop": []
        },
        {
          "typ": "5",
          "name": "Отель B",
          "day": 2,
          "position": 1,
          "location": { "lat": 0, "long": 0 },
          "duration": 1
        }
      ]
    }
  },
  {
    "id": "ffffffff-eeee-dddd-cccc-222222222222",
    "tour_option_id": "option-uuid-1",
    "event": {
      "name": "Обед",
      "typ": "6",
      "day": 2,
      "position": 2
    }
  }
]
```

| Сущность | UUID (`TourEventResponse.id`) | Где живёт |
|----------|-------------------------------|-----------|
| Multiply-option (typ 8) | `aaaaaaaa-...` | Корень списка |
| «Рейс A» внутри option | **нет** | `event.details[0]` |
| «Отель B» | **нет** | `event.details[1]` |
| «Обед» typ 6 | `ffffffff-...` | Корень списка |

### TypeScript (OpenAPI)

```ts
interface TourEventResponse {
  id: string; // только у обёртки
  tour_option_id: string | null;
  event:
    | { typ: "1"; /* FlightEventSchemaOutput */ }
    | /* ... typ 2-7 ... */
    | MultipleOptionEventOutput;
}

interface MultipleOptionEventOutput {
  typ: "8";
  day: number;
  position: number;
  name?: string | null;
  details?: Array<
    | ({ typ: "1" } & FlightEventSchemaOutput)
    | ({ typ: "5" } & HousingEventSchemaOutput)
    // ...
  > | null;
}
```

### Фронт сегодня (`ITourEvent` → `IDayItem`)

```ts
// mapAllEventsToFrontend — плоско, details не разворачиваются
const tourEvent: ITourEvent = {
  id: "aaaaaaaa-bbbb-cccc-dddd-111111111111",
  eventType: "multiply-option",
  day: 2,
  position: 1,
  name: "Вариант перелёта",
  details: { /* весь массив как Record */ }
};

// На доске (как должно быть после гидратации)
const dayItem: IDayItem = {
  id: "aaaaaaaa-bbbb-cccc-dddd-111111111111",
  block_id: "aaaaaaaa-bbbb-cccc-dddd-111111111111",
  backendId: "aaaaaaaa-bbbb-cccc-dddd-111111111111",
  eventType: "multiply-option",
  title: "Вариант перелёта",
  items: [
    {
      id: "aaaaaaaa-...-detail-0", // клиентский ключ, не с бэка
      block_id: "aaaaaaaa-...-detail-0",
      eventType: "flight",
      title: "Рейс A"
      // backendId — нет
    },
    {
      id: "aaaaaaaa-...-detail-1",
      block_id: "aaaaaaaa-...-detail-1",
      eventType: "accommodation",
      title: "Отель B"
    }
  ]
};
```

### Операции при текущем API

| Действие UI | API |
|-------------|-----|
| Reorder «Обед» на day 2 | `POST .../event/ffffffff-.../reorder` `{ day: 2, position: 0 }` |
| Reorder «Рейс A» внутри multiply | `PATCH .../event/aaaaaaaa-...` body `{ typ: "8", details: [/* весь массив */] }` |
| Удалить «Рейс A» из multiply | тот же PATCH без элемента |
| Вынести «Рейс A» на day (promote) | `POST /event` (новый UUID) + PATCH parent `details` |

---

## 2. Целевая схема: дети = отдельные `TourEventResponse`

### Порядок: два уровня (важно)

| Уровень | Поля | Что задаёт |
|---------|------|------------|
| **Слот на доске** (родитель typ 8, обычные typ 1–7) | `day` + `position` | порядок карточек в колонке дня |
| **Внутри multiply** (только children) | `option_index` | порядок вариантов **внутри** родителя |

`day`/`position` у child — **копия слота родителя** (для booking/pricing по `day+position+typ`), **не** порядок среди siblings.

Порядок siblings = **только `option_index`** (как индекс в `details[]` сейчас, как `option_index` в `BookingEventAvailabilityModel`).

```ts
// Сборка items[] — сортировка по option_index, не по position
children
  .filter((e) => e.parentEventId === parent.id)
  .sort((a, b) => a.optionIndex - b.optionIndex);
```

**Reorder внутри nested (DND):**

```json
POST /tour/{tourId}/{optionId}/event/{childId}/reorder
{
  "parent_event_id": "aaaaaaaa-...",
  "option_index": 1
}
```

Либо отдельный endpoint `.../event/{parentId}/options/reorder` с массивом `[childId, childId, ...]`.

Нельзя использовать общий `{ day, position }` для детей — у всех children одинаковые day/position родителя, глобальный reorder смешает их с top-level.

---

### Тот же смысл, другой контракт (предлагаемый)

```json
[
  {
    "id": "aaaaaaaa-bbbb-cccc-dddd-111111111111",
    "tour_option_id": "option-uuid-1",
    "parent_event_id": null,
    "event": {
      "typ": "8",
      "name": "Вариант перелёта",
      "day": 2,
      "position": 1
    }
  },
  {
    "id": "child-1111-2222-3333-444444444444",
    "tour_option_id": "option-uuid-1",
    "parent_event_id": "aaaaaaaa-bbbb-cccc-dddd-111111111111",
    "option_index": 0,
    "event": {
      "typ": "1",
      "name": "Рейс A",
      "day": 2,
      "position": 1,
      "hop": []
    }
  },
  {
    "id": "child-5555-6666-7777-888888888888",
    "tour_option_id": "option-uuid-1",
    "parent_event_id": "aaaaaaaa-bbbb-cccc-dddd-111111111111",
    "option_index": 1,
    "event": {
      "typ": "5",
      "name": "Отель B",
      "day": 2,
      "position": 1
    }
  },
  {
    "id": "ffffffff-eeee-dddd-cccc-222222222222",
    "tour_option_id": "option-uuid-1",
    "parent_event_id": null,
    "event": { "typ": "6", "name": "Обед", "day": 2, "position": 2 }
  }
]
```

### TypeScript (целевой фронт)

```ts
interface ITourEvent {
  id: string;
  parentEventId?: string | null;
  optionIndex?: number; // порядок внутри typ 8
  eventType: ENUM_EVENT_TYPE;
  day: number;
  position: number;
  // ...
}

// Сборка доски
function buildDayColumns(events: ITourEvent[]) {
  const roots = events.filter((e) => !e.parentEventId);
  return roots.map((parent) => {
    if (parent.eventType !== "multiply-option") {
      return toDayItem(parent);
    }
    const children = events
      .filter((e) => e.parentEventId === parent.id)
      .sort((a, b) => a.optionIndex - b.optionIndex); // порядок внутри parent
    return {
      ...toDayItem(parent),
      items: children.map(toDayItem) // у каждого свой backendId
    };
  });
}
```

### Операции при целевой схеме

| Действие UI | API |
|-------------|-----|
| Reorder карточки на day (root) | `POST .../reorder` `{ day, position }` |
| Reorder «Рейс A» внутри multiply | `POST .../reorder` `{ parent_event_id, option_index }` **или** bulk reorder options |
| Удалить «Рейс A» | `DELETE .../event/child-1111-...` |
| Добавить шаблон в multiply | `POST /event` `{ parent_event_id, option_index: last+1, typ: "1", day, position /* parent's */ }` |
| Вынести на day | `PATCH` `{ parent_event_id: null }` + `reorder` `{ day, position }` |
| Загнать с day в multiply | `PATCH` `{ parent_event_id, option_index }` |

После delete/reorder внутри parent — бэк перенумеровывает `option_index` у siblings (0..n-1), как сдвиг массива `details[]`.

---

## 3. Booking: зачем typ 8 — «варианты», не папка

```ts
// BookingEventAvailabilityModel — привязка к родителю + индекс варианта
{
  id: "avail-uuid",
  booking_id: "booking-uuid",
  event_id: "aaaaaaaa-bbbb-cccc-dddd-111111111111", // parent typ 8
  option_index: 0, // выбран «Рейс A»
  status: "SELECTED"
}
```

При **child rows** в API: `event_id` может остаться parent, `option_index` ↔ child с тем же индексом / `child.id` в новой модели.

---

## 4. Сводка: два `IDayItem` на одной доске

```
День 2
├── [typ 8] Вариант перелёта     backendId = aaaaaaaa-...
│   ├── [typ 1] Рейс A           backendId = child-1111-...  (только в целевой схеме)
│   └── [typ 5] Отель B          backendId = child-5555-...
└── [typ 6] Обед                 backendId = ffffffff-...
```

**Сейчас:** порядок внутри parent = **индекс в `details[]`**.  
**Целево:** порядок = **`option_index`**, не `position` на day; у всех children свой `backendId`.

---

## 5. Что не смешивать

- `multiply-option-edit` форма `{ options: [{ name, checked }] }` — **другая** модель, пока не связана с `details[]` API.
- Pricing review: `id: "${day}-${position}-8"` и `subRows` по индексу — не UUID детей.
- DND `block_id` до create — локальный (`flight-1739123456`), не путать с `TourEventResponse.id`.
