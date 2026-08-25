import { mapBackendLocationToGeoForm } from "@/shared/converters";

import {
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_FORM_ROOMS,
	ENUM_HOUSING_SOURCE,
	type TInheritedHousingDetailsBackend,
	type TRoomsSchema
} from "../../types";

import { accommodationAmenityConverter } from "./accommodation-amenity.converters";

type TEventProductLinkDetails = {
	product_id: string;
	variant_id?: string | null;
	source?: "custom" | "inherited";
	override?: unknown | null;
};

export type TEventProductLinkFormFields = {
	[ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID]: string;
	[ENUM_FORM_EVENT_PRODUCT.VARIANT_ID]: string | null;
	[ENUM_FORM_EVENT_PRODUCT.SOURCE]: typeof ENUM_HOUSING_SOURCE.INHERITED;
	[ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE]: boolean;
};

export const mapInheritedProductLinkToForm = (
	details: TEventProductLinkDetails
): TEventProductLinkFormFields => ({
	[ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID]: details.product_id,
	[ENUM_FORM_EVENT_PRODUCT.VARIANT_ID]: details.variant_id ?? null,
	[ENUM_FORM_EVENT_PRODUCT.SOURCE]: ENUM_HOUSING_SOURCE.INHERITED,
	[ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE]: details.override != null
});

export const mapInheritedHousingProductSnapshotToForm = (
	details: TInheritedHousingDetailsBackend
): {
	property: ReturnType<typeof mapBackendLocationToGeoForm>;
	amenities: ReturnType<typeof accommodationAmenityConverter.fromMany>;
	rooms: TRoomsSchema;
} => {
	const product = details.product;
	const variants = product?.variants ?? [];
	const selected = details.variant_id
		? variants.filter((variant) => variant.id === details.variant_id)
		: variants;

	const rooms = selected.flatMap((variant) =>
		(variant.rooms ?? []).map((room) => ({
			...(room.id ? { [ENUM_FORM_ROOMS.ID]: room.id } : {}),
			[ENUM_FORM_ROOMS.ROOM_NAME]: room.typ ?? variant.name ?? "Room",
			[ENUM_FORM_ROOMS.DESCRIPTION]: ""
		}))
	);

	return {
		property: mapBackendLocationToGeoForm(product?.location ?? null),
		amenities: accommodationAmenityConverter.fromMany(
			product?.amenities ?? []
		),
		rooms: { [ENUM_FORM_ROOMS.ROOMS_LIST]: rooms }
	};
};
