import { createMockIdSequence } from "@/shared/api";

import { findProduct } from "@/entities/supplier/mock/supplier.store";

import type {
	TMultiEventReadBackend,
	TTourEventBackendResponce
} from "../types";

/** Одна опция события (элемент multi-события или сама single-опция) */
export type TEventOptionMock = TMultiEventReadBackend["details"][number];
export type TEventOptionTyp = TEventOptionMock["typ"];
export type TPoolMemberMock = TEventOptionMock["details"]["pool"][number];

type TRecord = Record<string, unknown>;

const asRecord = (value: unknown) => (value ?? {}) as TRecord;

export const eventMockIds = createMockIdSequence("b400", 1);

/** План события по умолчанию для каждого типа */
const DEFAULT_PLANS: Record<TEventOptionTyp, () => TRecord> = {
	activity: () => ({}),
	ref: () => ({}),
	housing: () => ({}),
	flight: () => ({}),
	train: () => ({}),
	guide: () => ({}),
	supplementary: () => ({}),
	transfer: () => ({ typ: null, departure: null, arrival: null }),
	bus: () => ({ legs: [] })
};

const fixedCharge = (val: number) => ({
	typ: "fixed" as const,
	cost: { val },
	fees: null,
	extra_costs: [],
	markup: null
});

/** Inline-spec по умолчанию: минимально валидная read-модель для каждого типа */
const DEFAULT_SPECS: Record<TEventOptionTyp, (name: string) => TRecord> = {
	activity: (name) => ({
		sub_typ: "sightseeing",
		images: [],
		name,
		location: null,
		offerings: []
	}),
	housing: (name) => ({
		pricing: "per_room",
		images: [],
		name,
		location: null,
		stars: null,
		typs: [],
		amenities: [],
		policy: null,
		categories: []
	}),
	flight: (name) => ({
		pricing: "whole",
		images: [],
		name,
		legs: [],
		charge: fixedCharge(0),
		fares: []
	}),
	train: (name) => ({
		pricing: "whole",
		images: [],
		name,
		legs: [],
		charge: fixedCharge(0),
		fares: []
	}),
	transfer: (name) => ({
		pricing: "whole",
		images: [],
		name,
		charge: fixedCharge(0),
		cars: []
	}),
	bus: (name) => ({
		pricing: "whole",
		images: [],
		name,
		charge: fixedCharge(0),
		vehicles: []
	}),
	guide: (name) => ({ name, typ_tiers: [], categories: [] }),
	ref: () => ({}),
	supplementary: () => ({ item: [] })
};

/** Product-supply из стора поставщиков; spec берётся из продукта */
export const createProductMember = (
	productId: string,
	isMain: boolean,
	id = eventMockIds.next(),
	scope: unknown = { typ: "all" }
): TPoolMemberMock => {
	const product = findProduct(productId);
	return {
		id,
		is_main: isMain,
		supply: {
			source: "product",
			product_id: productId,
			supplier: {
				id: product?.supplier_id ?? "",
				name: product?.supplier_name ?? ""
			},
			scope,
			override: null
		},
		spec: structuredClone(product?.spec ?? {})
	} as unknown as TPoolMemberMock;
};

export const createInlineMember = (
	typ: TEventOptionTyp,
	name: string,
	isMain: boolean,
	spec?: unknown,
	supplierId: string | null = null,
	id = eventMockIds.next()
): TPoolMemberMock =>
	({
		id,
		is_main: isMain,
		supply: { source: "inline", supplier_id: supplierId },
		spec: { ...DEFAULT_SPECS[typ](name), ...asRecord(spec) }
	}) as unknown as TPoolMemberMock;

/** Участник пула из write-тела (ActivityMemberWrite, HousingMemberNew, …) */
export const normalizeMember = (
	typ: TEventOptionTyp,
	member: unknown,
	isMain: boolean
): TPoolMemberMock => {
	const { id, supply } = asRecord(member);
	const source = asRecord(supply);
	const memberId = typeof id === "string" && id ? id : eventMockIds.next();

	if (source.source === "product" && typeof source.product_id === "string") {
		return createProductMember(
			source.product_id,
			isMain,
			memberId,
			source.scope
		);
	}
	return createInlineMember(
		typ,
		"",
		isMain,
		source.spec,
		(source.supplier_id as string | null | undefined) ?? null,
		memberId
	);
};

/** Опция события из write-тела (ActivityEvent, HousingEvent, …) */
export const normalizeEventOption = (
	input: unknown,
	id = eventMockIds.next()
): TEventOptionMock => {
	const option = asRecord(input);
	const typ = option.typ as TEventOptionTyp;
	const details = asRecord(option.details);
	const pool = Array.isArray(details.pool) ? details.pool : [];

	return {
		id,
		typ,
		name: (option.name as string | null | undefined) ?? null,
		description: (option.description as string | null | undefined) ?? null,
		package_id: (option.package_id as string | null | undefined) ?? null,
		details: {
			plan: { ...DEFAULT_PLANS[typ](), ...asRecord(details.plan) },
			pool: pool.map((member, index) =>
				normalizeMember(typ, member, index === 0)
			)
		}
	} as unknown as TEventOptionMock;
};

/** Глубокая копия опции с новыми id (копирование события/шаблона) */
export const cloneEventOption = (
	option: TEventOptionMock
): TEventOptionMock => {
	const copy = structuredClone(option);
	copy.id = eventMockIds.next();
	copy.details.pool.forEach((member) => {
		member.id = eventMockIds.next();
	});
	return copy;
};

/** Опции события: у single — сама опция, у multi — список */
export const getEventOptions = (
	event: TTourEventBackendResponce
): TEventOptionMock[] =>
	event.event.typ === "options"
		? event.event.details
		: [event.event as unknown as TEventOptionMock];

export const findEventOption = (
	event: TTourEventBackendResponce,
	optionId: string
) => getEventOptions(event).find((option) => option.id === optionId);

/** Узел spec по id (комната, машина) — для картинок узлов */
export const findSpecNode = (
	value: unknown,
	nodeId: string
): TRecord | undefined => {
	if (Array.isArray(value)) {
		for (const item of value) {
			const found = findSpecNode(item, nodeId);
			if (found) return found;
		}
	} else if (value && typeof value === "object") {
		const node = value as TRecord;
		if (node.id === nodeId) return node;
		for (const item of Object.values(node)) {
			const found = findSpecNode(item, nodeId);
			if (found) return found;
		}
	}
	return undefined;
};
