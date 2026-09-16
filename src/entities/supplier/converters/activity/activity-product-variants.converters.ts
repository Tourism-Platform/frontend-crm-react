import {
	ENUM_FORM_ACTIVITY_VARIANT,
	ENUM_FORM_ACTIVITY_VARIANTS,
	type IActivityProduct,
	type IActivityVariant,
	type IActivityVariantWrite,
	type TActivityVariantRow
} from "../../types";

import {
	mapActivityVariantFormToWrite,
	mapActivityVariantToForm
} from "./variant-form.converters";

export const mapActivityOfferingRowFromVariant = (
	variant: IActivityVariant
): TActivityVariantRow => ({
	[ENUM_FORM_ACTIVITY_VARIANTS.VARIANT_ID]: variant.id,
	...mapActivityVariantToForm(variant),
	[ENUM_FORM_ACTIVITY_VARIANT.MENU]: variant.menu ?? []
});

export const mapActivityOfferingRowToVariantWrite = (
	row: TActivityVariantRow,
	product: IActivityProduct
): IActivityVariantWrite => {
	const existing = product.variants.find(
		(variant) => variant.id === row[ENUM_FORM_ACTIVITY_VARIANTS.VARIANT_ID]
	);

	return mapActivityVariantFormToWrite(row, existing);
};
