import {
	GeneralVenueOutputSubTypEnum,
	HousingRoomTypes,
	type SupplierModel,
	SupplierType,
	VehicleBodyType,
	createMockId,
	mockImageUrl
} from "@/shared/api";

import { MOCK_TOUR_OPERATOR_ID } from "@/entities/tour/tour/mock/tour.mock";

import type { TSupplierProductReadBackend } from "../types";

import { fixedChargeMock, perPersonChargeMock } from "./supplier-charge.mock";

export const buildSupplierId = (index: number) => createMockId("c100", index);
export const buildSupplierProductId = (index: number) =>
	createMockId("c110", index);
export const buildSupplierVariantId = (index: number) =>
	createMockId("c120", index);

const SUPPLIER_SEED: [string, SupplierType[]][] = [
	["Hyatt Regency Tashkent", [SupplierType.Hotel]],
	["Silk Road Hotels", [SupplierType.Hotel]],
	["Uzbekistan Airways", [SupplierType.Flight]],
	["Afrosiyob Railways", [SupplierType.Train]],
	["Samarkand Transfers", [SupplierType.Transfer, SupplierType.Bus]],
	["Registan Museum", [SupplierType.Museum, SupplierType.Activity]],
	["Bukhara Food Tours", [SupplierType.Activity]],
	["Khiva Coach Lines", [SupplierType.Bus]]
];

export const SUPPLIERS_MOCK: SupplierModel[] = SUPPLIER_SEED.map(
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

const productBase = (index: number, supplier: SupplierModel, name: string) => ({
	id: buildSupplierProductId(index),
	supplier_id: supplier.id,
	supplier_name: supplier.brand_name,
	name,
	image_paths: [mockImageUrl(`product-${index}`)],
	primary_image_path: mockImageUrl(`product-${index}`)
});

const hotelProduct = (
	index: number,
	supplier: SupplierModel,
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
						typ: HousingRoomTypes.Double,
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
						typ: HousingRoomTypes.Single,
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
	supplier: SupplierModel,
	name: string,
	subTyp: GeneralVenueOutputSubTypEnum
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
	supplier: SupplierModel,
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
	supplier: SupplierModel,
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
	supplier: SupplierModel,
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
				body_type: VehicleBodyType.Sedan,
				pax: 3,
				name: "Chevrolet Malibu",
				description: null,
				charge: fixedChargeMock(30)
			},
			{
				id: nextVariantId(),
				images: [],
				body_type: VehicleBodyType.Minivan,
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
	supplier: SupplierModel,
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
				body_type: VehicleBodyType.Coach,
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
		GeneralVenueOutputSubTypEnum.Sightseeing
	),
	activityProduct(
		11,
		food,
		"Plov master class",
		GeneralVenueOutputSubTypEnum.MasterClass
	),
	activityProduct(
		12,
		food,
		"Bukhara street food walk",
		GeneralVenueOutputSubTypEnum.Outdoor
	),
	busProduct(13, coach, "Khiva — Bukhara coach")
];

export const SUPPLIER_VARIANT_SEED_COUNT = variantIndex;
