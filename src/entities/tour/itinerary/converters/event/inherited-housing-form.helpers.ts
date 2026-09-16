import type { HousingDetailsOutput } from "@/shared/api";
import { mapBackendLocationToGeoForm } from "@/shared/converters";

import {
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_FORM_ROOMS,
	ENUM_HOUSING_SOURCE,
	type TRoomsSchema
} from "../../types";

import { accommodationAmenityConverter } from "./accommodation";

export type TEventProductLinkFormFields = {
	[ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID]: string;
	[ENUM_FORM_EVENT_PRODUCT.VARIANT_ID]: string | null;
	[ENUM_FORM_EVENT_PRODUCT.SOURCE]: typeof ENUM_HOUSING_SOURCE.INHERITED;
	[ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE]: boolean;
};

/**
 * Structural view of any 3.1 details whose supply may be product-linked.
 * All six product-capable details outputs are assignable to it.
 */
type TProductLinkDetails = {
	supply:
		| { source: "inline" }
		| ({
				source: "product";
		  } & {
				product_id: string;
				scope: { typ: "all" } | { typ: "only"; ids: string[] };
				override: unknown | null;
		  });
};

/**
 * Product link form fields from contract 3.1 details.
 *
 * The linked product lives in `details.supply` (`source: "product"`);
 * the selected variant is expressed through `supply.scope`
 * (`{ typ: "only", ids: [unitId] }` — the form's single-variant UX keeps
 * using the first id only; it is a PRODUCT UNIT id, never an option id).
 */
export const mapInheritedProductLinkToForm = (
	details: TProductLinkDetails
): TEventProductLinkFormFields => {
	const supply = details.supply;
	const product = supply.source === "product" ? supply : null;

	return {
		[ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID]: product?.product_id ?? "",
		[ENUM_FORM_EVENT_PRODUCT.VARIANT_ID]:
			product?.scope.typ === "only"
				? (product.scope.ids[0] ?? null)
				: null,
		[ENUM_FORM_EVENT_PRODUCT.SOURCE]: ENUM_HOUSING_SOURCE.INHERITED,
		[ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE]: product?.override != null
	};
};

/**
 * Linked-product snapshot for the form — read from `details.spec`, which the
 * backend already returns SCOPED to the current scope. Never re-filter by
 * scope on the frontend.
 */
export const mapInheritedHousingProductSnapshotToForm = (
	details: HousingDetailsOutput
): {
	property: ReturnType<typeof mapBackendLocationToGeoForm>;
	stars: number | null;
	amenities: ReturnType<typeof accommodationAmenityConverter.fromMany>;
	rooms: TRoomsSchema;
} => {
	const spec = details.spec;

	const rooms = (spec?.categories ?? []).flatMap((category) =>
		(category.rooms ?? []).map((room) => ({
			...(room.id ? { [ENUM_FORM_ROOMS.ID]: room.id } : {}),
			[ENUM_FORM_ROOMS.ROOM_NAME]: room.name ?? room.typ ?? "Room",
			[ENUM_FORM_ROOMS.DESCRIPTION]: room.description ?? ""
		}))
	);

	return {
		property: mapBackendLocationToGeoForm(spec?.location ?? null),
		stars: spec?.stars ?? null,
		amenities: accommodationAmenityConverter.fromMany(
			spec?.amenities ?? []
		),
		rooms: { [ENUM_FORM_ROOMS.ROOMS_LIST]: rooms }
	};
};
