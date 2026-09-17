import {
	ENUM_FORM_FLIGHT_FARES,
	ENUM_FORM_FLIGHT_SECTION,
	type IFlightProduct,
	type TFlightProductEditSchema
} from "../../types";

import { mapFareRowFromVariant } from "./flight-product-fares.converters";
import { mapFlightPricingFromProduct } from "./flight-product-pricing.converters";
import { mapFlightProductToGeneralForm } from "./product-form.converters";

export const mapFlightProductToEditForm = (
	product?: IFlightProduct | null
): TFlightProductEditSchema => {
	const fares = (product?.variants ?? []).map(mapFareRowFromVariant);

	return {
		[ENUM_FORM_FLIGHT_SECTION.GENERAL]:
			mapFlightProductToGeneralForm(product),
		[ENUM_FORM_FLIGHT_SECTION.FARES]: {
			[ENUM_FORM_FLIGHT_FARES.FARES_LIST]: fares
		},
		[ENUM_FORM_FLIGHT_SECTION.PRICING]: mapFlightPricingFromProduct(
			product,
			fares.map((fare) => ({
				variant_id: fare[ENUM_FORM_FLIGHT_FARES.VARIANT_ID]
			}))
		)
	};
};
