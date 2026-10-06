# Контракт: копирование событий

Обозначения:

- `E = /tour/{tour_id}/{option_id}/event`;
- `L = /tour/event/library`;
- `R = /booking/revision/{booking_id}`.

Маршрут выбирается по тому, куда копируем. Откуда — поле `source.kind` в теле:
`event`, `library` или `revision`. Если `kind` не подходит маршруту, ответ — 422.

Общее для 403: `Authorization failed. Missing required permission.`

---

## 1. В опцию тура

POST E/copy — 201, ответ как у `GET E/{event_id}`

```json
{"source": {"kind": "event", "event_id": "…", "day": 2, "position": 0}}
{"source": {"kind": "library", "library_id": "…", "day": 1, "position": 0, "is_optional": false}}
```

- `event` — событие только из этой же опции.
  - `day` по умолчанию — день источника.
  - `position` по умолчанию — сразу после источника в его дне и в конце дня, если день другой.
  - Позиция за концом дня ставит событие в конец.
- `library` — `day` и `position` обязательны.
- Копируется всё:
  - альтернативы выбора, в том же порядке;
  - тексты, план, пакет;
  - участники пула с продуктом, scope, override и `is_main`.
- Картинки слота и фото номеров записываются в новые файлы, у копии свои URL. Если удалить одну сторону, вторая не пострадает.
- Переводы не копируются: копия переводится заново.
- 403:
  - в источнике есть override, а у сотрудника нет права на override;
  - источник из библиотеки, а у сотрудника нет права читать библиотеку.

Ошибки:

- 404 `Not found` — в этой опции нет такого события.
- 404 `Library event not found`.
- 409 `Archived tours are immutable; nothing related to the tour can change`.
- 422 `Every guide event must price every tour language; add the missing guide prices or narrow the tour's languages` — тур опубликован, а гид из библиотеки не покрывает все его языки. В этом случае ничего не создаётся.

---

## 2. В библиотеку

POST L/copy?read_lang=en — 201, ответ как у `GET L/{library_id}`

```json
{"source": {"kind": "event", "tour_id": "…", "option_id": "…", "event_option_id": "…"}}
{"source": {"kind": "library", "library_id": "…"}}
```

- `event_option_id` — это сама альтернатива: `event.id` у одиночного события, `event.details[].id` у выбора. Брать можно и из архивного тура.
- Переносятся тексты, план, пул со scope и картинки слота (в новые файлы).
- Не переносятся пакет, override, `is_main` и фото номеров.
- Локации пишутся полностью, `city` и `address` — на языке `read_lang`.
- Для источника-события нужно ещё право на чтение тура, иначе 403.

Ошибки:

- 404 `Not found` — нет такого тура.
- 404 `Tour option not found for this tour`.
- 404 `Event option not found`.
- 404 `Library event not found`.

---

## 3. В ревизию брони

POST R/event/copy — 201, ответ как у `GET R/preview`. В журнале правок появляется запись `create`.

```json
{"source": {"kind": "event", "event_id": "…"}}
{"source": {"kind": "revision", "event_id": "…"}}
```

- `event` — живое событие той опции тура, на которую сделана бронь (`GET E/itinerary`, поле `[].id`).
  - Оно замораживается так же, как при создании брони.
  - Встаёт на свой день и позицию из тура.
  - В `origin_event_id` записывается id этого события тура.
- `revision` — событие из снимка (`snapshot.events[].id` в preview). Дублируется целиком и встаёт сразу после источника.
- Override сохраняется.
- 403:
  - в источнике есть override, а у сотрудника нет права на override брони;
  - источник — событие тура, а у сотрудника нет права на чтение тура.

Ошибки:

- 404 `No such event on the booked tour option`.
- 404 `No such event in this booking's snapshot`.
- 422 `Events can only be revised while the booking is in processing`.
