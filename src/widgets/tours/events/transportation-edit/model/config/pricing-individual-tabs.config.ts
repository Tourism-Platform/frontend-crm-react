import { ENUM_TRANSPORTATION_PRICING_TYPE } from "@/entities/tour";

import type { ITransportationIndividualPricingTab } from "../types";

import { PRICING_FLAT_RATE_PRICE_DETAILS_LIST } from "./pricing-price-details-flat-rate.config";
import { PRICING_PER_PERSON_PRICE_DETAILS_LIST } from "./pricing-price-details-per-person.config";

export const PRICING_INDIVIDUAL_TABS_LIST: ITransportationIndividualPricingTab[] =
	[
		{
			label: "form.pricing.pricing_type.tabs.flat_rate",
			type: ENUM_TRANSPORTATION_PRICING_TYPE.FLAT_RATE,
			priceDetailsList: PRICING_FLAT_RATE_PRICE_DETAILS_LIST
		},
		{
			label: "form.pricing.pricing_type.tabs.per_car",
			type: ENUM_TRANSPORTATION_PRICING_TYPE.PER_CAR
		},
		{
			label: "form.pricing.pricing_type.tabs.per_person",
			type: ENUM_TRANSPORTATION_PRICING_TYPE.PER_PERSON,
			priceDetailsList: PRICING_PER_PERSON_PRICE_DETAILS_LIST
		}
	];
