import {
	ENUM_SUPPLIER_TYPE,
	type IHotelProduct,
	type IHotelProductCreate,
	type IHotelProductDetails,
	type TCreateHotelProductBackend,
	type THotelProductReadBackend
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

const mapHotelProductDetailsToBackend = (data: IHotelProductDetails) => ({
	typ: "hotel" as const,
	location: mapSupplierLocationToBackend(data.location),
	stars: data.stars,
	amenities: hotelAmenityConverter.toMany(data.amenities),
	policy: mapHotelPolicyToBackend(data.policy)
});

export const mapHotelProductFromBackend = (
	row: THotelProductReadBackend
): IHotelProduct => ({
	id: row.id,
	supplierId: row.supplier_id,
	typ: ENUM_SUPPLIER_TYPE.HOTEL,
	name: row.name,
	details: {
		location: mapSupplierLocationFromBackend(row.location ?? null),
		stars: row.stars ?? null,
		amenities: hotelAmenityConverter.fromMany(row.amenities ?? []),
		policy: mapHotelPolicyFromBackend(row.policy)
	},
	imagePaths: row.image_paths ?? [],
	primaryImagePath: row.primary_image_path ?? null,
	variants: (row.variants ?? []).map(mapHotelVariantFromBackend)
});

export const mapHotelProductToCreate = (
	data: IHotelProductCreate
): TCreateHotelProductBackend => ({
	typ: "hotel",
	name: data.name,
	details: mapHotelProductDetailsToBackend({
		location: data.location ?? null,
		stars: data.stars ?? null,
		amenities: data.amenities,
		policy: data.policy ?? null
	})
});
