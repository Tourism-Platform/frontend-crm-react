import {
	ENUM_FORM_BUS_SECTION,
	ENUM_FORM_BUS_VEHICLES,
	type IBusProduct,
	type TBusProductEditSchema
} from "../../types";

import { mapBusPricingFromProduct } from "./bus-product-pricing.converters";
import { mapVehicleRowFromVariant } from "./bus-product-vehicles.converters";
import { mapBusProductToGeneralForm } from "./product-form.converters";

export const mapBusProductToEditForm = (
	product?: IBusProduct | null
): TBusProductEditSchema => {
	const vehicles = (product?.variants ?? []).map(mapVehicleRowFromVariant);

	return {
		[ENUM_FORM_BUS_SECTION.GENERAL]: mapBusProductToGeneralForm(product),
		[ENUM_FORM_BUS_SECTION.VEHICLES]: {
			[ENUM_FORM_BUS_VEHICLES.VEHICLES_LIST]: vehicles
		},
		[ENUM_FORM_BUS_SECTION.PRICING]: mapBusPricingFromProduct(
			product,
			vehicles.map((vehicle) => ({
				variant_id: vehicle[ENUM_FORM_BUS_VEHICLES.VARIANT_ID]
			}))
		)
	};
};
