# Контракт 4: где живёт цена — Product, Variant или unit

Ответ на аудит по `charge`. Проверено по текущему backend и OpenAPI (после правок из `fe3.1.md`). Только анализ, backend не менялся. Обозначения: `P = /supplier/{supplier_id}/product`.

Короткий ответ на главный вопрос: **да**. Backend уже представляет Product с несколькими вариантами, у каждого своя независимая цена, и FE меняет цену ровно одного варианта через `PATCH P/{product_id}/variant/{variant_id}`. Это верно для всех шести типов — в их **per-unit** режиме. Режим `whole` — не ограничение реализации, а второй доменный случай: «одна цена за весь продукт, варианты только описывают»; в нём у варианта цены нет по определению, и переход между режимами — явная операция `POST P/{product_id}/pricing`.

---

## 0. Два понятия

- `pricing` (у activity — `sub_typ`) — **режим**: какая сущность продаётся и потому несёт цену. Хранится на продукте, `PATCH P/{id}` его менять не может (409), меняется только `POST P/{id}/pricing`.
- `charge` / `rate` / `price` — **сумма** на той сущности, которую режим объявил продаваемой. Меняется там, где лежит: на варианте — через variant-роуты, на продукте — через `PATCH P/{id}`.

Что продаётся, решает режим:

```
per_fare / per_vehicle / per_car / per_car_category / per_room / activity
Product (pricing)
└── Variant (fare | vehicle | car | category | offering)
    └── charge          ← своя у каждого варианта; per_car_category: у каждого класса внутри car;
                          hotel per_room: у каждой room внутри category

whole
Product (pricing = whole)
├── charge | price      ← одна цена за leg / run / stay
└── Variant             ← без цены: только описание того, в чём едет / летит / спит группа
```

---

## 1. Единая доменная модель

Модель уже единая: **цена лежит на продаваемой единице, а режим говорит, какая единица продаётся.**

- В per-unit режимах продаваемая единица — вариант (или node внутри него у hotel и per_car_category). Это ровно модель `Product → Variant → Charge` из запроса, и она поддержана для всех типов.
- В `whole` продаваемая единица — сам продукт. Это подтверждается доменом, не только кодом: у каждого типа описание режима одно и то же — «leg / run / stay оплачивается один раз, сколько бы fares / vehicles / cars / rooms группа ни заняла; единицы только называют, в чём она едет». Бизнес-кейсы: чартерный рейс (весь борт), автобус на группу по фиксированной ставке независимо от подачи, аренда виллы/базы целиком. Ценообразование считает `whole` как одну сумму (min = max), а per-unit — как bin-packing по местам (bus, transfer, hotel) или как альтернативы min…max (fare, offering).
- Activity режима не имеет: offerings всегда с собственной ценой; `sub_typ` — что продаётся (food с меню или билет), не как считается.

Вывод: переносить `charge` на вариант в `whole` не нужно — это сделало бы `whole` неотличимым от per-unit. Нужно, чтобы FE трактовал `pricing` как переключатель редактора цен, а не как нюанс.

---

## 2. По каждому типу продукта

Формат: Product / Variant / несколько Variant / Charge сейчас / Charge должен быть / fixed / per_person / цена редактируется через.

**Hotel (`typ: "hotel"`, режимы `per_room` | `whole`)**
- Product — отель: `name`, `location`, `stars`, `typs`, `amenities`, `policy`, `pricing`.
- Variant — room category (`spec.categories[]`); внутри — rooms (`rooms[]`, node с `id`, images).
- Несколько категорий — да; несколько комнат в категории — да.
- Charge сейчас: `per_room` → `categories[].rooms[].rate {base, seasons[]}` (на **комнате**, не на категории); `whole` → `spec.price: StayRate {base, seasons[]}` на продукте, комнаты без цены.
- Должен быть: там же. Продаётся комната (группа раскладывается по комнатам) либо весь отель/вилла.
- fixed — да (`base.typ:"fixed"`); per_person — только в `whole` (`StayRate.base` = fixed | per_person | per_duration); на комнате — fixed | per_duration (за ночь), per_person на комнате нет: комната вмещает `pax`, цена не зависит от голов.
- Редактируется: `PATCH P/{pid}/variant/{vid}` с полным списком `rooms` категории (echo `id` каждой room, новый `rate` у нужной); другие категории не трогаются. `whole`: `PATCH P/{pid}` с `details.price`.

**Train (`typ: "train"`, режимы `per_fare` | `whole`)**
- Product — маршрут: `name`, `legs[]` (станции), `pricing`.
- Variant — fare class (`spec.fares[]`).
- Несколько — да.
- Charge сейчас: `per_fare` → `fares[].charge`; `whole` → `spec.charge` на продукте, fares без цены.
- Должен быть: там же.
- fixed — да; per_person — да (и на fare, и на whole).
- Редактируется: `PATCH P/{pid}/variant/{vid}` `{typ:"train", pricing:"per_fare", name, charge}` — только этот fare. `whole`: `PATCH P/{pid}` с `details.charge`.

**Flight (`typ: "flight"`, режимы `per_fare` | `whole`)**
- Идентично train; `legs[]` — рейсы (airline_code, flight_number, аэропорты).
- Пример из запроса Economy $300 / Business $700 / First $1200 = `per_fare`, три варианта, три `charge`, каждая правится своим `PATCH …/variant/{vid}`.

**Bus (`typ: "bus"`, режимы `per_vehicle` | `whole`)**
- Product — автопарк: `name`, `pricing`; маршрут — не продукта, а тура (в `plan` события).
- Variant — vehicle category (`spec.vehicles[]`: `body_type`, `pax`, `name`, `description`, images).
- Несколько — да.
- Charge сейчас: `per_vehicle` → `vehicles[].charge: FixedCharge`; `whole` → `spec.charge` на продукте.
- Должен быть: там же. Пример Sprinter $100 / Bus $180 / Coach $250 = `per_vehicle`.
- fixed — да; per_person — на vehicle **нет** (только `FixedCharge`: машина стоит фиксированно, группа раскладывается по местам); на `whole` — fixed | per_person.
- Редактируется: `PATCH P/{pid}/variant/{vid}` `{typ:"bus", pricing:"per_vehicle", name, body_type, pax, description?, charge}`. `whole`: `PATCH P/{pid}` с `details.charge`.

**Transfer (`typ: "transfer"`, режимы `per_car` | `per_car_category` | `whole`)**
- Product — автопарк: `name`, `pricing`.
- Variant — car (`spec.cars[]`: `body_type`, `pax`, …). В `per_car_category` внутри car — классы `categories[] {id, name, charge}` (economy / comfort / business одного кузова).
- Несколько car — да; несколько классов в car — да.
- Charge сейчас: `per_car` → `cars[].charge: FixedCharge`; `per_car_category` → `cars[].categories[].charge: FixedCharge` (продаётся класс, не car); `whole` → `spec.charge`.
- Должен быть: там же. Пример Sedan $30 / Minivan $50 / Bus $100 = `per_car`.
- fixed — да; per_person — на car/category нет (как у bus); на `whole` — fixed | per_person.
- Редактируется: `PATCH P/{pid}/variant/{vid}`: `per_car` — `{…, charge}`; `per_car_category` — `{…, categories:[{id?, name, charge}]}` (echo `id` класса, чтобы он остался тем же; только этот car). `whole`: `PATCH P/{pid}`.

**Activity (`typ: "activity"`, `sub_typ` вместо `pricing`; museum-supplier продаёт как activity)**
- Product — venue: `name`, `location`, `sub_typ`.
- Variant — offering (`spec.offerings[]`: set menu с `menu[]` у `food`, билет/сеанс у остальных).
- Несколько — да.
- Charge сейчас: всегда `offerings[].charge` — режима `whole` нет.
- Должен быть: там же.
- fixed — да; per_person — да.
- Редактируется: `PATCH P/{pid}/variant/{vid}` `{typ:"activity", name, charge, menu?}`.

Других типов продуктов нет. Guide / supplementary / information события продукта не имеют — цена лежит в самом событии.

---

## 3. Текущие схемы, определяющие `charge`

Имена — как в OpenAPI (read-схемы в сгенерированных типах с суффиксом `-Output`). `FixedCharge = {typ:"fixed", cost:{val, currency}, fees?, extra_costs?, markup?}`, `PerPersonCharge = {typ:"per_person", cost_per_person:{val, currency}, …}`, `DefaultChargeTypes = FixedCharge | PerPersonCharge`.

Bus
```ts
BusProductCreate  { typ:"bus", details: PerVehicleFleetCreate | WholeFleetCreate }
PerVehicleFleetCreate { pricing:"per_vehicle", name, vehicles:[PricedVehicleWrite { name, body_type, pax, description?, charge: FixedCharge }] }
WholeFleetCreate      { pricing:"whole", name, charge: DefaultChargeTypes, vehicles:[VehicleWrite { name, body_type, pax, description? }] }
PerVehicleBusDetails  { pricing:"per_vehicle", name }                               // PATCH product: без цен
WholeBusDetails       { pricing:"whole", name, charge: DefaultChargeTypes }        // PATCH product: цена продукта
PerVehicleBusVariantWrite { typ:"bus", pricing:"per_vehicle", name, body_type, pax, description?, charge: FixedCharge }
WholeBusVariantWrite      { typ:"bus", pricing:"whole",       name, body_type, pax, description? }   // charge отсутствует — по определению режима
BusProductRead.spec = PerVehicleFleet { pricing, name, images, vehicles:[PricedVehicle { id, …, charge }] }
                    | WholeFleet      { pricing, name, images, charge, vehicles:[Vehicle { id, … }] }
ToPerVehicle { typ:"bus", to:"per_vehicle", vehicles:[{ variant_id, charge: FixedCharge }] }
ToWholeFleet { typ:"bus", to:"whole", charge: DefaultChargeTypes }
```

Transfer
```ts
TransferProductCreate { typ:"transfer", details: WholeTransferCreate | PerCarTransferCreate | PerCarCategoryTransferCreate }
PerCarTransferCreate         { pricing:"per_car", name, cars:[PricedCarWrite { …, charge: FixedCharge }] }
PerCarCategoryTransferCreate { pricing:"per_car_category", name, cars:[CategorisedCarWrite { …, categories:[CarCategory { id?, name, charge: FixedCharge }] }] }
WholeTransferCreate          { pricing:"whole", name, charge: DefaultChargeTypes, cars:[CarWrite] }
PerCarTransferDetails / PerCarCategoryTransferDetails { pricing, name }            // PATCH product: без цен
WholeTransferDetails { pricing:"whole", name, charge: DefaultChargeTypes }
PerCarTransferVariantWrite         { typ:"transfer", pricing:"per_car", …, charge: FixedCharge }
PerCarCategoryTransferVariantWrite { typ:"transfer", pricing:"per_car_category", …, categories:[CarCategory] }
WholeTransferVariantWrite          { typ:"transfer", pricing:"whole", … }          // charge отсутствует
TransferProductRead.spec = PerCarTransfer { cars:[PricedCar { id, …, charge }] }
                         | PerCarCategoryTransfer { cars:[CategorisedCar { id, …, categories:[{ id, name, charge }] }] }
                         | WholeTransfer { charge, cars:[Car] }
ToPerCar { typ:"transfer", to:"per_car", cars:[{ variant_id, charge }] }
ToPerCarCategory { typ:"transfer", to:"per_car_category", cars:[{ variant_id, categories:[{ name, charge }] }] }   // классы минтятся заново
ToWholeTransfer { typ:"transfer", to:"whole", charge }
```

Train / Flight
```ts
TrainProductCreate { typ:"train", details: PerFareTrainCreate | WholeTrainCreate }   // Flight — те же формы с Flight*
PerFareTrainCreate { pricing:"per_fare", name, legs, fares:[FareCreate { name, charge: DefaultChargeTypes }] }
WholeTrainCreate   { pricing:"whole", name, legs, charge: DefaultChargeTypes, fares:[PlainFareCreate { name }] }
PerFareTrainDetails { pricing:"per_fare", name, legs }                              // PATCH product: без цен
WholeTrainDetails   { pricing:"whole", name, legs, charge }
PerFareTrainVariantWrite { typ:"train", pricing:"per_fare", name, charge: DefaultChargeTypes }
WholeTrainVariantWrite   { typ:"train", pricing:"whole", name }                    // charge отсутствует
TrainProductRead.spec = PerFareTrainRoute { fares:[PricedFare { id, name, charge }] } | WholeTrainRoute { charge, fares:[Fare { id, name }] }
ToPerFare { typ:"train"|"flight", to:"per_fare", fares:[{ variant_id, charge }] }
ToWholeRoute { typ:"train"|"flight", to:"whole", charge }
```

Hotel
```ts
HotelProductCreate { typ:"hotel", details: PerRoomHotelCreate | WholeHotelCreate }
PerRoomHotelCreate { pricing:"per_room", name, …, categories:[PricedCategoryWrite { name, rooms:[PricedRoomCreate { typ, pax, name?, description?, rate: RoomRate }] }] }
WholeHotelCreate   { pricing:"whole", name, …, price: StayRate, categories:[CategoryWrite { name, rooms:[RoomCreate] }] }
RoomRate { base: FixedCharge | RoomNightCharge, seasons:[{ from_date, to_date, charge }] }
StayRate { base: FixedCharge | PerPersonCharge | DurationCharge, seasons:[…] }
PerRoomHotelDetails { pricing:"per_room", name, … }                                // PATCH product: без цен
WholeHotelDetails   { pricing:"whole", name, …, price: StayRate }
PerRoomHotelVariantWrite { typ:"hotel", pricing:"per_room", name, rooms:[PricedRoomWrite { id?, typ, pax, name?, description?, rate }] }
WholeHotelVariantWrite   { typ:"hotel", pricing:"whole", name, rooms:[RoomWrite { id?, typ, pax, … }] }   // rate отсутствует
HotelProductRead.spec = PerRoomHotel { categories:[PricedCategory { id, name, rooms:[PricedRoom { id, …, rate }] }] }
                      | WholeHotel { price, categories:[Category { id, name, rooms:[Room] }] }
ToPerRoom { typ:"hotel", to:"per_room", rooms:[{ room_id, rate }] }
ToWholeHotel { typ:"hotel", to:"whole", price: StayRate }
```

Activity
```ts
ActivityProductCreate { typ:"activity", details: ActivityProductCreateDetails { sub_typ, name, location?, offerings:[ActivityVariantWrite] } }
ActivityProductDetails { sub_typ, name, location? }                                 // PATCH product: без цен
ActivityVariantWrite { typ:"activity", name, charge: DefaultChargeTypes, menu:[MenuItem] }   // всегда с ценой
ActivityProductRead.spec = FoodVenue { sub_typ:"food", offerings:[FoodOffering { id, name, charge, menu }] }
                         | GeneralVenue { sub_typ, offerings:[TicketedOffering { id, name, charge }] }
// pricing-switch нет; смена sub_typ — через PATCH product (409, если у тура есть override под старый sub_typ)
```

---

## 4. Проблемы текущей модели

Несоответствий требуемой модели `Product → Variant → Charge` нет: в каждом типе есть режим, где каждый вариант несёт свою цену, и правится независимо.

Что FE может принять за проблему, и что это на самом деле:

```text
Current:  WholeBusDetails.charge, WholeBusVariantWrite без charge
Required: без изменений
Not a problem: whole — «один run по одной цене, машины только описывают». Это второй доменный режим,
               а не недоделанный per_vehicle. Хотите Sprinter $100 / Bus $180 / Coach $250 —
               продукт должен быть per_vehicle; переход — POST …/pricing (ToPerVehicle со всеми ценами).
```
```text
Current:  PricedVehicle.charge, PricedCar.charge, CarCategory.charge — только FixedCharge
Required: без изменений для модели «у каждого варианта своя цена»
Note:     per_person на машине не поддержан намеренно: группа раскладывается по местам, машина
          стоит фиксированно. Если бизнесу нужен «за пассажира» — это отдельное решение (§5),
          не следствие вопроса про уровень charge.
```
```text
Current:  Hotel per_room — rate на room, не на category (variant)
Required: без изменений
Note:     продаваемая единица — комната; категория группирует комнаты. Правка цены одной комнаты
          идёт через PATCH variant категории с echo всех её rooms.
```
```text
Current:  нет endpoint'а «поменять только charge» — PATCH variant заменяет вариант целиком
Required: не обязательно
Note:     тело PATCH variant — имя + arm + цена (+ rooms/categories/menu); чтобы изменить цену,
          FE перечитывает вариант из GET и шлёт его же с новой ценой. Другие варианты не затрагиваются.
```

---

## 5. Требуемые изменения

Для модели «Product → Variants → у каждого своя цена, правится по одному» изменения **не требуются** ни в одной схеме:

```text
Bus:       PerVehicleBusVariantWrite.charge: FixedCharge            — уже per-variant
Flight:    PerFareFlightVariantWrite.charge: FixedCharge|PerPerson  — уже per-variant
Train:     PerFareTrainVariantWrite.charge:  FixedCharge|PerPerson  — уже per-variant
Transfer:  PerCarTransferVariantWrite.charge: FixedCharge; PerCarCategory…categories[].charge — уже per-unit
Activity:  ActivityVariantWrite.charge: FixedCharge|PerPerson       — уже per-variant, всегда
Hotel:     PerRoomHotelVariantWrite.rooms[].rate                    — уже per-room
Whole-*:   Variant без charge                                       — по определению режима, менять нельзя
```

Возможные расширения — только если бизнес их попросит, к теме уровня `charge` они не относятся:

```text
PricedVehicleWrite.charge / PricedCarWrite.charge / CarCategory.charge
  current:  FixedCharge
  possible: FixedCharge | PerPersonCharge   — «машина за пассажира»; требует решения, как bin-packing
                                              считает per_person на единицу с pax
Отдельный endpoint PATCH …/variant/{vid}/charge
  current:  нет; цена правится через полный PATCH variant
  possible: удобство, не необходимость
```

---

## 6. Endpoints

Уже подходят для цены **одного** варианта (остальные не затрагиваются):

- `PATCH P/{product_id}/variant/{variant_id}` — body `AnyVariantWrite` того же arm, что у продукта (иначе 409 «payload prices for an arm the product does not price by»). Bus/transfer per_car/train/flight/activity: новый `charge` в теле. Transfer per_car_category: `categories[]` с echo `id`. Hotel per_room: `rooms[]` с echo `id` и новым `rate`. → `AnyProductRead`.
- `POST P/{product_id}/variant` — новый вариант со своей ценой → `VariantCreated {variant_id, product}`.
- `DELETE P/{product_id}/variant/{variant_id}` — 409, если событие тура scoped на него или override называет его unit.

Цена продукта в `whole`:

- `PATCH P/{product_id}` — `details.charge` (bus/transfer/train/flight) или `details.price` (hotel). `pricing` в теле должен совпадать с текущим (иначе 409).

Смена режима:

- `POST P/{product_id}/pricing` — `PricingSwitchBody` (`typ` + `to` + все цены нового режима). Ничего не переносит автоматически: → per-unit требует цену **каждой** единицы (иначе 422 «pricing switch must price every unit of the product exactly once»), → whole **стирает** цены всех единиц и ставит одну на продукт. Refused 409 «pricing switch would orphan tour overrides», пока у какого-то тура стоит override под старый режим; тот же `to`, что уже стоит → 409. Индивидуальные цены вариантов при переходе в whole **теряются** — при обратном переходе их надо ввести заново (FE может подставить старые как default, если сохранил их до переключения).

Изменений endpoint'ов не требуется.

---

## 7. Backward compatibility

- Миграций (схемы или данных) не нужно: модель уже такая, данные уже в ней.
- Старые продукты остаются в своём режиме: `whole` — одна цена на продукте, per-unit — цены на вариантах/комнатах. «Product-level charge» существует только в `whole` и там он и должен быть; интерпретировать его как «цена каждого варианта» не нужно и неверно.
- Если у продукта в `whole` несколько вариантов и одна цена, а оператор хочет разные — это не миграция, а ввод данных: `POST …/pricing` с ценой для каждой единицы; общая цена — разумный default в форме.
- Цены не теряются ни при каком чтении; теряются только при явном переходе в `whole` (по определению режима), о чём FE должен предупредить.

---

## 8. OpenAPI contract

Изменений в контракт не требуется. Что FE должен зафиксировать в domain-модели:

- `Product.pricing` (`sub_typ` у activity) — переключатель: где редактируется цена. per-unit → редактор цен на уровне вариантов; `whole` → один редактор на продукте, у вариантов поля цены нет.
- Тело `PATCH …/variant/{vid}` всегда несёт `typ` и (кроме activity) `pricing`, равные продукту.
- Формы цены: `fixed` везде; `per_person` — fares, offerings, все `whole`-charges, `StayRate.base`; на vehicle/car/category — только `fixed`; на room — `fixed` | `per_duration` (за ночь) + `seasons[]`.
- `POST …/pricing` — единственный способ сменить режим; тело обязано перечислить все единицы; per-variant цены при переходе в `whole` стираются.
