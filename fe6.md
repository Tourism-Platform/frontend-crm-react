# Контракт 6: supplier pool — у альтернативы теперь список поставщиков

Только wire-level факты. Обозначения: `E = /tour/{tour_id}/{option_id}/event`,
`R = /booking/revision`, `L = /tour/event/library`.

---

## 1. Суть

Раньше альтернатива покупалась у одного поставщика: `details.supply` — у кого,
`details.spec` — что именно. Теперь у альтернативы **пул**: список поставщиков,
которые **вместе** закрывают один и тот же слот. Это не выбор — выбор
по-прежнему `MultiEvent` (`typ: "options"`, `details` = список альтернатив).
Пул — это «50 человек: 30 в отеле A, 20 в отеле B», одна строка программы.

    было:  details = {plan, supply, spec}
    стало: details = {plan, pool: [{id, supply, spec}, ...]}

`plan` не изменился ни у одного типа. Изменение затрагивает все девять типов:
`housing`, `train`, `flight`, `bus`, `transfer`, `activity`, `ref`, `guide`,
`supplementary`.

Пул никогда не пуст: на чтении `pool` всегда содержит хотя бы один элемент.
Пул из одного — это ровно сегодняшнее событие, и он остаётся нормой.

---

## 2. Форма члена пула

**На чтении** (`GET E/{event_id}`, `GET E/itinerary`, снапшоты броней) член —
это `{id, supply, spec}`:

- `id` — UUID члена пула. Новое поле, адресует член во всех маршрутах ниже.
- `supply` — откуда покупается, дискриминатор `source`:
  - `{source: "inline", supplier_id}` — оператор описал сам;
  - `{source: "product", product_id, supplier: {id, name}, scope, override}` —
    читается с товара поставщика.
- `spec` — сам отель / маршрут / парк / площадка. На чтении **всегда заполнен**:
  для inline это то, что ввёл оператор, для product — собранное с товара.

**На записи** член — это `{id?, supply}`, **без верхнеуровневого `spec`**:

- `id` — echo существующего члена (см. §4). Отсутствует → новый член.
- `supply` для inline несёт спеку внутри себя:
  `{source: "inline", supplier_id, spec: {...}}`.
- `supply` для товара: `{source: "product", product_id, scope}`.
  `scope` — `{typ: "all"}` либо `{typ: "only", ids: [...]}`, по умолчанию `all`.

Асимметрия важна: на чтении `spec` рядом с `supply`, на записи — внутри
`supply.spec`. Так было и раньше, просто теперь это внутри элемента `pool`.

Исключения по типам:

- `ref` — `pool` можно не присылать при создании, тогда создаётся один член без
  поставщика. `supply.spec` = `{}`.
- `guide`, `supplementary` — только inline-арм, товара для них нет.

---

## 3. Создание

POST E/create — 201
POST E/{event_id}/option — 201

Тело то же, что и раньше, но `details.pool` обязателен и непуст (кроме `ref`).
Минимальный inline-отель:

```json
{
  "typ": "housing",
  "day": 1,
  "details": {
    "plan": {"duration": 2},
    "pool": [
      {"supply": {"source": "inline", "supplier_id": null, "spec": {...}}}
    ]
  }
}
```

Два отеля на один слот — два элемента `pool`. Если `pool` не прислан (и это не
`ref`) — 400 `A new option states where its supply comes from`.

---

## 4. Обновление альтернативы: контракт echo

PATCH E/{event_id}/option/{event_option_id} — 200

Два режима:

1. **`pool` не прислан вовсе** — весь пул остаётся как есть. Меняются только
   тексты, `plan` и `package_id`. Это рекомендуемый режим для обычного
   редактирования.
2. **`pool` прислан** — он обязан в точности повторять текущий пул: те же `id`,
   столько же элементов, и у каждого привязанного члена тот же `product_id` и
   тот же `scope`. Inline-члены при этом заменяют свою `spec` и `supplier_id`.

Что вернётся при расхождении:

- добавлен или убран элемент, либо `id` не совпадают —
  409 `Pool members are added and removed through the pool routes`;
- у члена изменился `product_id` или `scope` —
  409 `Supply moves through attach, relink, scope or detach`.

Практически: FE читает событие, редактирует, отправляет обратно те же `id`.
Добавление и удаление поставщиков — отдельные маршруты (§5).

Отдельный случай — смена `typ` альтернативы (только у одиночного события).
Тогда `pool` обязателен, старые члены удаляются целиком, новые создаются с
новыми `id`.

---

## 5. Новые маршруты пула

POST   E/{event_id}/option/{event_option_id}/pool — 201
DELETE E/{event_id}/option/{event_option_id}/pool/{supply_id} — 200

Тело POST — член плюс тег типа альтернативы:

```json
{"typ": "housing", "supply": {"source": "inline", "supplier_id": null, "spec": {...}}}
```

`typ` обязан совпадать с типом альтернативы, иначе 400
`Option type must match the event's other options`. Оба маршрута возвращают всё
событие целиком, как `GET E/{event_id}`.

Ошибки:

- `supply_id` не принадлежит альтернативе — 404 `Pool member not found`;
- удаление последнего члена — 400
  `Cannot remove the last supplier of an option's pool`.

Удаление уносит с собой картинки узлов этого члена и его override.

---

## 6. Переехавшие маршруты

Все переходы по товару теперь адресуют конкретного члена пула. Путь стал длиннее
на `/pool/{supply_id}`, тела и коды ошибок не изменились.

    было:  POST   E/{event_id}/option/{event_option_id}/attach
    стало: POST   E/{event_id}/option/{event_option_id}/pool/{supply_id}/attach

    было:  POST   E/{event_id}/option/{event_option_id}/relink
    стало: POST   E/{event_id}/option/{event_option_id}/pool/{supply_id}/relink

    было:  PATCH  E/{event_id}/option/{event_option_id}/scope
    стало: PATCH  E/{event_id}/option/{event_option_id}/pool/{supply_id}/scope

    было:  POST   E/{event_id}/option/{event_option_id}/detach
    стало: POST   E/{event_id}/option/{event_option_id}/pool/{supply_id}/detach

    было:  PATCH  E/{event_id}/option/{event_option_id}/override
    стало: PATCH  E/{event_id}/option/{event_option_id}/pool/{supply_id}/override

    было:  DELETE E/{event_id}/option/{event_option_id}/override
    стало: DELETE E/{event_id}/option/{event_option_id}/pool/{supply_id}/override

Старые пути отдают 404, алиасов нет.

---

## 7. Ревизия брони

Те же два новых маршрута и тот же переезд, внутри замороженного документа.
Бронь обязана быть в `PENDING`.

POST   R/{booking_id}/event/{event_id}/pool — 201
DELETE R/{booking_id}/event/{event_id}/pool/{supply_id} — 200

    было:  PATCH  R/{booking_id}/event/{event_id}/product
    стало: PATCH  R/{booking_id}/event/{event_id}/pool/{supply_id}/product

    было:  DELETE R/{booking_id}/event/{event_id}/product
    стало: DELETE R/{booking_id}/event/{event_id}/pool/{supply_id}/product

    было:  PATCH  R/{booking_id}/event/{event_id}/override
    стало: PATCH  R/{booking_id}/event/{event_id}/pool/{supply_id}/override

    было:  DELETE R/{booking_id}/event/{event_id}/override
    стало: DELETE R/{booking_id}/event/{event_id}/pool/{supply_id}/override

Для событий-выборов query-параметры `event_option_id` и `option_index`
сохраняются и работают как раньше — они называют альтернативу, а `supply_id`
называет члена внутри неё.

`PATCH R/{booking_id}/event/{event_id}` (полная замена события) переносит
согласованные override'ы на те члены, чьи `id` FE вернул обратно. Если FE
отправит члена без `id` или с новым `id`, override этого члена будет потерян —
echo `id` обязателен.

Лог правок `GET R/{booking_id}/edits` — у записей с `op: "override"` появилось
поле `supply_id`.

---

## 8. Библиотека событий

POST  L — 201
PATCH L/{library_id} — 200
GET   L/{library_id} — 200
GET   L — 200

Тело и ответ используют ту же форму `details.pool`, отдельных маршрутов пула у
библиотеки нет: пул присылается целиком и заменяется целиком. `override` у
библиотечной записи не бывает — она не привязана к туру.

---

## 9. Публичная витрина и каталог

Поставщицкая половина каждого типа уехала в `details.pool[]`. Планная половина
осталась на месте.

- `housing`: наверху остаются `duration`, `check_in`, `check_out`.
  В `pool[]` — `name`, `location`, `stars`, `amenities`, `categories`, `typs`,
  `images`.
- `bus`: наверху остаётся `hop`. В `pool[]` — `name`, `vehicles`, `images`.
- `transfer`: наверху остаются `typ`, `departure`, `arrival`.
  В `pool[]` — `name`, `cars`, `images`.
- `activity`: наверху остаются `start_time`, `end_time`.
  В `pool[]` — сама площадка, дискриминатор `typ` (`food` / прочие).
- `train`: наверху не остаётся ничего. `details.hop` → `details.pool[i].hop`,
  плюс `name` и `images` у каждого элемента.
- `flight`: так же — `details.hop` → `details.pool[i].hop`.

`pool` здесь по умолчанию пустой список, а не обязательно непустой: событие без
опубликованной поставщицкой части отдаст `pool: []`.

Ссылок на поставщиков в публичных схемах по-прежнему нет — только название
объекта, его картинки и состав.

---

## 10. Цена

Цена альтернативы теперь размах по пулу: `min` — самый дешёвый член, `max` —
самый дорогой, каждый посчитан на полную группу. У пула из одного ничего не
изменилось.

Следствие для UI: у события с двумя разными по цене поставщиками `min` и `max`
разъедутся, и это не ошибка данных. Реальная цена сплита окажется между ними.

У строки `BreakdownLine` (`GET T/pricing-breakdown`, itinerary оператора,
`GET R/{booking_id}/preview`) появилось поле:

- `supply_id` — член пула, у которого куплена эта строка; `null` там, где строка
  не привязана к поставщику. Позволяет сгруппировать разбивку по поставщикам.

---

## 11. Новые коды ошибок

404 `Pool member not found` — `supply_id` не принадлежит альтернативе.

400 `Cannot remove the last supplier of an option's pool` — попытка удалить
последнего члена.

409 `Pool members are added and removed through the pool routes` — `pool` в
PATCH не совпал с текущим составом.

409 `Supply moves through attach, relink, scope or detach` — существовал раньше,
теперь срабатывает и когда echo члена расходится по `product_id` или `scope`.

---

## 12. Чек-лист миграции FE

1. Везде, где читался `details.supply` и `details.spec`, читать
   `details.pool[i].supply` и `details.pool[i].spec`. Для однопоставщикового UI
   достаточно `pool[0]`.
2. При создании оборачивать `supply` в `pool: [{supply}]`.
3. В PATCH альтернативы либо не слать `pool` вовсе, либо слать его с `id`
   каждого члена.
4. Дописать `/pool/{supply_id}` в шесть маршрутов переходов и в четыре маршрута
   ревизии.
5. Добавить UI добавления и удаления поставщика в пул, запретить удаление
   последнего.
6. Публичные карточки: перечитать `details` по §9, у train и flight `hop`
   переехал внутрь элемента пула.
7. Обработать три новые ошибки из §11.

---

## 13. Чего пока нет

Сплит группы по членам пула на стороне брони (сколько человек в каком отеле) в
этот контракт не входит: оператор видит пул и его цену, но распределение мест и
отдельная оплата каждому поставщику появятся отдельным контрактом. Пока платёж
поставщику при подтверждении брони заводится на первого члена пула.
