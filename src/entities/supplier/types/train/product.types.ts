import type { ISupplierFeeFormRow } from "../supplier-fee.types";
import type { ISupplierLocation } from "../supplier-location.types";
import type {
	IMonetaryValue,
	TSupplierSurcharge
} from "../supplier-money.types";
import type { ENUM_SUPPLIER_TYPE_TYPE } from "../supplier-type.types";

export const ENUM_TRAIN_VARIANT_CHARGE = {
	FIXED: "fixed",
	PER_PERSON: "per_person"
} as const;

export type ENUM_TRAIN_VARIANT_CHARGE_TYPE =
	(typeof ENUM_TRAIN_VARIANT_CHARGE)[keyof typeof ENUM_TRAIN_VARIANT_CHARGE];

export const ENUM_TRAIN_PRICING = {
	PER_FARE: "per_fare",
	WHOLE: "whole"
} as const;

export type ENUM_TRAIN_PRICING_TYPE =
	(typeof ENUM_TRAIN_PRICING)[keyof typeof ENUM_TRAIN_PRICING];

export interface ITrainFixedCharge {
	typ: typeof ENUM_TRAIN_VARIANT_CHARGE.FIXED;
	cost: IMonetaryValue;
	fees: ISupplierFeeFormRow[] | null;
	markup: TSupplierSurcharge | null;
}

export interface ITrainPerPersonCharge {
	typ: typeof ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON;
	costPerPerson: IMonetaryValue;
	fees: ISupplierFeeFormRow[] | null;
	markup: TSupplierSurcharge | null;
}

export type TTrainVariantCharge = ITrainFixedCharge | ITrainPerPersonCharge;

export interface ITrainJourneyPoint {
	location: ISupplierLocation | null;
}

export interface ITrainHop {
	departure: ITrainJourneyPoint | null;
	arrival: ITrainJourneyPoint | null;
}

export interface ITrainVariant {
	id: string;
	name: string;
	expenses: TTrainVariantCharge | null;
}

export interface ITrainProduct {
	id: string;
	supplierId: string;
	typ: ENUM_SUPPLIER_TYPE_TYPE;
	name: string;
	pricing: ENUM_TRAIN_PRICING_TYPE;
	/** Route-level charge of a whole-priced route; null for per-fare ones. */
	charge: TTrainVariantCharge | null;
	hops: ITrainHop[];
	imagePaths: string[];
	primaryImagePath: string | null;
	variants: ITrainVariant[];
}

export interface ITrainProductCreate {
	name: string;
	hops: ITrainHop[];
}

export interface ITrainVariantWrite {
	name: string;
	expenses: TTrainVariantCharge;
}
