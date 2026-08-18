import { ENUM_PACKAGE_PRICING_TYPE } from "@/entities/tour";

import type { IPackagePricingTab } from "../types";

import { PACKAGE_FLAT_RATE_PRICE_DETAILS_LIST } from "./pricing-price-details-flat-rate.config";
import { PACKAGE_PER_PERSON_PRICE_DETAILS_LIST } from "./pricing-price-details-per-person.config";

export const PACKAGE_PRICING_TABS_LIST: IPackagePricingTab[] = [
	{
		label: "form.pricing.pricing_type.tabs.flat_rate",
		type: ENUM_PACKAGE_PRICING_TYPE.FLAT_RATE,
		priceDetailsList: PACKAGE_FLAT_RATE_PRICE_DETAILS_LIST
	},
	{
		label: "form.pricing.pricing_type.tabs.per_person",
		type: ENUM_PACKAGE_PRICING_TYPE.PER_PERSON,
		priceDetailsList: PACKAGE_PER_PERSON_PRICE_DETAILS_LIST
	}
];
