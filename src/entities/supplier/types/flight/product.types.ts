import type { ENUM_HOTEL_AMENITY_TYPE } from "../hotel/amenity.types";
import type { ISupplierLocation } from "../supplier-location.types";
import type { ENUM_SUPPLIER_TYPE_TYPE } from "../supplier-type.types";
import type { TSupplierVariantCharge } from "../supplier-variant-charge.types";

export const ENUM_FLIGHT_PRICING = {
	PER_FARE: "per_fare",
	WHOLE: "whole"
} as const;

export type ENUM_FLIGHT_PRICING_TYPE =
	(typeof ENUM_FLIGHT_PRICING)[keyof typeof ENUM_FLIGHT_PRICING];

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
	pricing: ENUM_FLIGHT_PRICING_TYPE;
	/** Route-level charge of a whole-priced route; null for per-fare ones. */
	charge: TSupplierVariantCharge | null;
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
	expenses: TSupplierVariantCharge;
}
