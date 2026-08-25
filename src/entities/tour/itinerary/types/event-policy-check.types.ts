import type { THotelPolicySurcharge } from "./accommodation/hotel-policy.types";

export const ENUM_SUPPLIER_POLICY_WARNING = {
	EARLY_CHECK_IN: "early_check_in",
	LATE_CHECK_OUT: "late_check_out",
	SUPPLIER_TYPE_MISMATCH: "supplier_type_mismatch"
} as const;

export type ENUM_SUPPLIER_POLICY_WARNING_TYPE =
	(typeof ENUM_SUPPLIER_POLICY_WARNING)[keyof typeof ENUM_SUPPLIER_POLICY_WARNING];

export interface IPolicyCheckEventArgs {
	tourId: string;
	optionId: string;
	eventId: string;
}

export interface IPolicyCheckOptionArgs {
	tourId: string;
	optionId: string;
}

export interface ISupplierPolicyWarning {
	tourOptionId: string;
	eventId: string;
	optionId: string | null;
	supplierId: string;
	supplierName: string;
	code: ENUM_SUPPLIER_POLICY_WARNING_TYPE;
	path: (string | number)[];
	detail: string;
	expectedSurcharge: THotelPolicySurcharge | null;
}
