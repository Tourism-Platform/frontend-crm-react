# Контракт 6.2: уточнения к 6.1, категории трансфера, сужение до номеров

Дополнение к `fe6.md` и `fe6.1.md`. Только то, что изменилось или было описано
неточно. Обозначения:

- `S = /supplier/{supplier_id}/product`, `P = S/{product_id}`;
- `E = /tour/{tour_id}/{option_id}/event`;
- `M = E/{event_id}/option/{event_option_id}/pool/{supply_id}`;
- `L = /tour/event/library`.

Суммы в примерах сокращены до чисел; на проводе это по-прежнему
`{typ: "fixed", cost: {val, currency}}` со своими `fees`/`markup`.

---

## 1. Публичные цены — только «от»

Поправка к §5 `fe6.1.md`: `max` раньше уходил наружу, теперь убран.

GET /tour/{tour_id}/public/option/all — 200

У элемента `total_price`, `price_per_person`. Полей `total_price_max` и
`price_per_person_max` нет.

GET /tour/{tour_id}/public/option/{option_id}/itinerary — 200

`id`, `events`, `total_price`. Поля `total_price_max` нет.

GET /tour/catalog/public — 200

`price_range` и `price_per_person` — `{min, currency}`, ключа `max` нет.

Размах по численности группы оператор берёт из
`GET /tour/{tour_id}/option/{option_id}/price-matrix` (см. `fe5.md`). Строка
на каждую численность; прежний `total_price_max` — это `revenue.max` в строке
`pax = group_size`.

---

## 2. Itinerary брони у агентства

GET /booking/order/{booking_id}/itinerary — 200

- События приходят в той же публичной форме, что и витрина (§3 `fe6.1.md`):
  `details.spec`, без `pool`, `supply`, `override`.
- Названий отелей, автопарков и маршрутов там нет.
- Даты проставлены. У `train` и `flight` они в `details.spec.hop[]`:
  `departure_date`, `arrival_date`.

Бронь с поездом или перелётом раньше отвечала 500 — исправлено.

---

## 3. Машины и автобусы на карточке — только класс

`details.spec.cars[]` (transfer) и `details.spec.vehicles[]` (bus):

- заполнены только `typ` и `pax`;
- `name` и `description` — всегда `null`;
- `categories` у машины — всегда `[]`;
- одна запись на пару `{typ, pax}` по всему пулу.

Машина, которая не продаётся ни в одной категории, взятой альтернативой (§6),
не показывается.

Так и было описано в `fe6.1.md`; раньше сервер это не соблюдал, теперь
соблюдает.

---

## 4. Комнаты и блюда на карточке

- Комната: `{typ, pax}`; `name` и `description` — `null`, `images` — `[]`.
  Фото комнат на карточку не попадают.
- Блюда `activity` / `food` приходят с названием, описанием и фото —
  площадка единственная, кого путешественнику обещают по имени.

---

## 5. Событие из библиотеки

Чтобы создать событие тура из `GET L/{library_id}`, у каждого
`details.pool[i]`:

1. перенести `spec` в `supply.spec`;
2. удалить `is_main` — на запись он не принимается, иначе 422.

---

## 6. Трансфер `per_car_category`: категории объявляются один раз

Было: у каждой машины свой список `categories: [{id, name, charge}]`, и
«Comfort» у двух машин — две несвязанные записи.

Стало: категории объявлены на автопарке, машина ссылается на них ценами.

    spec (per_car_category):
      pricing: "per_car_category"
      name
      images[]
      categories: [{id, name}]            ← один раз на автопарк
      cars: [{id, name, body_type, pax, description, images[],
              prices: [{id, category_id, charge}]}]

- Машина может стоять в нескольких категориях, в одной или ни в одной.
- В одной категории может быть много машин.
- `prices[].category_id` — только из `spec.categories[].id`. Одна цена на
  категорию у машины.
- `prices[].id` — идентификатор цены (машина × категория). Его называют
  override и строки брони (§10, §11). Он не меняется, пока машина остаётся в
  категории.
- У машин больше нет `categories` и `charge`.
- `per_car` и `whole` не изменились; у них нет `spec.categories`.

Та же форма у inline-трансфера. Для inline `id` категорий и цен можно
генерировать на клиенте.

---

## 7. Автопарк поставщика: запись

POST S — 201

    {typ: "transfer", details: {
      pricing: "per_car_category", name,
      categories: [{id, name}],
      cars: [{name, body_type, pax, description?,
              prices: [{category_id, charge}]}]
    }}

- `categories` обязательно (может быть `[]`).
- `id` категорий в теле — локальные ссылки для `prices[].category_id` этого же
  тела. Сервер выдаёт свои id, и цены указывают уже на них. Берите id из
  ответа.
- Цена в необъявленной категории — 422.

PATCH P — 200

    {typ: "transfer", details: {pricing: "per_car_category", name,
                                categories: [{id?, name}]}}

Категории заменяются целиком и сопоставляются по `id`:

- `id` из ответа — та же категория, переименование сохраняет все цены;
- без `id` или с чужим `id` — новая категория;
- не прислана — удаляется вместе со всеми ценами машин в ней.

`categories` обязательно — PATCH без него 422. Всегда отправляйте эхом все
существующие.

Ошибки: 409 `Car category is referenced by tour events` — категорию берёт
scope тура или её цену переопределяет тур.

POST P/variant — 201, PATCH P/variant/{variant_id} — 200 (машина)

    {typ: "transfer", pricing: "per_car_category", name, body_type, pax,
     description?, prices: [{category_id, charge}]}

- `prices: []` допустимо: машина добавлена, но не продаётся.
- Цены сопоставляются по `category_id`: категория осталась — цена сохранила
  свой `id`; категория не прислана — машина из неё вышла.
- Одна категория дважды у машины — 422.

Ошибки:

- 422 `Car is priced in a category the fleet does not declare`;
- 409 `Supplier product variant is referenced by tour events` — убирается
  цена, которую переопределил тур.

POST P/pricing — 200 (переход на категории)

    {typ: "transfer", to: "per_car_category",
     categories: [{id, name}],
     prices: [{variant_id, category_id, charge}]}

- `category_id` — ссылка на `categories[].id` этого тела.
- Пара (машина, категория) — не больше одного раза.
- Машины, не названные в `prices`, остаются без цен.

Уход с `per_car_category` на `per_car` или `whole` удаляет категории и цены.

Ошибки:

- 422 `pricing switch must price every unit of the product exactly once` —
  названа чужая машина;
- 409 `pricing switch would drop car categories tours pin`;
- 409 `pricing switch would orphan tour overrides` (как раньше).

---

## 8. Scope: номера и категории

    scope (only):
      typ: "only"
      ids: [variant_id]          ← теперь необязателен, по умолчанию []
      units: [room_id]           ← новое, только отель
      categories: [category_id]  ← новое, только per_car_category

Отель:

- `ids` — категории номеров, как раньше.
- `units` — номера внутри закреплённых категорий.
- Категория, у которой не назван ни один номер, берёт все свои номера,
  включая добавленные позже.
- Категория с названными номерами берёт только их.
- `units` без `ids` — 422.

Трансфер `per_car_category`:

- `categories` — берутся все машины в этих категориях, включая машины,
  добавленные в них позже.
- `ids` — сужение по машинам; пустой = все машины.
- Оба списка сужают одновременно: пары (машина из `ids`, категория из
  `categories`).

Остальные типы — как раньше, только `ids`.

`typ: "only"` без `ids` и без `categories` — 422. Повтор в любом списке — 422.

На чтении у `only` всегда есть все три списка (`ids`, `units`, `categories`),
в том числе в `GET P/links`.

Где принимается:

- создание события и PATCH альтернативы — эхо обязательно, все три списка
  сравниваются как множества;
- `POST M/attach`, `POST M/relink`, `PATCH M/scope`;
- библиотека.

Ошибки (422):

- `Scope names variants the supplier product does not have`;
- `Scope names rooms outside the hotel categories it pins`;
- `Scope names car categories the supplier product does not declare`;
- `Only a hotel narrows to rooms and only a fleet priced by category narrows to
  car categories`.

Сужение с оставшимся override: 409 `Scope would strand a negotiated override on
units it leaves out`, либо `drop_stray_overrides: true`.

Поставщик не может удалить номер, закреплённый в scope тура: PATCH категории
номеров → 409 `Supplier product variant is referenced by tour events`.

---

## 9. Что тур видит в `spec` связанного члена

`spec` приходит уже суженным.

- Отель: только закреплённые категории, внутри — только взятые номера.
- Трансфер:
  - только взятые категории;
  - у машин — только цены в них;
  - машины без цен в этих категориях не приходят.

`POST M/detach` с `keep: "spec"` копирует именно эту суженную форму.

---

## 10. Override `per_car_category`

PATCH M/override — 200

    {typ: "transfer", rates: {pricing: "per_car_category",
                              prices: [{price_id, charge}]}}

- Было `categories: [{category_id, charge}]` — такое тело теперь 422.
- `price_id` — это `spec.cars[].prices[].id`.
- Цена вне scope — 422 `Override prices a unit the event's scope does not
  take`.

---

## 11. Цена и строки брони

Расчёт `per_car_category`:

- группа едет в одной категории и упаковывается в машины этой категории;
- минимум — самая дешёвая категория, максимум — самая дорогая;
- классы больше не смешиваются;
- машина без цен не участвует и не мешает публикации.

Строки брони (booked units) для такого трансфера: `unit_id` = `price_id`.

---

## 12. Что доделать на FE

1. Убрать чтение `total_price_max`, `price_per_person_max` и `max` из
   каталога; размах показывать оператору из `price-matrix`.
2. Itinerary брони агентства читать как публичную карточку (`details.spec`).
3. У машин и автобусов на карточке показывать только тип и число мест.
4. При копировании из библиотеки удалять `is_main`.
5. Редактор автопарка `per_car_category`: список категорий на автопарке, цены
   машины — ссылками на категории; категории отправлять эхом при каждом PATCH.
6. Редактор scope: номера для отеля, категории для трансфера.
7. Override трансфера по категориям — по `price_id`.
