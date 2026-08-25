import type { ISupplierLocation } from "../supplier-location.types";
import type { ENUM_SUPPLIER_TYPE_TYPE } from "../supplier-type.types";

import type { ENUM_HOTEL_AMENITY_TYPE } from "./amenity.types";
import type { IHotelPolicy } from "./policy.types";
import type { IHotelVariant } from "./rooms.types";

export interface IHotelProductDetails {
	location: ISupplierLocation | null;
	stars: number | null;
	amenities: ENUM_HOTEL_AMENITY_TYPE[];
	policy: IHotelPolicy | null;
}

export interface IHotelProduct {
	id: string;
	supplierId: string;
	typ: ENUM_SUPPLIER_TYPE_TYPE;
	name: string;
	details: IHotelProductDetails;
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
