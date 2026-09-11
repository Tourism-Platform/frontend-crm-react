import type { ENUM_HOTEL_AMENITY_TYPE } from "../hotel/amenity.types";
import type { ISupplierLocation } from "../supplier-location.types";
import type { ENUM_SUPPLIER_TYPE_TYPE } from "../supplier-type.types";
import type { TSupplierVariantCharge } from "../supplier-variant-charge.types";

export interface IFlightHop {
	airlineCode: string | null;
	flightNumber: number | null;
	departureAirportCode: string | null;
	arrivalAirportCode: string | null;
	departureLocation: ISupplierLocation | null;
	arrivalLocation: ISupplierLocation | null;
	departureTerminal: string | null;
	departureGate: string | null;
	amenities: ENUM_HOTEL_AMENITY_TYPE[];
}

export interface IFlightVariant {
	id: string;
	name: string;
	expenses: TSupplierVariantCharge | null;
}

export interface IFlightProduct {
	id: string;
	supplierId: string;
	typ: ENUM_SUPPLIER_TYPE_TYPE;
	name: string;
	hops: IFlightHop[];
	imagePaths: string[];
	primaryImagePath: string | null;
	variants: IFlightVariant[];
}

export interface IFlightProductCreate {
	name: string;
	hops: IFlightHop[];
}

export interface IFlightVariantWrite {
	name: string;
	expenses: TSupplierVariantCharge | null;
}
