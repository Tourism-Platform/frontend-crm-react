import { createMockIdSequence, mockImageUrl, omitKeys } from "@/shared/api";

import {
	ENUM_TRANSLATION_STATE_BACKEND,
	type TEventImageSchemaBackend,
	type TPackageCreateBackend,
	type TPackageUpdateBackend,
	type TTourEventBackendResponce,
	type TTourOptionBackend,
	type TTourOptionCreateBackend,
	type TTourOptionUpdateBackend,
	type TTourPackageBackend
} from "../types";

import {
	type TEventOptionMock,
	type TPoolMemberMock,
	cloneEventOption,
	createInlineMember,
	createProductMember,
	eventMockIds,
	findEventOption,
	findSpecNode,
	getEventOptions,
	normalizeEventOption,
	normalizeMember
} from "./event-details.mock";
import {
	type IEventMockRecord,
	TOUR_EVENTS_MOCK,
	TOUR_OPTIONS_MOCK,
	TOUR_PACKAGES_MOCK
} from "./itinerary.mock";

type TRecord = Record<string, unknown>;
type TEvent = TTourEventBackendResponce;
type TMultiEvent = Extract<TEvent["event"], { typ: "options" }>;

const createOptionStore = () =>
	new Map(
		TOUR_OPTIONS_MOCK.map((option) => [option.id, structuredClone(option)])
	);
const createPackageStore = () =>
	new Map(TOUR_PACKAGES_MOCK.map((item) => [item.id, structuredClone(item)]));
const createEventStore = () =>
	new Map(
		TOUR_EVENTS_MOCK.map((record) => [
			record.event.id,
			structuredClone(record)
		])
	);

let optionStore = createOptionStore();
let packageStore = createPackageStore();
let eventStore = createEventStore();

const optionIds = createMockIdSequence("b300", TOUR_OPTIONS_MOCK.length + 1);
const packageIds = createMockIdSequence("b310", TOUR_PACKAGES_MOCK.length + 1);
const recordIds = createMockIdSequence("b431", 1);
const imageIds = createMockIdSequence("b440", 1);

// --- Опции тура ---

export const listTourOptions = (tourId: string) =>
	[...optionStore.values()].filter(
		(option) => option.tour_meta_id === tourId && !option.deleted_at
	);

export const getTourOption = (tourId: string, optionId: string) => {
	const option = optionStore.get(optionId);
	return option?.tour_meta_id === tourId && !option.deleted_at
		? option
		: undefined;
};

export const createTourOption = (
	tourId: string,
	body: TTourOptionCreateBackend | null
): TTourOptionBackend => {
	const option: TTourOptionBackend = {
		id: optionIds.next(),
		tour_meta_id: tourId,
		name: body?.name ?? null,
		description: body?.description ?? null,
		cover_image_path: null,
		deleted_at: null,
		markup: null,
		languages: null
	};
	optionStore.set(option.id, option);
	return option;
};

export const updateTourOption = (
	tourId: string,
	optionId: string,
	body: TTourOptionUpdateBackend
) => {
	const option = getTourOption(tourId, optionId);
	if (!option) return undefined;
	for (const [key, value] of Object.entries(body)) {
		if (value !== undefined) Object.assign(option, { [key]: value });
	}
	return option;
};

export const deleteTourOption = (tourId: string, optionId: string) => {
	const option = getTourOption(tourId, optionId);
	if (!option) return false;
	option.deleted_at = new Date().toISOString();
	return true;
};

export const setTourOptionCover = (
	tourId: string,
	optionId: string,
	hasCover: boolean
) => {
	const option = getTourOption(tourId, optionId);
	if (!option) return undefined;
	option.cover_image_path = hasCover
		? mockImageUrl(`option-cover-${optionId}-${Date.now()}`)
		: null;
	return option;
};

// --- Пакеты ---

export const listPackages = (optionId: string) =>
	[...packageStore.values()].filter(
		(item) => item.tour_option_id === optionId
	);

export const getPackage = (optionId: string, packageId: string) => {
	const item = packageStore.get(packageId);
	return item?.tour_option_id === optionId ? item : undefined;
};

export const createPackage = (
	optionId: string,
	body: TPackageCreateBackend
) => {
	const item = {
		id: packageIds.next(),
		tour_option_id: optionId,
		supplier_id: body.supplier_id ?? null,
		name: body.name,
		expenses: body.expenses ?? null,
		fees: body.fees ?? null,
		markup: body.markup ?? null
	} as TTourPackageBackend;
	packageStore.set(item.id, item);
	return item;
};

export const updatePackage = (
	optionId: string,
	packageId: string,
	body: TPackageUpdateBackend
) => {
	const item = getPackage(optionId, packageId);
	if (!item) return undefined;
	for (const [key, value] of Object.entries(body)) {
		if (value === undefined || (key === "name" && value === null)) continue;
		Object.assign(item, { [key]: value });
	}
	return item;
};

export const deletePackage = (optionId: string, packageId: string) =>
	Boolean(getPackage(optionId, packageId)) && packageStore.delete(packageId);

// --- События ---

const eventDay = (event: TEvent) => event.event.day;
const eventPosition = (event: TEvent) => event.event.position;

const optionEvents = (optionId: string) =>
	[...eventStore.values()].filter((record) => record.optionId === optionId);

export const listTourEvents = (optionId: string) =>
	optionEvents(optionId)
		.map((record) => record.event)
		.sort(
			(a, b) =>
				eventDay(a) - eventDay(b) || eventPosition(a) - eventPosition(b)
		);

export const getTourEvent = (optionId: string, eventId: string) => {
	const record = eventStore.get(eventId);
	return record?.optionId === optionId ? record.event : undefined;
};

/** Событие по id без опции тура (медиа событий адресуются только tourId) */
export const findTourEvent = (tourId: string, eventId: string) => {
	const record = eventStore.get(eventId);
	return record?.tourId === tourId ? record.event : undefined;
};

/** Ставит событие на день/позицию и перенумеровывает позиции дня */
const placeEvent = (
	record: IEventMockRecord,
	day: number,
	position: number
) => {
	record.event.event.day = day;
	const sameDay = optionEvents(record.optionId)
		.filter((item) => item !== record && eventDay(item.event) === day)
		.sort((a, b) => eventPosition(a.event) - eventPosition(b.event));
	sameDay.splice(Math.max(position - 1, 0), 0, record);
	sameDay.forEach((item, index) => {
		item.event.event.position = index + 1;
	});
};

const addEventRecord = (
	tourId: string,
	optionId: string,
	event: TEvent["event"]
) => {
	const record: IEventMockRecord = {
		tourId,
		optionId,
		event: {
			id: recordIds.next(),
			tour_option_id: optionId,
			event,
			translation: ENUM_TRANSLATION_STATE_BACKEND.SOURCE
		}
	};
	eventStore.set(record.event.id, record);
	placeEvent(record, event.day, event.position);
	return record.event;
};

/** Single-событие из опции и общих полей дня/позиции */
const toSingleEvent = (
	option: TEventOptionMock,
	day: number,
	position: number,
	isOptional = false,
	images: TEventImageSchemaBackend[] = []
) =>
	({
		...option,
		day,
		position,
		is_optional: isOptional,
		images
	}) as unknown as TEvent["event"];

const stripSlot = (event: TEvent["event"]): TEventOptionMock =>
	omitKeys(event as unknown as TRecord, [
		"day",
		"position",
		"is_optional",
		"images"
	]) as unknown as TEventOptionMock;

export const createTourEvent = (
	tourId: string,
	optionId: string,
	body: unknown
) => {
	const input = (body ?? {}) as TRecord;
	const day = Number(input.day ?? 1);
	const position = Number(input.position ?? 1);
	const isOptional = Boolean(input.is_optional);

	if (input.typ === "options") {
		const details = Array.isArray(input.details) ? input.details : [];
		return addEventRecord(tourId, optionId, {
			typ: "options",
			day,
			position,
			is_optional: isOptional,
			images: [],
			details: details.map((option) => normalizeEventOption(option))
		});
	}
	return addEventRecord(
		tourId,
		optionId,
		toSingleEvent(normalizeEventOption(input), day, position, isOptional)
	);
};

/** Копия события в ту же опцию тура (по умолчанию — следом за исходным) */
export const copyTourEvent = (
	tourId: string,
	optionId: string,
	source: TEvent,
	day?: number | null,
	position?: number | null
) => {
	const copy = structuredClone(source.event);
	if (copy.typ === "options") {
		copy.details = copy.details.map(cloneEventOption);
	} else {
		Object.assign(copy, cloneEventOption(stripSlot(copy)));
	}
	copy.day = day ?? source.event.day;
	copy.position = position ?? source.event.position + 1;
	return addEventRecord(tourId, optionId, copy);
};

/** Событие из шаблона библиотеки */
export const createEventFromTemplate = (
	tourId: string,
	optionId: string,
	template: TEventOptionMock,
	day: number,
	position: number,
	isOptional = false
) =>
	addEventRecord(
		tourId,
		optionId,
		toSingleEvent(cloneEventOption(template), day, position, isOptional)
	);

export const deleteTourEvent = (optionId: string, eventId: string) =>
	Boolean(getTourEvent(optionId, eventId)) && eventStore.delete(eventId);

export const reorderTourEvent = (
	optionId: string,
	eventId: string,
	day: number,
	position: number
) => {
	const record = eventStore.get(eventId);
	if (record?.optionId !== optionId) return undefined;
	placeEvent(record, day, position);
	return record.event;
};

export const setTourEventOptional = (
	optionId: string,
	eventId: string,
	isOptional: boolean
) => {
	const event = getTourEvent(optionId, eventId);
	if (!event) return undefined;
	event.event.is_optional = isOptional;
	return event;
};

/** Single → multi: опция переезжает в details */
const ensureMulti = (event: TEvent): TMultiEvent => {
	if (event.event.typ === "options") return event.event;
	const { day, position, is_optional, images } = event.event;
	event.event = {
		typ: "options",
		day,
		position,
		is_optional,
		images,
		details: [stripSlot(event.event)]
	};
	return event.event;
};

export const reorderEventOptions = (event: TEvent, order: string[]) => {
	if (event.event.typ !== "options") return event;
	const rank = (id: string) => {
		const index = order.indexOf(id);
		return index === -1 ? order.length : index;
	};
	event.event.details.sort((a, b) => rank(a.id) - rank(b.id));
	return event;
};

export const addEventOption = (event: TEvent, body: unknown) => {
	ensureMulti(event).details.push(normalizeEventOption(body));
	return event;
};

export const updateEventOption = (
	event: TEvent,
	optionId: string,
	body: unknown
) => {
	const option = findEventOption(event, optionId);
	if (!option) return undefined;

	const update = (body ?? {}) as TRecord;
	for (const key of ["name", "description", "package_id"] as const) {
		if (update[key] !== undefined)
			Object.assign(option, { [key]: update[key] });
	}
	const details = (update.details ?? {}) as TRecord;
	if (details.plan) {
		option.details.plan = {
			...option.details.plan,
			...(details.plan as TRecord)
		} as never;
	}
	return event;
};

/** Удаление опции: у single-события нельзя */
export const deleteEventOption = (event: TEvent, optionId: string) => {
	if (event.event.typ !== "options") return undefined;
	const before = event.event.details.length;
	event.event.details = event.event.details.filter(
		(option) => option.id !== optionId
	);
	return event.event.details.length === before ? undefined : event;
};

/** Смена типа опции: id сохраняется, содержимое — из тела */
export const retypeEventOption = (
	event: TEvent,
	optionId: string,
	body: unknown
) => {
	const option = findEventOption(event, optionId);
	if (!option) return undefined;

	const next = normalizeEventOption(body, option.id);
	if (event.event.typ === "options") {
		event.event.details = event.event.details.map((item) =>
			item.id === optionId ? next : item
		);
	} else {
		const { day, position, is_optional, images } = event.event;
		event.event = toSingleEvent(next, day, position, is_optional, images);
	}
	return event;
};

export const moveOptionToSingle = (
	record: IEventMockRecord,
	optionId: string,
	day?: number,
	position?: number
) => {
	const source = record.event;
	if (source.event.typ !== "options") return undefined;
	const option = source.event.details.find((item) => item.id === optionId);
	if (!option) return undefined;

	source.event.details = source.event.details.filter(
		(item) => item.id !== optionId
	);
	const newEvent = addEventRecord(
		record.tourId,
		record.optionId,
		toSingleEvent(
			option,
			day ?? source.event.day,
			position ?? source.event.position + 1
		)
	);
	return { new_event: newEvent, source_event: source };
};

export const moveEventToMulti = (
	optionId: string,
	eventId: string,
	targetEventId: string,
	optionPosition?: number
) => {
	const source = getTourEvent(optionId, eventId);
	const target = getTourEvent(optionId, targetEventId);
	if (!source || !target || source === target) return undefined;

	const moved = getEventOptions(source);
	const details = ensureMulti(target).details;
	details.splice(
		Math.min(Math.max(optionPosition ?? details.length, 0), details.length),
		0,
		...moved
	);
	eventStore.delete(eventId);
	return { target_event: target, removed_event_id: eventId };
};

export const getEventRecord = (optionId: string, eventId: string) => {
	const record = eventStore.get(eventId);
	return record?.optionId === optionId ? record : undefined;
};

// --- Пул поставщиков опции события ---

const getPool = (event: TEvent, optionId: string) =>
	findEventOption(event, optionId)?.details.pool as
		| TPoolMemberMock[]
		| undefined;

const findMember = (event: TEvent, optionId: string, supplyId: string) =>
	getPool(event, optionId)?.find((member) => member.id === supplyId);

const supplyOf = (member: TPoolMemberMock) =>
	member.supply as unknown as TRecord;

export const addPoolMember = (
	event: TEvent,
	optionId: string,
	body: unknown
) => {
	const option = findEventOption(event, optionId);
	if (!option) return undefined;
	const pool = option.details.pool as TPoolMemberMock[];
	pool.push(normalizeMember(option.typ, body, pool.length === 0));
	return event;
};

export const updatePoolMember = (
	event: TEvent,
	optionId: string,
	supplyId: string,
	body: unknown
) => {
	const member = findMember(event, optionId, supplyId);
	if (!member) return undefined;
	const update = (body ?? {}) as TRecord;
	if (update.spec) member.spec = update.spec as never;
	if (
		update.supplier_id !== undefined &&
		supplyOf(member).source === "inline"
	) {
		supplyOf(member).supplier_id = update.supplier_id;
	}
	return event;
};

export const removePoolMember = (
	event: TEvent,
	optionId: string,
	supplyId: string
) => {
	const option = findEventOption(event, optionId);
	const pool = option?.details.pool as TPoolMemberMock[] | undefined;
	if (!option || !pool?.some((member) => member.id === supplyId))
		return undefined;

	const next = pool.filter((member) => member.id !== supplyId);
	if (next.length && !next.some((member) => member.is_main))
		next[0].is_main = true;
	option.details.pool = next as never;
	return event;
};

export const setPoolMemberMain = (
	event: TEvent,
	optionId: string,
	supplyId: string
) => {
	const pool = getPool(event, optionId);
	if (!pool?.some((member) => member.id === supplyId)) return undefined;
	pool.forEach((member) => {
		member.is_main = member.id === supplyId;
	});
	return event;
};

/** Изменение product-supply: override, scope */
export const patchProductSupply = (
	event: TEvent,
	optionId: string,
	supplyId: string,
	patch: TRecord
) => {
	const member = findMember(event, optionId, supplyId);
	if (!member || supplyOf(member).source !== "product") return undefined;
	Object.assign(supplyOf(member), patch);
	return event;
};

/** Inline → product (attach) или смена продукта (relink) */
export const linkPoolMemberProduct = (
	event: TEvent,
	optionId: string,
	supplyId: string,
	productId: string,
	scope?: unknown
) => {
	const pool = getPool(event, optionId);
	const index = pool?.findIndex((member) => member.id === supplyId) ?? -1;
	if (!pool || index === -1) return undefined;
	pool[index] = createProductMember(
		productId,
		pool[index].is_main,
		supplyId,
		scope
	);
	return event;
};

/** Product → inline: spec оставляем или сбрасываем */
export const detachPoolMemberProduct = (
	event: TEvent,
	optionId: string,
	supplyId: string,
	keepSpec: boolean
) => {
	const option = findEventOption(event, optionId);
	const pool = option?.details.pool as TPoolMemberMock[] | undefined;
	const index = pool?.findIndex((member) => member.id === supplyId) ?? -1;
	if (!option || !pool || index === -1) return undefined;

	const member = pool[index];
	pool[index] = createInlineMember(
		option.typ,
		"",
		member.is_main,
		keepSpec ? member.spec : undefined,
		null,
		supplyId
	);
	return event;
};

// --- Картинки события ---

export const listEventImages = (event: TEvent) =>
	event.event.images.map((image) => ({ ...image, event_id: event.id }));

export const addEventImages = (event: TEvent, count: number) => {
	const images = event.event.images;
	const created = Array.from({ length: Math.max(count, 1) }, (_, index) => {
		const id = imageIds.next();
		return {
			id,
			image_path: mockImageUrl(`event-image-${id}`),
			is_primary: images.length === 0 && index === 0
		};
	});
	images.push(...created);
	return created.map((image) => ({ ...image, event_id: event.id }));
};

export const deleteEventImage = (event: TEvent, imageId: string) => {
	const next = event.event.images.filter((image) => image.id !== imageId);
	if (next.length === event.event.images.length) return false;
	if (next.length && !next.some((image) => image.is_primary))
		next[0].is_primary = true;
	event.event.images = next;
	return true;
};

export const setPrimaryEventImage = (event: TEvent, imageId: string) => {
	if (!event.event.images.some((image) => image.id === imageId)) return false;
	event.event.images.forEach((image) => {
		image.is_primary = image.id === imageId;
	});
	return true;
};

type TImageNode = {
	images?: { id?: string; image_path: string; is_primary?: boolean }[];
};

/** Узел spec события (комната, машина) с массивом картинок */
export const findEventNode = (event: TEvent, nodeId: string) => {
	const node = findSpecNode(getEventOptions(event), nodeId) as
		| TImageNode
		| undefined;
	if (node) node.images ??= [];
	return node;
};

export const addNodeImage = (node: TImageNode) => {
	const id = imageIds.next();
	const image = {
		id,
		image_path: mockImageUrl(`event-node-image-${id}`),
		is_primary: !node.images?.length
	};
	node.images?.push(image);
	return image;
};

export const resetItineraryStore = () => {
	optionStore = createOptionStore();
	packageStore = createPackageStore();
	eventStore = createEventStore();
	optionIds.reset(TOUR_OPTIONS_MOCK.length + 1);
	packageIds.reset(TOUR_PACKAGES_MOCK.length + 1);
	recordIds.reset(1);
	imageIds.reset(1);
	eventMockIds.reset(1);
};
