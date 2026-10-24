import { createMockId, mockImageUrl } from "@/shared/api";

import { MOCK_TOUR_OPERATOR_ID } from "@/entities/tour/tour/mock/tour.mock";

import {
	ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND,
	type ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND_TYPE,
	ENUM_HOUSING_ROOM_TYPES_BACKEND,
	ENUM_SUPPLIER_TYPE_BACKEND,
	type ENUM_SUPPLIER_TYPE_BACKEND_TYPE,
	ENUM_VEHICLE_BODY_TYPE_BACKEND,
	type TSupplierBackend,
	type TSupplierProductReadBackend
} from "../types";

import { fixedChargeMock, perPersonChargeMock } from "./supplier-charge.mock";

export const buildSupplierId = (index: number) => createMockId("c100", index);
export const buildSupplierProductId = (index: number) =>
	createMockId("c110", index);
export const buildSupplierVariantId = (index: number) =>
	createMockId("c120", index);

const SUPPLIER_SEED: [string, ENUM_SUPPLIER_TYPE_BACKEND_TYPE[]][] = [
	["Hyatt Regency Tashkent", [ENUM_SUPPLIER_TYPE_BACKEND.HOTEL]],
	["Silk Road Hotels", [ENUM_SUPPLIER_TYPE_BACKEND.HOTEL]],
	["Uzbekistan Airways", [ENUM_SUPPLIER_TYPE_BACKEND.FLIGHT]],
	["Afrosiyob Railways", [ENUM_SUPPLIER_TYPE_BACKEND.TRAIN]],
	[
		"Samarkand Transfers",
		[ENUM_SUPPLIER_TYPE_BACKEND.TRANSFER, ENUM_SUPPLIER_TYPE_BACKEND.BUS]
	],
	[
		"Registan Museum",
		[ENUM_SUPPLIER_TYPE_BACKEND.MUSEUM, ENUM_SUPPLIER_TYPE_BACKEND.ACTIVITY]
	],
	["Bukhara Food Tours", [ENUM_SUPPLIER_TYPE_BACKEND.ACTIVITY]],
	["Khiva Coach Lines", [ENUM_SUPPLIER_TYPE_BACKEND.BUS]]
];

export const SUPPLIERS_MOCK: TSupplierBackend[] = SUPPLIER_SEED.map(
	([brandName, types], index) => ({
		id: buildSupplierId(index + 1),
		operator_id: MOCK_TOUR_OPERATOR_ID,
		brand_name: brandName,
		legal_name: `${brandName} LLC`,
		phone: `+99871200${String(index).padStart(4, "0")}`,
		website: `https://${brandName.toLowerCase().replace(/\W+/g, "-")}.uz`,
		logo_path: mockImageUrl(`supplier-${index}`, 200, 200),
		supplier_types: types,
		deleted_at: null
	})
);

let variantIndex = 0;
const nextVariantId = () => buildSupplierVariantId(++variantIndex);

const productBase = (
	index: number,
	supplier: TSupplierBackend,
	name: string
) => ({
	id: buildSupplierProductId(index),
	supplier_id: supplier.id,
	supplier_name: supplier.brand_name,
	name,
	image_paths: [mockImageUrl(`product-${index}`)],
	primary_image_path: mockImageUrl(`product-${index}`)
});

const hotelProduct = (
	index: number,
	supplier: TSupplierBackend,
	name: string,
	stars: number
): TSupplierProductReadBackend => ({
	...productBase(index, supplier, name),
	typ: "hotel",
	spec: {
		pricing: "per_room",
		images: [],
		name,
		location: null,
		stars,
		typs: [],
		amenities: [],
		policy: null,
		categories: [
			{
				id: nextVariantId(),
				name: "Standard",
				rooms: [
					{
						id: nextVariantId(),
						images: [],
						typ: ENUM_HOUSING_ROOM_TYPES_BACKEND.DOUBLE,
						pax: 2,
						name: "Standard double",
						description: null,
						rate: {
							base: fixedChargeMock(90 + stars * 10),
							seasons: []
						}
					},
					{
						id: nextVariantId(),
						images: [],
						typ: ENUM_HOUSING_ROOM_TYPES_BACKEND.SINGLE,
						pax: 1,
						name: "Standard single",
						description: null,
						rate: {
							base: fixedChargeMock(70 + stars * 10),
							seasons: []
						}
					}
				]
			}
		]
	}
});

const activityProduct = (
	index: number,
	supplier: TSupplierBackend,
	name: string,
	subTyp: ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND_TYPE
): TSupplierProductReadBackend =>
	({
		...productBase(index, supplier, name),
		typ: "activity",
		spec: {
			sub_typ: subTyp,
			images: [],
			name,
			location: null,
			offerings: [
				{
					id: nextVariantId(),
					name: "Adult",
					charge: perPersonChargeMock(25)
				},
				{
					id: nextVariantId(),
					name: "Child",
					charge: perPersonChargeMock(12)
				}
			]
		}
	}) as unknown as TSupplierProductReadBackend;

const flightProduct = (
	index: number,
	supplier: TSupplierBackend,
	name: string
): TSupplierProductReadBackend => ({
	...productBase(index, supplier, name),
	typ: "flight",
	spec: {
		pricing: "per_fare",
		images: [],
		name,
		legs: [],
		fares: [
			{
				id: nextVariantId(),
				name: "Economy",
				charge: perPersonChargeMock(180)
			},
			{
				id: nextVariantId(),
				name: "Business",
				charge: perPersonChargeMock(420)
			}
		]
	}
});

const trainProduct = (
	index: number,
	supplier: TSupplierBackend,
	name: string
): TSupplierProductReadBackend => ({
	...productBase(index, supplier, name),
	typ: "train",
	spec: {
		pricing: "per_fare",
		images: [],
		name,
		legs: [],
		fares: [
			{
				id: nextVariantId(),
				name: "Economy",
				charge: perPersonChargeMock(25)
			},
			{
				id: nextVariantId(),
				name: "Business",
				charge: perPersonChargeMock(45)
			}
		]
	}
});

const transferProduct = (
	index: number,
	supplier: TSupplierBackend,
	name: string
): TSupplierProductReadBackend => ({
	...productBase(index, supplier, name),
	typ: "transfer",
	spec: {
		pricing: "per_car",
		images: [],
		name,
		cars: [
			{
				id: nextVariantId(),
				images: [],
				body_type: ENUM_VEHICLE_BODY_TYPE_BACKEND.SEDAN,
				pax: 3,
				name: "Chevrolet Malibu",
				description: null,
				charge: fixedChargeMock(30)
			},
			{
				id: nextVariantId(),
				images: [],
				body_type: ENUM_VEHICLE_BODY_TYPE_BACKEND.MINIVAN,
				pax: 7,
				name: "Hyundai Starex",
				description: null,
				charge: fixedChargeMock(55)
			}
		]
	}
});

const busProduct = (
	index: number,
	supplier: TSupplierBackend,
	name: string
): TSupplierProductReadBackend => ({
	...productBase(index, supplier, name),
	typ: "bus",
	spec: {
		pricing: "per_vehicle",
		images: [],
		name,
		vehicles: [
			{
				id: nextVariantId(),
				images: [],
				body_type: ENUM_VEHICLE_BODY_TYPE_BACKEND.COACH,
				pax: 45,
				name: "Yutong coach",
				description: null,
				charge: fixedChargeMock(250)
			}
		]
	}
});

const [hyatt, silkRoad, airways, railways, transfers, museum, food, coach] =
	SUPPLIERS_MOCK;

export const SUPPLIER_PRODUCTS_MOCK: TSupplierProductReadBackend[] = [
	hotelProduct(1, hyatt, "Hyatt Regency Tashkent", 5),
	hotelProduct(2, silkRoad, "Silk Road Samarkand", 4),
	hotelProduct(3, silkRoad, "Silk Road Bukhara", 3),
	flightProduct(4, airways, "Tashkent — Urgench"),
	flightProduct(5, airways, "London — Tashkent"),
	trainProduct(6, railways, "Afrosiyob Tashkent — Samarkand"),
	trainProduct(7, railways, "Afrosiyob Samarkand — Bukhara"),
	transferProduct(8, transfers, "Airport transfer"),
	busProduct(9, transfers, "City bus charter"),
	activityProduct(
		10,
		museum,
		"Registan ensemble tour",
		ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND.SIGHTSEEING
	),
	activityProduct(
		11,
		food,
		"Plov master class",
		ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND.MASTER_CLASS
	),
	activityProduct(
		12,
		food,
		"Bukhara street food walk",
		ENUM_GENERAL_VENUE_OUTPUT_SUB_TYP_BACKEND.OUTDOOR
	),
	busProduct(13, coach, "Khiva — Bukhara coach")
];

export const SUPPLIER_VARIANT_SEED_COUNT = variantIndex;
