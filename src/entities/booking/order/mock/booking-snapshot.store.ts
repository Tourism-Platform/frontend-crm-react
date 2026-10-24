import { ENUM_CURRENCY_BACKEND } from "@/entities/commission/types/currency.types";
import {
	type TEventOptionMock,
	cloneEventOption,
	createProductMember,
	eventMockIds,
	findEventOption,
	getEventOptions,
	normalizeEventOption,
	normalizeMember
} from "@/entities/tour/itinerary/mock/event-details.mock";
import {
	getTourOption,
	listPackages,
	listTourEvents
} from "@/entities/tour/itinerary/mock/itinerary.store";
import {
	ENUM_BREAKDOWN_LINE_KIND_BACKEND,
	ENUM_EXPENSE_TYPE_BACKEND,
	ENUM_TRANSLATION_STATE_BACKEND
} from "@/entities/tour/itinerary/types/itinerary-backend-enum.types";
import { ENUM_LANGUAGES_BACKEND } from "@/entities/tour/landing/types/languages.types";
import {
	getTour,
	getTourFinancials
} from "@/entities/tour/tour/mock/tour.store";

import {
	ENUM_AVAILABILITY_STATUS_BACKEND,
	type ENUM_AVAILABILITY_STATUS_BACKEND_TYPE,
	ENUM_EDIT_OP_BACKEND,
	type ENUM_EDIT_OP_BACKEND_TYPE,
	type TEventBreakdownSchemaOutputBackend,
	type TEventEditOpOutputBackend,
	type TOperatorItineraryResponseBackend,
	type TOrderTourEventSchemaOutputBackend,
	type TRevisionPreviewBackend
} from "../types";

import {
	MOCK_TOUR_ID,
	MOCK_TOUR_OPTION_ID
} from "./booking-order.mock.constants";
import { getBookingOrderDetail } from "./booking-order.store";

type TRecord = Record<string, unknown>;
type TSnapshotEvent = TOrderTourEventSchemaOutputBackend;

interface IBookingSnapshot {
	events: TSnapshotEvent[];
	edits: TEventEditOpOutputBackend[];
}

let snapshots = new Map<string, IBookingSnapshot>();

const getOptionId = (bookingId: string) => {
	const optionId = getBookingOrderDetail(bookingId)?.order.tour_option_id;
	return optionId && listTourEvents(optionId).length
		? optionId
		: MOCK_TOUR_OPTION_ID;
};

/** Снапшот маршрута брони: копия событий опции тура на момент первого обращения */
const getSnapshot = (bookingId: string): IBookingSnapshot | undefined => {
	if (!getBookingOrderDetail(bookingId)) return undefined;

	let snapshot = snapshots.get(bookingId);
	if (!snapshot) {
		snapshot = {
			events: listTourEvents(getOptionId(bookingId)).map((event) => ({
				...structuredClone(event),
				origin_event_id: event.id
			})),
			edits: []
		};
		snapshots.set(bookingId, snapshot);
	}
	return snapshot;
};

export const getSnapshotEvents = (bookingId: string) =>
	getSnapshot(bookingId)?.events ?? [];

const money = (val: number) => ({ val, currency: ENUM_CURRENCY_BACKEND.USD });

/** Детерминированная цена события: зависит от его позиции в маршруте */
const eventCost = (index: number, pax: number) =>
	(index + 1) * 40 * Math.max(pax, 1);

const breakdownLine = (label: string | null, cost: number) => ({
	kind: ENUM_BREAKDOWN_LINE_KIND_BACKEND.UNIT,
	label,
	unit_id: null,
	supply_id: null,
	pricing: ENUM_EXPENSE_TYPE_BACKEND.FIXED,
	rate: null,
	unit_cost: money(cost),
	quantity: 1,
	pax: null,
	duration: null,
	fx_rate: null,
	cost: money(cost),
	fee: money(0),
	markup: money(Math.round(cost * 0.15))
});

const eventLabel = (event: TSnapshotEvent) =>
	event.event.typ === "options"
		? (event.event.details[0]?.name ?? null)
		: event.event.name;

const buildBreakdown = (
	events: TSnapshotEvent[],
	pax: number
): TEventBreakdownSchemaOutputBackend[] =>
	events.map((event, index) => ({
		event_id: event.id,
		lines: [breakdownLine(eventLabel(event), eventCost(index, pax))],
		warnings: []
	}));

export const getRevisionPreview = (
	bookingId: string
): TRevisionPreviewBackend | undefined => {
	const snapshot = getSnapshot(bookingId);
	const detail = getBookingOrderDetail(bookingId);
	if (!snapshot || !detail) return undefined;

	const optionId = getOptionId(bookingId);
	const tour = getTour(MOCK_TOUR_ID);
	const option = tour && getTourOption(tour.id, optionId);
	const pax = detail.order.pax;
	const cost = snapshot.events.reduce(
		(sum, _, index) => sum + eventCost(index, pax),
		0
	);
	const financials = tour && getTourFinancials(tour.id);

	return {
		snapshot: {
			tour_meta: {
				id: tour?.id ?? MOCK_TOUR_ID,
				title: detail.tour.title,
				slug: tour?.slug ?? null,
				cover_image_path: tour?.cover_image_path ?? null,
				group_size: tour?.group_size ?? 10,
				days: detail.tour.days,
				nights: detail.tour.nights,
				duration_hours: detail.tour.duration_hours,
				age_from: tour?.age_from ?? null,
				age_to: tour?.age_to ?? null,
				typ: detail.tour.typ,
				status: tour?.status ?? ("published" as never),
				categories: tour?.categories ?? []
			},
			tour_option: {
				id: optionId,
				name: option?.name ?? null,
				description: option?.description ?? null,
				cover_image_path: option?.cover_image_path ?? null,
				markup: option?.markup ?? null
			},
			tour_financial_settings: financials
				? {
						currency_type: financials.currency_type,
						markup: financials.markup,
						foc: financials.foc
					}
				: null,
			events: snapshot.events,
			display_lang: ENUM_LANGUAGES_BACKEND.ENGLISH,
			events_localized: null,
			packages: listPackages(optionId),
			operator_financials: null,
			fx_margin: "0.02",
			fx_rates: [],
			agency_discount: null
		},
		cost: cost.toFixed(2),
		revenue: (cost * 1.15).toFixed(2),
		breakdown: buildBreakdown(snapshot.events, pax)
	};
};

export const listRevisionEdits = (bookingId: string) =>
	getSnapshot(bookingId)?.edits ?? [];

const recordEdit = (
	snapshot: IBookingSnapshot,
	op: ENUM_EDIT_OP_BACKEND_TYPE,
	targetId: string | null,
	event: TSnapshotEvent | null,
	extra: Partial<TEventEditOpOutputBackend> = {}
) => {
	snapshot.edits.push({
		op,
		seq: snapshot.edits.length + 1,
		at: new Date().toISOString(),
		target_id: targetId,
		event: event ? structuredClone(event) : null,
		override: null,
		option_index: null,
		supply_id: null,
		actor_id: null,
		actor_name: "Mock Operator",
		...extra
	});
};

const toSnapshotEvent = (body: unknown, id = eventMockIds.next()) => {
	const input = (body ?? {}) as TRecord;
	const slot = {
		day: Number(input.day ?? 1),
		position: Number(input.position ?? 1),
		is_optional: Boolean(input.is_optional),
		images: []
	};
	const event =
		input.typ === "options"
			? {
					...slot,
					typ: "options",
					details: (Array.isArray(input.details)
						? input.details
						: []
					).map((option) => normalizeEventOption(option))
				}
			: { ...normalizeEventOption(input), ...slot };

	return {
		id,
		tour_option_id: null,
		event,
		translation: ENUM_TRANSLATION_STATE_BACKEND.SOURCE,
		origin_event_id: null
	} as unknown as TSnapshotEvent;
};

/** Мутация снапшота; undefined — бронь или событие не найдены */
const mutate = (
	bookingId: string,
	run: (snapshot: IBookingSnapshot) => boolean
): TRevisionPreviewBackend | undefined => {
	const snapshot = getSnapshot(bookingId);
	if (!snapshot || !run(snapshot)) return undefined;
	return getRevisionPreview(bookingId);
};

const findSnapshotEvent = (snapshot: IBookingSnapshot, eventId: string) =>
	snapshot.events.find((event) => event.id === eventId);

export const addRevisionEvent = (bookingId: string, body: unknown) =>
	mutate(bookingId, (snapshot) => {
		const event = toSnapshotEvent(body);
		snapshot.events.push(event);
		recordEdit(snapshot, ENUM_EDIT_OP_BACKEND.CREATE, event.id, event);
		return true;
	});

export const updateRevisionEvent = (
	bookingId: string,
	eventId: string,
	body: unknown
) =>
	mutate(bookingId, (snapshot) => {
		const index = snapshot.events.findIndex(
			(event) => event.id === eventId
		);
		if (index === -1) return false;
		const next = {
			...toSnapshotEvent(body, eventId),
			origin_event_id: snapshot.events[index].origin_event_id
		};
		snapshot.events[index] = next;
		recordEdit(snapshot, ENUM_EDIT_OP_BACKEND.UPDATE, eventId, next);
		return true;
	});

export const removeRevisionEvent = (bookingId: string, eventId: string) =>
	mutate(bookingId, (snapshot) => {
		const before = snapshot.events.length;
		snapshot.events = snapshot.events.filter(
			(event) => event.id !== eventId
		);
		recordEdit(snapshot, ENUM_EDIT_OP_BACKEND.DELETE, eventId, null);
		return snapshot.events.length !== before;
	});

/** Копия события брони (kind=revision) или события тура (kind=event) */
export const copyRevisionEvent = (
	bookingId: string,
	source: { kind: string; event_id: string }
) =>
	mutate(bookingId, (snapshot) => {
		const original =
			source.kind === "revision"
				? findSnapshotEvent(snapshot, source.event_id)
				: listTourEvents(getOptionId(bookingId)).find(
						(event) => event.id === source.event_id
					);
		if (!original) return false;

		const copy = structuredClone(original) as TSnapshotEvent;
		const options = getEventOptions(copy).map(cloneEventOption);
		if (copy.event.typ === "options") {
			copy.event.details = options;
		} else {
			Object.assign(copy.event, options[0]);
		}
		copy.id = eventMockIds.next();
		copy.origin_event_id = null;
		snapshot.events.push(copy);
		recordEdit(snapshot, ENUM_EDIT_OP_BACKEND.CREATE, copy.id, copy);
		return true;
	});

/** Опция события брони: event_option_id или индекс (по умолчанию первая) */
const resolveOption = (
	event: TSnapshotEvent,
	eventOptionId: string | null,
	optionIndex: number | null
) =>
	eventOptionId
		? findEventOption(event as never, eventOptionId)
		: getEventOptions(event as never)[optionIndex ?? 0];

interface IRevisionTarget {
	bookingId: string;
	eventId: string;
	eventOptionId: string | null;
	optionIndex: number | null;
}

const mutateOption = (
	{ bookingId, eventId, eventOptionId, optionIndex }: IRevisionTarget,
	run: (
		option: TEventOptionMock,
		snapshot: IBookingSnapshot,
		event: TSnapshotEvent
	) => boolean
) =>
	mutate(bookingId, (snapshot) => {
		const event = findSnapshotEvent(snapshot, eventId);
		const option =
			event && resolveOption(event, eventOptionId, optionIndex);
		return Boolean(event && option && run(option, snapshot, event));
	});

export const addRevisionPoolMember = (target: IRevisionTarget, body: unknown) =>
	mutateOption(target, (option, snapshot, event) => {
		const pool = option.details.pool as unknown[];
		pool.push(normalizeMember(option.typ, body, pool.length === 0));
		recordEdit(snapshot, ENUM_EDIT_OP_BACKEND.UPDATE, event.id, event);
		return true;
	});

export const removeRevisionPoolMember = (
	target: IRevisionTarget,
	supplyId: string
) =>
	mutateOption(target, (option, snapshot, event) => {
		const pool = option.details.pool as { id: string; is_main: boolean }[];
		const next = pool.filter((member) => member.id !== supplyId);
		if (next.length === pool.length) return false;
		if (next.length && !next.some((member) => member.is_main))
			next[0].is_main = true;
		option.details.pool = next as never;
		recordEdit(snapshot, ENUM_EDIT_OP_BACKEND.UPDATE, event.id, event, {
			supply_id: supplyId
		});
		return true;
	});

const findPoolIndex = (option: TEventOptionMock, supplyId: string) =>
	(option.details.pool as { id: string }[]).findIndex(
		(member) => member.id === supplyId
	);

export const setRevisionPoolMemberProduct = (
	target: IRevisionTarget,
	supplyId: string,
	productId: string,
	scope?: unknown
) =>
	mutateOption(target, (option, snapshot, event) => {
		const index = findPoolIndex(option, supplyId);
		if (index === -1) return false;
		const pool = option.details.pool as unknown as { is_main: boolean }[];
		pool[index] = createProductMember(
			productId,
			pool[index].is_main,
			supplyId,
			scope
		);
		recordEdit(snapshot, ENUM_EDIT_OP_BACKEND.UPDATE, event.id, event, {
			supply_id: supplyId
		});
		return true;
	});

export const clearRevisionPoolMemberProduct = (
	target: IRevisionTarget,
	supplyId: string
) =>
	mutateOption(target, (option, snapshot, event) => {
		const index = findPoolIndex(option, supplyId);
		if (index === -1) return false;
		const pool = option.details.pool as unknown as TRecord[];
		const member = pool[index];
		pool[index] = {
			...member,
			supply: { source: "inline", supplier_id: null }
		};
		recordEdit(snapshot, ENUM_EDIT_OP_BACKEND.UPDATE, event.id, event, {
			supply_id: supplyId
		});
		return true;
	});

export const setRevisionPoolMemberOverride = (
	target: IRevisionTarget,
	supplyId: string,
	override: unknown
) =>
	mutateOption(target, (option, snapshot, event) => {
		const index = findPoolIndex(option, supplyId);
		if (index === -1) return false;
		const supply = (
			option.details.pool[index] as unknown as { supply: TRecord }
		).supply;
		if (supply.source !== "product") return false;
		supply.override = override;
		recordEdit(snapshot, ENUM_EDIT_OP_BACKEND.OVERRIDE, event.id, event, {
			supply_id: supplyId,
			override: override as never
		});
		return true;
	});

// --- Доступность (availability) ---

interface IAvailabilityRow {
	id: string;
	booking_id: string;
	event_id: string;
	option_index: number;
	status: ENUM_AVAILABILITY_STATUS_BACKEND_TYPE;
	event_name: string | null;
	event_typ: string | null;
}

let availability = new Map<string, IAvailabilityRow[]>();

/** Строки доступности по событиям снапшота: single — выбран, multi — ждут решения */
export const getAvailabilityRows = (bookingId: string) => {
	let rows = availability.get(bookingId);
	if (!rows) {
		rows = getSnapshotEvents(bookingId).flatMap((event, eventIndex) =>
			getEventOptions(event as never).map((option, optionIndex) => ({
				id: `${event.id.slice(0, 24)}${String(eventIndex * 10 + optionIndex).padStart(12, "0")}`,
				booking_id: bookingId,
				event_id: event.id,
				option_index: optionIndex,
				status:
					event.event.typ === "options"
						? ENUM_AVAILABILITY_STATUS_BACKEND.PENDING
						: ENUM_AVAILABILITY_STATUS_BACKEND.SELECTED,
				event_name: option.name,
				event_typ: option.typ
			}))
		);
		availability.set(bookingId, rows);
	}
	return rows;
};

export const applyAvailability = (
	bookingId: string,
	eventId: string,
	optionIndex: number,
	status: ENUM_AVAILABILITY_STATUS_BACKEND_TYPE
) => {
	const rows = getAvailabilityRows(bookingId);
	const row = rows.find(
		(item) => item.event_id === eventId && item.option_index === optionIndex
	);
	if (!row) return undefined;

	row.status = status;
	// В multi-событии выбранной может быть только одна опция
	if (status === ENUM_AVAILABILITY_STATUS_BACKEND.SELECTED) {
		rows.filter(
			(item) => item.event_id === eventId && item !== row
		).forEach((item) => {
			item.status = ENUM_AVAILABILITY_STATUS_BACKEND.DESELECTED;
		});
	}
	return row;
};

// --- Маршрут для оператора ---

const addDays = (date: string, days: number) =>
	new Date(Date.parse(date) + days * 86_400_000).toISOString().slice(0, 10);

const costRange = (val: number) => ({
	min: money(val),
	max: money(Math.round(val * 1.2))
});

export const getOperatorItinerary = (
	bookingId: string
): TOperatorItineraryResponseBackend | undefined => {
	const detail = getBookingOrderDetail(bookingId);
	if (!detail) return undefined;

	const { order } = detail;
	const rows = getAvailabilityRows(bookingId);
	const events = getSnapshotEvents(bookingId).map((event, index) => {
		const cost = eventCost(index, order.pax);
		const selected = rows.find(
			(row) =>
				row.event_id === event.id &&
				row.status === ENUM_AVAILABILITY_STATUS_BACKEND.SELECTED
		);
		return {
			event_id: event.id,
			tour_option_id: order.tour_option_id,
			date: addDays(order.date, event.event.day - 1),
			event: event.event,
			availability:
				selected?.status ?? ENUM_AVAILABILITY_STATUS_BACKEND.PENDING,
			selected_option_index: selected?.option_index ?? null,
			guide_typ: null,
			billed_via_package_id: null,
			cost: costRange(cost),
			markup: costRange(Math.round(cost * 0.15)),
			fees: costRange(0),
			breakdown: {
				min: [breakdownLine(eventLabel(event), cost)],
				max: [breakdownLine(eventLabel(event), Math.round(cost * 1.2))]
			},
			warnings: []
		};
	});
	const total = events.reduce(
		(sum, _, index) => sum + eventCost(index, order.pax),
		0
	);

	return {
		booking_id: bookingId,
		order_number: order.order_number,
		date: order.date,
		pax: order.pax,
		currency: ENUM_CURRENCY_BACKEND.USD,
		display_lang: ENUM_LANGUAGES_BACKEND.ENGLISH,
		events,
		packages: listPackages(getOptionId(bookingId)).map((item) => ({
			package_id: item.id,
			name: item.name,
			cost: costRange(100),
			markup: costRange(15),
			fees: costRange(10),
			breakdown: { min: [], max: [] }
		})),
		cost: costRange(total),
		markup: costRange(Math.round(total * 0.15)),
		fees: costRange(0),
		total: costRange(Math.round(total * 1.15))
	};
};

export const resetBookingSnapshotStore = () => {
	snapshots = new Map();
	availability = new Map();
};
