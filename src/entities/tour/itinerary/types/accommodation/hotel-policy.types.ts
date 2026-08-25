import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";

export const ENUM_HOTEL_POLICY_SURCHARGE = {
	FIXED: "fixed",
	PERCENTAGE: "percentage"
} as const;

export type ENUM_HOTEL_POLICY_SURCHARGE_TYPE =
	(typeof ENUM_HOTEL_POLICY_SURCHARGE)[keyof typeof ENUM_HOTEL_POLICY_SURCHARGE];

export interface IHotelPolicyMonetary {
	val: number;
	currency: ENUM_CURRENCY_OPTIONS_TYPE;
}

export interface IHotelPolicyFixedSurcharge {
	typ: typeof ENUM_HOTEL_POLICY_SURCHARGE.FIXED;
	cost: IHotelPolicyMonetary;
}

export interface IHotelPolicyPercentageSurcharge {
	typ: typeof ENUM_HOTEL_POLICY_SURCHARGE.PERCENTAGE;
	percentage: number;
}

export type THotelPolicySurcharge =
	| IHotelPolicyFixedSurcharge
	| IHotelPolicyPercentageSurcharge;

export interface IHotelPolicyBand {
	fromTime: string | null;
	toTime: string | null;
	surcharge: THotelPolicySurcharge | null;
	note: string | null;
}

export interface IHotelPolicy {
	checkInFrom: string | null;
	checkOutUntil: string | null;
	earlyCheckIn: IHotelPolicyBand[];
	lateCheckOut: IHotelPolicyBand[];
}
