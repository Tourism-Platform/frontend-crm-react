import type React from "react";

import type { TTourEventFlightEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	ENUM_FLIGHT_PRICING_INVOICING,
	type ENUM_FLIGHT_PRICING_INVOICING_TYPE,
	ENUM_FLIGHT_PRICING_TYPE,
	type ENUM_FLIGHT_PRICING_TYPE_TYPE
} from "@/entities/tour";

export { ENUM_FLIGHT_PRICING_INVOICING, ENUM_FLIGHT_PRICING_TYPE };
export type {
	ENUM_FLIGHT_PRICING_INVOICING_TYPE,
	ENUM_FLIGHT_PRICING_TYPE_TYPE
};

export interface IFlightPricingTab<TProps> {
	label: TTourEventFlightEditPageKeys;
	type: ENUM_FLIGHT_PRICING_INVOICING_TYPE;
	slot: React.ComponentType<TProps>;
}

export type TFlightPricingFormField = TFormField<
	TTourEventFlightEditPageKeys,
	string
>;

export interface IFlightIndividualPricingTab {
	label: TTourEventFlightEditPageKeys;
	type: ENUM_FLIGHT_PRICING_TYPE_TYPE;
	priceDetailsList: TFlightPricingFormField[];
}
