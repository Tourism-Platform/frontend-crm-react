import {
	ENUM_FORM_ACTIVITY_SECTION,
	ENUM_FORM_ACTIVITY_VARIANTS,
	type IActivityProduct,
	type TActivityProductEditSchema
} from "../../types";

import { mapActivityOfferingRowFromVariant } from "./activity-product-variants.converters";
import { mapActivityProductToGeneralForm } from "./product-form.converters";

export const emptyActivityProductEditForm = (): TActivityProductEditSchema =>
	mapActivityProductToEditForm(null);

export const mapActivityProductToEditForm = (
	product?: IActivityProduct | null
): TActivityProductEditSchema => ({
	[ENUM_FORM_ACTIVITY_SECTION.GENERAL]:
		mapActivityProductToGeneralForm(product),
	[ENUM_FORM_ACTIVITY_SECTION.VARIANTS]: {
		[ENUM_FORM_ACTIVITY_VARIANTS.VARIANTS_LIST]: (
			product?.variants ?? []
		).map(mapActivityOfferingRowFromVariant)
	}
});
