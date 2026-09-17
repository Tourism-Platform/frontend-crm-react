import type { ENUM_HOTEL_AMENITY_TYPE } from "../hotel/amenity.types";
import type { ISupplierFeeFormRow } from "../supplier-fee.types";
import type { ISupplierLocation } from "../supplier-location.types";
import type {
	IMonetaryValue,
	TSupplierSurcharge
} from "../supplier-money.types";
import { ENUM_SUPPLIER_TYPE } from "../supplier-type.types";

export const ENUM_FLIGHT_VARIANT_CHARGE = {
	FIXED: "fixed",
	PER_PERSON: "per_person"
} as const;

export type ENUM_FLIGHT_VARIANT_CHARGE_TYPE =
	(typeof ENUM_FLIGHT_VARIANT_CHARGE)[keyof typeof ENUM_FLIGHT_VARIANT_CHARGE];

export const ENUM_FLIGHT_PRICING = {
	PER_FARE: "per_fare",
	WHOLE: "whole"
} as const;

export type ENUM_FLIGHT_PRICING_TYPE =
	(typeof ENUM_FLIGHT_PRICING)[keyof typeof ENUM_FLIGHT_PRICING];

export interface IFlightFixedCharge {
	typ: typeof ENUM_FLIGHT_VARIANT_CHARGE.FIXED;
	cost: IMonetaryValue;
	fees: ISupplierFeeFormRow[] | null;
	markup: TSupplierSurcharge | null;
}

export interface IFlightPerPersonCharge {
	typ: typeof ENUM_FLIGHT_VARIANT_CHARGE.PER_PERSON;
	costPerPerson: IMonetaryValue;
	fees: ISupplierFeeFormRow[] | null;
	markup: TSupplierSurcharge | null;
}

export type TFlightVariantCharge = IFlightFixedCharge | IFlightPerPersonCharge;

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
	expenses: TFlightVariantCharge | null;
}

export interface IFlightProduct {
	id: string;
	supplierId: string;
	supplierName: string | null;
	typ: typeof ENUM_SUPPLIER_TYPE.FLIGHT;
	name: string;
	pricing: ENUM_FLIGHT_PRICING_TYPE;
	/** Route-level charge of a whole-priced route; null for per-fare ones. */
	charge: TFlightVariantCharge | null;
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
	expenses: TFlightVariantCharge;
}
