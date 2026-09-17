import type { HousingDetailsOutput } from "@/shared/api";
import { mapBackendLocationToGeoForm } from "@/shared/converters";

import {
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_FORM_ROOMS,
	ENUM_HOUSING_SOURCE,
	type TRoomsSchema
} from "../../../types";
import { accommodationAmenityConverter } from "../accommodation";

import type {
	TEventPoolMemberBackend,
	TProductPoolMemberBackend
} from "./event-pool.helpers";
import { getPoolMember, isProductPoolMember } from "./event-pool.helpers";

type TProductScope = TProductPoolMemberBackend["supply"]["scope"];

const onlyScopeId = (scope: TProductScope): string | null =>
	scope.typ === "only" ? (scope.ids?.[0] ?? null) : null;

export type TEventProductLinkFormFields = {
	[ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID]?: string;
	[ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID]: string;
	[ENUM_FORM_EVENT_PRODUCT.VARIANT_ID]: string | null;
	[ENUM_FORM_EVENT_PRODUCT.SOURCE]: typeof ENUM_HOUSING_SOURCE.INHERITED;
	[ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE]: boolean;
};

/**
 * Product link form fields from a pool member (contract 6).
 */
export const mapInheritedProductLinkToForm = (
	member: TEventPoolMemberBackend | undefined
): TEventProductLinkFormFields => {
	const product = isProductPoolMember(member) ? member.supply : null;

	return {
		[ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID]: member?.id,
		[ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID]: product?.product_id ?? "",
		[ENUM_FORM_EVENT_PRODUCT.VARIANT_ID]: product
			? onlyScopeId(product.scope)
			: null,
		[ENUM_FORM_EVENT_PRODUCT.SOURCE]: ENUM_HOUSING_SOURCE.INHERITED,
		[ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE]: product?.override != null
	};
};

/**
 * Linked-product snapshot for the form — read from the member spec, which
 * the backend already returns SCOPED. Never re-filter by scope here.
 */
export const mapInheritedHousingProductSnapshotToForm = (
	details: HousingDetailsOutput,
	supplyId?: string | null
): {
	property: ReturnType<typeof mapBackendLocationToGeoForm>;
	stars: number | null;
	amenities: ReturnType<typeof accommodationAmenityConverter.fromMany>;
	rooms: TRoomsSchema;
} => {
	const spec = getPoolMember(details, supplyId)?.spec;

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
