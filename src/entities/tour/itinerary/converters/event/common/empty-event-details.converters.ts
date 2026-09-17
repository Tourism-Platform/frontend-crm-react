import { GeneralVenueInputSubTypEnum } from "@/shared/api";

import {
	ENUM_EVENT_BACKEND,
	type ENUM_EVENT_BACKEND_TYPE,
	type IEventProductLink,
	type TAddPoolMemberIntent,
	type TEventDetailsWriteBackend,
	type TEventPoolMemberNewBackend
} from "../../../types";

import { mapEventProductScopeToBackend } from "./event-product-link.converters";

const wrapInlinePool = (
	supply: NonNullable<TEventDetailsWriteBackend["pool"]>[number]["supply"]
): TEventDetailsWriteBackend =>
	({ pool: [{ supply }] }) as TEventDetailsWriteBackend;

/**
 * Minimal WRITE `details` for a palette / empty create (contract 6).
 *
 * A new option must state where its supply comes from. Product linking is
 * a later attach — the shell is always a one-member inline pool with the
 * smallest valid spec for that `typ`. `is_main` is never sent.
 * Multi slots (`options`) use `details: []` on create, not this helper.
 */
export const mapEmptyEventDetailsToWrite = (
	typ: ENUM_EVENT_BACKEND_TYPE
): TEventDetailsWriteBackend => {
	switch (typ) {
		case ENUM_EVENT_BACKEND.HOUSING:
			return wrapInlinePool({
				source: "inline",
				spec: { pricing: "per_room" }
			});
		case ENUM_EVENT_BACKEND.ACTIVITY:
			return wrapInlinePool({
				source: "inline",
				spec: {
					sub_typ: GeneralVenueInputSubTypEnum.Sightseeing as never
				}
			});
		case ENUM_EVENT_BACKEND.FLIGHT:
			return wrapInlinePool({
				source: "inline",
				spec: { pricing: "per_fare" }
			});
		case ENUM_EVENT_BACKEND.TRAIN:
			return wrapInlinePool({
				source: "inline",
				spec: { pricing: "per_fare" }
			});
		case ENUM_EVENT_BACKEND.BUS:
			return wrapInlinePool({
				source: "inline",
				spec: { pricing: "per_vehicle" }
			});
		case ENUM_EVENT_BACKEND.TRANSFER:
			return wrapInlinePool({
				source: "inline",
				spec: { pricing: "per_car" }
			});
		case ENUM_EVENT_BACKEND.GUIDE:
			return wrapInlinePool({ source: "inline", spec: {} });
		case ENUM_EVENT_BACKEND.SUPPLEMENTARY:
			return wrapInlinePool({ source: "inline", spec: {} });
		case ENUM_EVENT_BACKEND.REF:
			return {};
		case ENUM_EVENT_BACKEND.OPTIONS:
			return {};
	}
};

/** Keep an existing WRITE pool; otherwise fill the inline shell. */
export const mapEventDetailsWriteOrEmpty = (
	typ: ENUM_EVENT_BACKEND_TYPE,
	details?: TEventDetailsWriteBackend
): TEventDetailsWriteBackend => {
	if (details?.pool?.length) return details;
	if (typ === ENUM_EVENT_BACKEND.REF || typ === ENUM_EVENT_BACKEND.OPTIONS) {
		return details ?? mapEmptyEventDetailsToWrite(typ);
	}
	return {
		...details,
		...mapEmptyEventDetailsToWrite(typ)
	} as TEventDetailsWriteBackend;
};

/** POST pool body — `*MemberNew` with `typ` on the member, never `is_main`. */
export const mapEmptyPoolMemberNew = (
	typ: ENUM_EVENT_BACKEND_TYPE
): TEventPoolMemberNewBackend => {
	if (typ === ENUM_EVENT_BACKEND.OPTIONS) {
		throw new Error("A multi slot has no supplier pool");
	}

	if (typ === ENUM_EVENT_BACKEND.REF) {
		return {
			typ: ENUM_EVENT_BACKEND.REF,
			supply: { source: "inline" }
		};
	}

	const supply = mapEmptyEventDetailsToWrite(typ).pool?.[0]?.supply;
	if (!supply) {
		throw new Error("Empty pool member requires a supply");
	}

	return { typ, supply } as TEventPoolMemberNewBackend;
};

/**
 * POST pool body — empty inline shell linked to a library supplier
 * (`source: "inline"`, `supplier_id` set, no product).
 */
export const mapInlinePoolMemberWithSupplier = (
	typ: ENUM_EVENT_BACKEND_TYPE,
	supplierId: string
): TEventPoolMemberNewBackend => {
	if (typ === ENUM_EVENT_BACKEND.OPTIONS) {
		throw new Error("A multi slot has no supplier pool");
	}

	if (typ === ENUM_EVENT_BACKEND.REF) {
		return {
			typ: ENUM_EVENT_BACKEND.REF,
			supply: { source: "inline", supplier_id: supplierId }
		};
	}

	const empty = mapEmptyPoolMemberNew(typ);
	const supply = empty.supply;
	if (!supply || supply.source !== "inline") {
		throw new Error("Inline pool member requires inline supply");
	}

	return {
		...empty,
		supply: { ...supply, supplier_id: supplierId }
	} as TEventPoolMemberNewBackend;
};

/** POST pool body — product supply from an attach-product link. */
export const mapProductPoolMemberNew = (
	typ: ENUM_EVENT_BACKEND_TYPE,
	link: IEventProductLink
): TEventPoolMemberNewBackend => {
	if (typ === ENUM_EVENT_BACKEND.OPTIONS) {
		throw new Error("A multi slot has no supplier pool");
	}

	return {
		typ,
		supply: {
			source: "product",
			product_id: link.productId,
			...(link.scope
				? { scope: mapEventProductScopeToBackend(link.scope) }
				: {})
		}
	} as TEventPoolMemberNewBackend;
};

/** Intent → POST pool member body (API boundary only). */
export const mapAddPoolMemberToBackend = (
	intent: TAddPoolMemberIntent
): TEventPoolMemberNewBackend => {
	switch (intent.kind) {
		case "empty":
			return mapEmptyPoolMemberNew(intent.typ);
		case "supplier":
			return mapInlinePoolMemberWithSupplier(
				intent.typ,
				intent.supplierId
			);
		case "product":
			return mapProductPoolMemberNew(intent.typ, intent.link);
	}
};
