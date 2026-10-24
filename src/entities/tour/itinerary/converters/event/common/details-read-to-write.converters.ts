/**
 * READ → WRITE boundary for event details.
 *
 * READ:  details { plan, pool: [{ id, is_main, supply, spec }] }
 * WRITE: details { plan?, pool?: [{ id, supply }] }
 *
 * Rules enforced here:
 * - product supply keeps only { source, product_id, scope } — supplier, override
 *   and the resolved spec are server-owned and are dropped;
 * - inline supply keeps { source, supplier_id, spec } — the read member `spec`
 *   moves INTO the inline supply;
 * - `is_main` is never echoed;
 * - server-owned `images` are stripped from specs and spec nodes.
 */
import {
	ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND,
	type ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND_TYPE
} from "@/entities/supplier/types/supplier-backend-enum.types";
import type { TSupplierNodeImageBackend } from "@/entities/supplier/types/supplier-product-image-backend.types";

import {
	type ENUM_EVENT_BACKEND_TYPE,
	ENUM_GENERAL_VENUE_INPUT_SUB_TYP_BACKEND,
	type ENUM_GENERAL_VENUE_INPUT_SUB_TYP_BACKEND_TYPE,
	type ITourEventOption,
	type TActivityDetailsBackend,
	type TActivityDetailsInputBackend,
	type TActivityInlineSupplyNewBackend,
	type TAllVariantsBackend,
	type TBusDetailsOutputBackend,
	type TBusDetailsWriteBackend,
	type TBusInlineSupplyNewBackend,
	type TEventDetailsBackend,
	type TEventDetailsWriteBackend,
	type TEventOptionBodyBackend,
	type TEventProductScopeBackend,
	type TFlightDetailsOutputBackend,
	type TFlightDetailsWriteBackend,
	type TFlightInlineSupplyNewBackend,
	type TGuideDetailsBackend,
	type TGuideDetailsWriteBackend,
	type THousingDetailsOutputBackend,
	type THousingDetailsWriteBackend,
	type THousingInlineSupplyNewBackend,
	type TInformationDetailsOutputBackend,
	type TInformationDetailsWriteBackend,
	type TOnlyVariantsBackend,
	type TProductSupplyNewBackend,
	type TSupplementaryDetailsOutputBackend,
	type TSupplementaryDetailsWriteBackend,
	type TTrainDetailsOutputBackend,
	type TTrainDetailsWriteBackend,
	type TTrainInlineSupplyNewBackend,
	type TTransferDetailsBackend,
	type TTransferDetailsWriteBackend,
	type TTransferInlineSupplyNewBackend
} from "../../../types";

import type { TEventPoolMemberBackend } from "./event-pool.helpers";

type TProductSupplyRead = Extract<
	TEventPoolMemberBackend["supply"],
	{ source: "product" }
>;

const mapScopeReadToWrite = (
	scope: TProductSupplyRead["scope"]
): TEventProductScopeBackend => {
	if (scope.typ === "only") {
		const only: { typ: "only" } & TOnlyVariantsBackend = {
			typ: "only",
			ids: [...(scope.ids ?? [])],
			units: [...(scope.units ?? [])],
			categories: [...(scope.categories ?? [])]
		};
		return only;
	}
	const all: { typ: "all" } & TAllVariantsBackend = { typ: "all" };
	return all;
};

const mapProductSupplyReadToWrite = (
	supply: TProductSupplyRead
): { source: "product" } & TProductSupplyNewBackend => ({
	source: "product",
	product_id: supply.product_id,
	scope: mapScopeReadToWrite(supply.scope)
});

/** Strips server-owned images from a spec or spec node (room/vehicle/car/offering/menu item). */
const stripImages = <T extends { images?: TSupplierNodeImageBackend[] }>(
	node: T
): Omit<T, "images"> => {
	const rest = { ...node };
	delete rest.images;
	return rest;
};

/* ---------------------------------- hotel --------------------------------- */

type THousingSpecRead = THousingDetailsOutputBackend["pool"][number]["spec"];
type THousingSpecWrite = THousingInlineSupplyNewBackend["spec"];

const mapHousingSpecReadToWrite = (
	spec: THousingSpecRead
): THousingSpecWrite => {
	if (spec.pricing === "per_room") {
		const { categories, ...rest } = stripImages(spec);
		return {
			...rest,
			pricing: "per_room",
			categories: categories.map((category) => ({
				...category,
				rooms: category.rooms.map((room) => stripImages(room))
			}))
		};
	}
	const { categories, ...rest } = stripImages(spec);
	return {
		...rest,
		pricing: "whole",
		categories: categories.map((category) => ({ ...category }))
	};
};

const mapHousingDetailsReadToWrite = (
	details: THousingDetailsOutputBackend
): THousingDetailsWriteBackend => ({
	plan: details.plan,
	pool: details.pool.map((member) => ({
		id: member.id,
		supply:
			member.supply.source === "product"
				? mapProductSupplyReadToWrite(member.supply)
				: {
						source: "inline",
						supplier_id: member.supply.supplier_id,
						spec: mapHousingSpecReadToWrite(member.spec)
					}
	}))
});

/* ------------------------------ train / flight ----------------------------- */

type TTrainSpecRead = TTrainDetailsOutputBackend["pool"][number]["spec"];
type TTrainSpecWrite = TTrainInlineSupplyNewBackend["spec"];

const mapTrainSpecReadToWrite = (spec: TTrainSpecRead): TTrainSpecWrite => {
	if (spec.pricing === "per_fare") {
		const { legs, fares, ...rest } = stripImages(spec);
		return {
			...rest,
			pricing: "per_fare",
			legs: legs.map((leg) => ({ ...leg })),
			fares: fares.map((fare) => ({ ...fare }))
		};
	}
	const { legs, fares, charge, ...rest } = stripImages(spec);
	return {
		...rest,
		pricing: "whole",
		legs: legs.map((leg) => ({ ...leg })),
		fares: fares.map((fare) => ({ ...fare })),
		charge
	};
};

const mapTrainDetailsReadToWrite = (
	details: TTrainDetailsOutputBackend
): TTrainDetailsWriteBackend => ({
	plan: details.plan,
	pool: details.pool.map((member) => ({
		id: member.id,
		supply:
			member.supply.source === "product"
				? mapProductSupplyReadToWrite(member.supply)
				: {
						source: "inline",
						supplier_id: member.supply.supplier_id,
						spec: mapTrainSpecReadToWrite(member.spec)
					}
	}))
});

type TFlightSpecRead = TFlightDetailsOutputBackend["pool"][number]["spec"];
type TFlightSpecWrite = TFlightInlineSupplyNewBackend["spec"];

const mapFlightSpecReadToWrite = (spec: TFlightSpecRead): TFlightSpecWrite => {
	if (spec.pricing === "per_fare") {
		const { legs, fares, ...rest } = stripImages(spec);
		return {
			...rest,
			pricing: "per_fare",
			legs: legs.map((leg) => ({ ...leg })),
			fares: fares.map((fare) => ({ ...fare }))
		};
	}
	const { legs, fares, charge, ...rest } = stripImages(spec);
	return {
		...rest,
		pricing: "whole",
		legs: legs.map((leg) => ({ ...leg })),
		fares: fares.map((fare) => ({ ...fare })),
		charge
	};
};

const mapFlightDetailsReadToWrite = (
	details: TFlightDetailsOutputBackend
): TFlightDetailsWriteBackend => ({
	plan: details.plan,
	pool: details.pool.map((member) => ({
		id: member.id,
		supply:
			member.supply.source === "product"
				? mapProductSupplyReadToWrite(member.supply)
				: {
						source: "inline",
						supplier_id: member.supply.supplier_id,
						spec: mapFlightSpecReadToWrite(member.spec)
					}
	}))
});

/* ----------------------------------- bus ---------------------------------- */

type TBusSpecRead = TBusDetailsOutputBackend["pool"][number]["spec"];
type TBusSpecWrite = TBusInlineSupplyNewBackend["spec"];

const mapBusSpecReadToWrite = (spec: TBusSpecRead): TBusSpecWrite => {
	if (spec.pricing === "per_vehicle") {
		const { vehicles, ...rest } = stripImages(spec);
		return {
			...rest,
			pricing: "per_vehicle",
			vehicles: vehicles.map((vehicle) => stripImages(vehicle))
		};
	}
	const { vehicles, charge, ...rest } = stripImages(spec);
	return {
		...rest,
		pricing: "whole",
		vehicles: vehicles.map((vehicle) => stripImages(vehicle)),
		charge
	};
};

const mapBusDetailsReadToWrite = (
	details: TBusDetailsOutputBackend
): TBusDetailsWriteBackend => ({
	plan: details.plan,
	pool: details.pool.map((member) => ({
		id: member.id,
		supply:
			member.supply.source === "product"
				? mapProductSupplyReadToWrite(member.supply)
				: {
						source: "inline",
						supplier_id: member.supply.supplier_id,
						spec: mapBusSpecReadToWrite(member.spec)
					}
	}))
});

/* --------------------------------- transfer -------------------------------- */

type TTransferSpecRead = TTransferDetailsBackend["pool"][number]["spec"];
type TTransferSpecWrite = TTransferInlineSupplyNewBackend["spec"];

const mapTransferSpecReadToWrite = (
	spec: TTransferSpecRead
): TTransferSpecWrite => {
	if (spec.pricing === "per_car") {
		const { cars, ...rest } = stripImages(spec);
		return {
			...rest,
			pricing: "per_car",
			cars: cars.map((car) => stripImages(car))
		};
	}
	if (spec.pricing === "per_car_category") {
		const { cars, categories, ...rest } = stripImages(spec);
		return {
			...rest,
			pricing: "per_car_category",
			categories: categories.map((category) => ({ ...category })),
			cars: cars.map((car) => {
				const { prices, ...carRest } = stripImages(car);
				return {
					...carRest,
					prices: prices.map((price) => ({ ...price }))
				};
			})
		};
	}
	const { cars, charge, ...rest } = stripImages(spec);
	return {
		...rest,
		pricing: "whole",
		cars: cars.map((car) => stripImages(car)),
		charge
	};
};

const mapTransferDetailsReadToWrite = (
	details: TTransferDetailsBackend
): TTransferDetailsWriteBackend => ({
	plan: details.plan,
	pool: details.pool.map((member) => ({
		id: member.id,
		supply:
			member.supply.source === "product"
				? mapProductSupplyReadToWrite(member.supply)
				: {
						source: "inline",
						supplier_id: member.supply.supplier_id,
						spec: mapTransferSpecReadToWrite(member.spec)
					}
	}))
});

/* --------------------------------- activity -------------------------------- */

type TActivitySpecRead = TActivityDetailsBackend["pool"][number]["spec"];
type TActivitySpecWrite = TActivityInlineSupplyNewBackend["spec"];

/**
 * Output → Input venue subtype. The generated WRITE union types the
 * general-venue discriminant as `"sightseeing" & ENUM_GENERAL_VENUE_INPUT_SUB_TYP_BACKEND_TYPE`
 * (which reduces to `never`), so the tag is cast to `never` at the write
 * boundary — the runtime value is the matching enum member.
 */
const GENERAL_SUB_TYP_OUT_TO_IN: Record<
	ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND_TYPE,
	ENUM_GENERAL_VENUE_INPUT_SUB_TYP_BACKEND_TYPE
> = {
	[ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND.MASTER_CLASS]:
		ENUM_GENERAL_VENUE_INPUT_SUB_TYP_BACKEND.MASTER_CLASS,
	[ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND.SIGHTSEEING]:
		ENUM_GENERAL_VENUE_INPUT_SUB_TYP_BACKEND.SIGHTSEEING,
	[ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND.OUTDOOR]:
		ENUM_GENERAL_VENUE_INPUT_SUB_TYP_BACKEND.OUTDOOR,
	[ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND.RIDING]:
		ENUM_GENERAL_VENUE_INPUT_SUB_TYP_BACKEND.RIDING,
	[ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND.EXTREME]:
		ENUM_GENERAL_VENUE_INPUT_SUB_TYP_BACKEND.EXTREME,
	[ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND.WELLNESS]:
		ENUM_GENERAL_VENUE_INPUT_SUB_TYP_BACKEND.WELLNESS,
	[ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND.ENTERTAINMENT]:
		ENUM_GENERAL_VENUE_INPUT_SUB_TYP_BACKEND.ENTERTAINMENT,
	[ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND.WATER_ACTIVITIES]:
		ENUM_GENERAL_VENUE_INPUT_SUB_TYP_BACKEND.WATER_ACTIVITIES,
	[ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND.PHOTOGRAPHY]:
		ENUM_GENERAL_VENUE_INPUT_SUB_TYP_BACKEND.PHOTOGRAPHY,
	[ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND.SPIRITUAL]:
		ENUM_GENERAL_VENUE_INPUT_SUB_TYP_BACKEND.SPIRITUAL,
	[ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND.OTHER]:
		ENUM_GENERAL_VENUE_INPUT_SUB_TYP_BACKEND.OTHER
};

const mapActivitySpecReadToWrite = (
	spec: TActivitySpecRead
): TActivitySpecWrite => {
	if (spec.sub_typ === "food") {
		const { offerings, ...rest } = stripImages(spec);
		return {
			...rest,
			sub_typ: "food",
			offerings: offerings.map((offering) => {
				const { menu, ...offeringRest } = offering;
				return {
					...offeringRest,
					menu: menu.map((item) => stripImages(item))
				};
			})
		};
	}
	const { offerings, ...rest } = stripImages(spec);
	// `spec.sub_typ` is `never` on read (see above) — assignable to the enum.
	const subTyp: ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND_TYPE = spec.sub_typ;
	return {
		...rest,
		sub_typ: GENERAL_SUB_TYP_OUT_TO_IN[subTyp] as never,
		offerings: offerings.map((offering) => ({ ...offering }))
	};
};

const mapActivityDetailsReadToWrite = (
	details: TActivityDetailsBackend
): TActivityDetailsInputBackend => ({
	plan: details.plan,
	pool: details.pool.map((member) => ({
		id: member.id,
		supply:
			member.supply.source === "product"
				? mapProductSupplyReadToWrite(member.supply)
				: {
						source: "inline",
						supplier_id: member.supply.supplier_id,
						spec: mapActivitySpecReadToWrite(member.spec)
					}
	}))
});

/* ------------------------- guide / info / supplementary -------------------- */

const mapGuideDetailsReadToWrite = (
	details: TGuideDetailsBackend
): TGuideDetailsWriteBackend => ({
	plan: details.plan,
	pool: details.pool.map((member) => ({
		id: member.id,
		supply: {
			source: "inline" as const,
			supplier_id: member.supply.supplier_id,
			spec: {
				name: member.spec.name,
				typ_tiers: member.spec.typ_tiers.map((tier) => ({ ...tier })),
				categories: member.spec.categories.map((category) => ({
					...category
				}))
			}
		}
	}))
});

const mapInformationDetailsReadToWrite = (
	details: TInformationDetailsOutputBackend
): TInformationDetailsWriteBackend => ({
	plan: details.plan,
	pool: details.pool.map((member) => ({
		id: member.id,
		supply: {
			source: "inline" as const,
			supplier_id: member.supply.supplier_id
		}
	}))
});

const mapSupplementaryDetailsReadToWrite = (
	details: TSupplementaryDetailsOutputBackend
): TSupplementaryDetailsWriteBackend => ({
	plan: details.plan,
	pool: details.pool.map((member) => ({
		id: member.id,
		supply: {
			source: "inline" as const,
			supplier_id: member.supply.supplier_id,
			spec: {
				item: member.spec.item.map((item) => ({ ...item }))
			}
		}
	}))
});

/* --------------------------------- entrypoint ------------------------------ */

/**
 * Converts READ details of one option row into the WRITE details shape.
 * `backendTyp` is the row's own discriminator (it correlates with `details`).
 */
export const mapEventDetailsReadToWrite = (
	backendTyp: ENUM_EVENT_BACKEND_TYPE,
	details: TEventDetailsBackend
): TEventDetailsWriteBackend => {
	switch (backendTyp) {
		case "housing":
			return mapHousingDetailsReadToWrite(
				details as THousingDetailsOutputBackend
			);
		case "train":
			return mapTrainDetailsReadToWrite(
				details as TTrainDetailsOutputBackend
			);
		case "flight":
			return mapFlightDetailsReadToWrite(
				details as TFlightDetailsOutputBackend
			);
		case "bus":
			return mapBusDetailsReadToWrite(
				details as TBusDetailsOutputBackend
			);
		case "transfer":
			return mapTransferDetailsReadToWrite(
				details as TTransferDetailsBackend
			);
		case "activity":
			return mapActivityDetailsReadToWrite(
				details as TActivityDetailsBackend
			);
		case "guide":
			return mapGuideDetailsReadToWrite(details as TGuideDetailsBackend);
		case "ref":
			return mapInformationDetailsReadToWrite(
				details as TInformationDetailsOutputBackend
			);
		case "supplementary":
			return mapSupplementaryDetailsReadToWrite(
				details as TSupplementaryDetailsOutputBackend
			);
		default:
			throw new Error(
				`Unsupported event typ for READ→WRITE: ${backendTyp}`
			);
	}
};

/**
 * Replaces the selected pool member's WRITE supply (inline spec save).
 * Other members keep their echoed `{ id, supply }`. `is_main` stays off.
 */
export const replaceSelectedPoolMemberSupply = (
	writeDetails: TEventDetailsWriteBackend,
	supplyId: string | undefined,
	supply: NonNullable<TEventDetailsWriteBackend["pool"]>[number]["supply"]
): TEventDetailsWriteBackend => {
	const pool = writeDetails.pool;
	if (!pool?.length) {
		return {
			...writeDetails,
			pool: [{ supply }]
		} as TEventDetailsWriteBackend;
	}

	return {
		...writeDetails,
		pool: pool.map((member, index) => {
			const isSelected = supplyId ? member.id === supplyId : index === 0;
			return isSelected ? { id: member.id, supply } : member;
		})
	} as TEventDetailsWriteBackend;
};

export const mapInlinePoolWrite = (
	backendTyp: ENUM_EVENT_BACKEND_TYPE,
	currentDetails: TEventDetailsBackend | undefined,
	supplyId: string | undefined,
	inlineSupply: NonNullable<
		TEventDetailsWriteBackend["pool"]
	>[number]["supply"]
): NonNullable<TEventDetailsWriteBackend["pool"]> => {
	if (!currentDetails) {
		return [{ supply: inlineSupply }] as NonNullable<
			TEventDetailsWriteBackend["pool"]
		>;
	}

	return (replaceSelectedPoolMemberSupply(
		mapEventDetailsReadToWrite(backendTyp, currentDetails),
		supplyId,
		inlineSupply
	).pool ?? [{ supply: inlineSupply }]) as NonNullable<
		TEventDetailsWriteBackend["pool"]
	>;
};

/**
 * Builds the unified option WRITE body (`addOption` / `updateOption`) from a
 * read option row — used by the multiply-option page content update.
 */
export const mapEventOptionReadToWriteBody = (
	option: Pick<
		ITourEventOption,
		"name" | "description" | "backendTyp" | "details"
	>
): TEventOptionBodyBackend =>
	({
		name: option.name,
		description: option.description,
		typ: option.backendTyp,
		details: mapEventDetailsReadToWrite(option.backendTyp, option.details)
	}) as TEventOptionBodyBackend;
