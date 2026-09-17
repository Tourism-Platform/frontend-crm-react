import {
	type ActivityDetailsOutput,
	type ActivityDetailsWrite,
	type ActivityInlineSupplyNew,
	type AllVariants,
	type BusDetailsOutput,
	type BusDetailsWrite,
	type BusInlineSupplyNew,
	type FlightDetailsOutput,
	type FlightDetailsWrite,
	type FlightInlineSupplyNew,
	GeneralVenueInputSubTypEnum,
	GeneralVenueOutputSubTypEnum,
	type GuideDetailsOutput,
	type GuideDetailsWrite,
	type HousingDetailsOutput,
	type HousingDetailsWrite,
	type HousingInlineSupplyNew,
	type InformationDetailsOutput,
	type InformationDetailsWrite,
	type NodeImageSchema,
	type OnlyVariants,
	type ProductSupplyNew,
	type SupplementaryDetailsOutput,
	type SupplementaryDetailsWrite,
	type TrainDetailsOutput,
	type TrainDetailsWrite,
	type TrainInlineSupplyNew,
	type TransferDetailsOutput,
	type TransferDetailsWrite,
	type TransferInlineSupplyNew
} from "@/shared/api";

import type {
	ENUM_EVENT_BACKEND_TYPE,
	ITourEventOption,
	TEventDetailsBackend,
	TEventDetailsWriteBackend,
	TEventOptionBodyBackend,
	TEventProductScopeBackend
} from "../../../types";

import type { TEventPoolMemberBackend } from "./event-pool.helpers";

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

type TProductSupplyRead = Extract<
	TEventPoolMemberBackend["supply"],
	{ source: "product" }
>;

const mapScopeReadToWrite = (
	scope: TProductSupplyRead["scope"]
): TEventProductScopeBackend => {
	if (scope.typ === "only") {
		const only: { typ: "only" } & OnlyVariants = {
			typ: "only",
			ids: [...(scope.ids ?? [])],
			units: [...(scope.units ?? [])],
			categories: [...(scope.categories ?? [])]
		};
		return only;
	}
	const all: { typ: "all" } & AllVariants = { typ: "all" };
	return all;
};

const mapProductSupplyReadToWrite = (
	supply: TProductSupplyRead
): { source: "product" } & ProductSupplyNew => ({
	source: "product",
	product_id: supply.product_id,
	scope: mapScopeReadToWrite(supply.scope)
});

/** Strips server-owned images from a spec or spec node (room/vehicle/car/offering/menu item). */
const stripImages = <T extends { images?: NodeImageSchema[] }>(
	node: T
): Omit<T, "images"> => {
	const rest = { ...node };
	delete rest.images;
	return rest;
};

/* ---------------------------------- hotel --------------------------------- */

type THousingSpecRead = HousingDetailsOutput["pool"][number]["spec"];
type THousingSpecWrite = HousingInlineSupplyNew["spec"];

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
	details: HousingDetailsOutput
): HousingDetailsWrite => ({
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

type TTrainSpecRead = TrainDetailsOutput["pool"][number]["spec"];
type TTrainSpecWrite = TrainInlineSupplyNew["spec"];

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
	details: TrainDetailsOutput
): TrainDetailsWrite => ({
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

type TFlightSpecRead = FlightDetailsOutput["pool"][number]["spec"];
type TFlightSpecWrite = FlightInlineSupplyNew["spec"];

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
	details: FlightDetailsOutput
): FlightDetailsWrite => ({
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

type TBusSpecRead = BusDetailsOutput["pool"][number]["spec"];
type TBusSpecWrite = BusInlineSupplyNew["spec"];

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
	details: BusDetailsOutput
): BusDetailsWrite => ({
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

type TTransferSpecRead = TransferDetailsOutput["pool"][number]["spec"];
type TTransferSpecWrite = TransferInlineSupplyNew["spec"];

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
	details: TransferDetailsOutput
): TransferDetailsWrite => ({
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

type TActivitySpecRead = ActivityDetailsOutput["pool"][number]["spec"];
type TActivitySpecWrite = ActivityInlineSupplyNew["spec"];

/**
 * Output → Input venue subtype. The generated WRITE union types the
 * general-venue discriminant as `"sightseeing" & GeneralVenueInputSubTypEnum`
 * (which reduces to `never`), so the tag is cast to `never` at the write
 * boundary — the runtime value is the matching enum member.
 */
const GENERAL_SUB_TYP_OUT_TO_IN: Record<
	GeneralVenueOutputSubTypEnum,
	GeneralVenueInputSubTypEnum
> = {
	[GeneralVenueOutputSubTypEnum.MasterClass]:
		GeneralVenueInputSubTypEnum.MasterClass,
	[GeneralVenueOutputSubTypEnum.Sightseeing]:
		GeneralVenueInputSubTypEnum.Sightseeing,
	[GeneralVenueOutputSubTypEnum.Outdoor]: GeneralVenueInputSubTypEnum.Outdoor,
	[GeneralVenueOutputSubTypEnum.Riding]: GeneralVenueInputSubTypEnum.Riding,
	[GeneralVenueOutputSubTypEnum.Extreme]: GeneralVenueInputSubTypEnum.Extreme,
	[GeneralVenueOutputSubTypEnum.Wellness]:
		GeneralVenueInputSubTypEnum.Wellness,
	[GeneralVenueOutputSubTypEnum.Entertainment]:
		GeneralVenueInputSubTypEnum.Entertainment,
	[GeneralVenueOutputSubTypEnum.WaterActivities]:
		GeneralVenueInputSubTypEnum.WaterActivities,
	[GeneralVenueOutputSubTypEnum.Photography]:
		GeneralVenueInputSubTypEnum.Photography,
	[GeneralVenueOutputSubTypEnum.Spiritual]:
		GeneralVenueInputSubTypEnum.Spiritual,
	[GeneralVenueOutputSubTypEnum.Other]: GeneralVenueInputSubTypEnum.Other
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
	const subTyp: GeneralVenueOutputSubTypEnum = spec.sub_typ;
	return {
		...rest,
		sub_typ: GENERAL_SUB_TYP_OUT_TO_IN[subTyp] as never,
		offerings: offerings.map((offering) => ({ ...offering }))
	};
};

const mapActivityDetailsReadToWrite = (
	details: ActivityDetailsOutput
): ActivityDetailsWrite => ({
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
	details: GuideDetailsOutput
): GuideDetailsWrite => ({
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
	details: InformationDetailsOutput
): InformationDetailsWrite => ({
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
	details: SupplementaryDetailsOutput
): SupplementaryDetailsWrite => ({
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
				details as HousingDetailsOutput
			);
		case "train":
			return mapTrainDetailsReadToWrite(details as TrainDetailsOutput);
		case "flight":
			return mapFlightDetailsReadToWrite(details as FlightDetailsOutput);
		case "bus":
			return mapBusDetailsReadToWrite(details as BusDetailsOutput);
		case "transfer":
			return mapTransferDetailsReadToWrite(
				details as TransferDetailsOutput
			);
		case "activity":
			return mapActivityDetailsReadToWrite(
				details as ActivityDetailsOutput
			);
		case "guide":
			return mapGuideDetailsReadToWrite(details as GuideDetailsOutput);
		case "ref":
			return mapInformationDetailsReadToWrite(
				details as InformationDetailsOutput
			);
		case "supplementary":
			return mapSupplementaryDetailsReadToWrite(
				details as SupplementaryDetailsOutput
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
