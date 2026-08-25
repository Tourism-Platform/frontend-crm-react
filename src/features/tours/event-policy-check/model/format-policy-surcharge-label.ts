import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";
import {
	ENUM_HOTEL_POLICY_SURCHARGE,
	type THotelPolicySurcharge
} from "@/entities/tour";

export type TPolicySurchargeLabel =
	| { kind: "fixed"; val: number; currency: ENUM_CURRENCY_OPTIONS_TYPE }
	| { kind: "percentage"; percentage: number };

export const formatPolicySurchargeLabel = (
	surcharge: THotelPolicySurcharge
): TPolicySurchargeLabel => {
	if (surcharge.typ === ENUM_HOTEL_POLICY_SURCHARGE.FIXED) {
		return {
			kind: "fixed",
			val: surcharge.cost.val,
			currency: surcharge.cost.currency
		};
	}

	return { kind: "percentage", percentage: surcharge.percentage };
};
