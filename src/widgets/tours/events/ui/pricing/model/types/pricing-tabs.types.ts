import type React from "react";

import type { TTourEventFlightEditPageKeys } from "@/shared/config";

export const ENUM_PRICING_TAB = {
	INDIVIDUAL: "INDIVIDUAL",
	PART: "PART"
} as const;

export type ENUM_PRICING_TAB_TYPE =
	(typeof ENUM_PRICING_TAB)[keyof typeof ENUM_PRICING_TAB];

export interface IPricingTab<TProps> {
	label: TTourEventFlightEditPageKeys;
	type: ENUM_PRICING_TAB_TYPE;
	slot: React.ComponentType<TProps>;
}
