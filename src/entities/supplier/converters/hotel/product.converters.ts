import type { StayRateOutput } from "@/shared/api/generated/Api";

import {
	ENUM_HOTEL_PRICING,
	ENUM_SUPPLIER_TYPE,
	type IHotelProduct,
	type IHotelProductCreate,
	type TCreateHotelProductBackend,
	type THotelProductReadBackend,
	type THotelStayRateInputBackend
} from "../../types";
import {
	mapSupplierLocationFromBackend,
	mapSupplierLocationToBackend
} from "../supplier-location.converters";

import { hotelAmenityConverter } from "./amenity.converters";
import {
	mapHotelPolicyFromBackend,
	mapHotelPolicyToBackend
} from "./policy.converters";
import { mapHotelVariantFromBackend } from "./rooms.converters";

/**
 * The whole-stay price is carried through untouched: every output charge leaf
 * is structurally assignable to its input counterpart, so this is a plain
 * re-wrap, verified by the compiler.
 */
const mapStayRateFromBackend = (
	price: StayRateOutput
): THotelStayRateInputBackend => ({
	base: price.base,
	seasons: price.seasons
});

export const mapHotelProductFromBackend = (
	row: THotelProductReadBackend
): IHotelProduct => {
	const spec = row.spec;

	return {
		id: row.id,
		supplierId: row.supplier_id,
		supplierName: row.supplier_name ?? null,
		typ: ENUM_SUPPLIER_TYPE.HOTEL,
		name: spec.name ?? row.name,
		pricing: spec.pricing,
		details: {
			location: mapSupplierLocationFromBackend(spec.location ?? null),
			stars: spec.stars ?? null,
			amenities: hotelAmenityConverter.fromMany(spec.amenities ?? []),
			policy: mapHotelPolicyFromBackend(spec.policy)
		},
		stayRate:
			spec.pricing === ENUM_HOTEL_PRICING.WHOLE
				? mapStayRateFromBackend(spec.price)
				: null,
		imagePaths: row.image_paths ?? [],
		primaryImagePath: row.primary_image_path ?? null,
		variants: spec.categories.map(mapHotelVariantFromBackend)
	};
};

export const mapHotelProductToCreate = (
	data: IHotelProductCreate
): TCreateHotelProductBackend => ({
	typ: "hotel",
	details: {
		pricing: ENUM_HOTEL_PRICING.PER_ROOM,
		name: data.name,
		location: mapSupplierLocationToBackend(data.location ?? null),
		stars: data.stars ?? null,
		amenities: hotelAmenityConverter.toMany(data.amenities),
		policy: mapHotelPolicyToBackend(data.policy)
	}
});
