# Контракт 5: pricing-breakdown — из чего сложилась цена

Только wire-level факты. Обозначения: `T = /tour/{tour_id}/option/{option_id}`, `B = /booking`.

---

## 1. Переименование

`GET T/summary` **удалён**. Тот же ответ, с новыми полями, теперь:

GET T/pricing-breakdown?currency=USD — 200 `PricingBreakdownResponse`

Алиаса нет: старый путь отдаёт 404.

---

## 2. Что добавилось на верхнем уровне

- `pax: {min, max}` — headcount, на котором посчитаны `min` и `max` каждой суммы: `min` = `group_size_min` тура (1, если не задан), `max` = `group_size`. Все `estimated_*` — суммы **за всю группу** на этих headcount'ах.
- `estimated_revenue_per_person: {min, max}` — цена на человека: каждый leg делится на свой headcount, `min` — меньший из двух, `max` — больший. Это то же число, что `price_per_person` / `price_per_person_max` у `GET /tour/{id}/public/option/all` и `price_per_person` в каталоге.

Пример: `group_size = 13`, `group_size_min` пуст → `pax = {min: 1, max: 13}`, `estimated_revenue = {min: 942.1, max: 5336.9}`, `estimated_revenue_per_person = {min: 410.53, max: 942.1}`. Раньше FE показывал 942 как «минимальную цену» — это цена соло-бронирования.

---

## 3. Что добавилось на строке события

У каждой строки `events[]` с `typ = individual_bill`:

- `breakdown: {min: BreakdownLine[], max: BreakdownLine[]}` — из каких единиц сложилась `cost.min` / `cost.max`. Сумма `cost` по строкам равна `cost.min` / `cost.max` события; то же для `markup` и `fee`.
- `warnings: PricingWarning[]` — структурные подозрения в данных события (см. §5).

У строки с `typ = package_bill` — только `breakdown`, одна строка на пакет, `label` = имя пакета, `unit_id` = id пакета.

`BreakdownLine`:

- `kind` — `unit` (сама единица) | `extra_cost` (именованная доп. строка внутри charge) | `surcharge` (наценка отеля за ранний заезд / поздний выезд).
- `label` — как единица называется: `"Standard / double"`, `"minivan / Comfort"`, `"Экскурсия / en"`, имя offering / fare / item. Может быть `null`.
- `unit_id` — id комнаты / машины / fare / offering / пакета, если единица — строка поставщика; `null` у inline-цен без id и у `surcharge`.
- `pricing` — `fixed` | `per_person` | `per_group` | `per_duration`; `null` у `surcharge`.
- `rate` — для `per_duration`: чем оценивается одна ночь/день (`fixed` | `per_person` | `per_group`), иначе `null`.
- `unit_cost` — цена **одной** единицы в валюте поставщика, до умножений.
- `quantity` — сколько таких единиц забронировано (7 комнат, 2 машины). Bin-packing схлопывается в одну строку.
- `pax` — headcount, на который умножено (`per_person` / `per_group`), иначе `null`.
- `duration` — ночи / дни, на которые умножено (`per_duration`), иначе `null`.
- `fx_rate` — курс `unit_cost.currency → currency ответа`, если валюты отличаются, иначе `null`.
- `cost`, `fee`, `markup` — итог строки в валюте ответа.

Проверка руками: `cost = unit_cost × quantity × (pax|1) × (duration|1) × (fx_rate|1)`.

---

## 4. Где ещё есть breakdown

GET B/order/operator/{booking_id}/itinerary — 200

- у каждой строки `events[]`: `breakdown: {min, max}` и `warnings[]` на **pax и дату брони** (один headcount, но два leg'а: `min` — самое дешёвое разрешение категорий комнат/машин, `max` — самое дорогое). `min` — это директива оператору, что именно бронировать.
- у каждой строки `packages[]`: `breakdown: {min, max}`.

GET B/revision/{booking_id}/preview — 200

- `breakdown: [{event_id, lines: BreakdownLine[], warnings: PricingWarning[]}]` — по одной записи на каждое событие эффективного маршрута, в его порядке; пустой список, если цена не резолвится (нет курса / финансов).

---

## 5. PricingWarning

- `flat_charge_on_multi_night_stay` — стой > 1 ночи, а комната / отель оценены `fixed`, не `per_duration`: ночи не умножаются.
- `flat_charge_on_multi_day_guide` — гид > 1 дня с `fixed` ценой.
- `fixed_charge_on_sightseeing` — activity с `sub_typ` `sightseeing` | `spiritual` и `fixed` offering > 0: входные билеты обычно per person. Эвристика.
- `empty_supply` — priced-тип без offerings / комнат / машин / fares / категорий / items.
- `zero_cost` — есть что оценивать, но `max`-leg вышел в 0 по всем строкам.

`ref` и `options` события warnings не получают (`[]`).
