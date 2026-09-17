import {
	ENUM_FORM_TRAIN_FARES,
	ENUM_FORM_TRAIN_SECTION,
	type ITrainProduct,
	type TTrainProductEditSchema
} from "../../types";

import { mapTrainProductToGeneralForm } from "./product-form.converters";
import { mapFareRowFromVariant } from "./train-product-fares.converters";
import { mapTrainPricingFromProduct } from "./train-product-pricing.converters";

export const emptyTrainProductEditForm = (): TTrainProductEditSchema =>
	mapTrainProductToEditForm(null);

export const mapTrainProductToEditForm = (
	product?: ITrainProduct | null
): TTrainProductEditSchema => {
	const fares = (product?.variants ?? []).map(mapFareRowFromVariant);

	return {
		[ENUM_FORM_TRAIN_SECTION.GENERAL]:
			mapTrainProductToGeneralForm(product),
		[ENUM_FORM_TRAIN_SECTION.FARES]: {
			[ENUM_FORM_TRAIN_FARES.FARES_LIST]: fares
		},
		[ENUM_FORM_TRAIN_SECTION.PRICING]: mapTrainPricingFromProduct(
			product,
			fares.map((fare) => ({
				variant_id: fare[ENUM_FORM_TRAIN_FARES.VARIANT_ID]
			}))
		)
	};
};
