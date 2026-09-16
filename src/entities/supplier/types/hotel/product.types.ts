import type { ISupplierLocation } from "../supplier-location.types";
import type { ENUM_SUPPLIER_TYPE_TYPE } from "../supplier-type.types";

import type { ENUM_HOTEL_AMENITY_TYPE } from "./amenity.types";
import type { IHotelPolicy } from "./policy.types";
import type { THotelStayRateInputBackend } from "./product-backend.types";
import type { IHotelVariant } from "./rooms.types";

export const ENUM_HOTEL_PRICING = {
	PER_ROOM: "per_room",
	WHOLE: "whole"
} as const;

export type ENUM_HOTEL_PRICING_TYPE =
	(typeof ENUM_HOTEL_PRICING)[keyof typeof ENUM_HOTEL_PRICING];

export interface IHotelProductDetails {
	location: ISupplierLocation | null;
	stars: number | null;
	amenities: ENUM_HOTEL_AMENITY_TYPE[];
	policy: IHotelPolicy | null;
}

export interface IHotelProduct {
	id: string;
	supplierId: string;
	supplierName: string | null;
	typ: ENUM_SUPPLIER_TYPE_TYPE;
	name: string;
	pricing: ENUM_HOTEL_PRICING_TYPE;
	details: IHotelProductDetails;
	/**
	 * Whole-stay price of a whole-priced hotel, kept as the backend payload.
	 * No UI edits it; an update resends it back unchanged.
	 */
	stayRate: THotelStayRateInputBackend | null;
	imagePaths: string[];
	primaryImagePath: string | null;
	variants: IHotelVariant[];
}

export interface IHotelProductCreate {
	name: string;
	location?: ISupplierLocation | null;
	stars?: number | null;
	amenities: ENUM_HOTEL_AMENITY_TYPE[];
	policy?: IHotelPolicy | null;
}
