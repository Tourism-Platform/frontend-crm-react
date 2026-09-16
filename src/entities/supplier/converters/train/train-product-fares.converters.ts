import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_FORM_TRAIN_FARES,
	ENUM_TRAIN_VARIANT_CHARGE,
	type ITrainProduct,
	type ITrainVariant,
	type ITrainVariantWrite,
	type TTrainFareRow
} from "../../types";

const EMPTY_FIXED_CHARGE = (): ITrainVariantWrite["expenses"] => ({
	typ: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
	cost: { val: 0, currency: DEFAULT_EVENT_CURRENCY },
	fees: null,
	markup: null
});

export const mapFareRowFromVariant = (
	variant: ITrainVariant
): TTrainFareRow => ({
	[ENUM_FORM_TRAIN_FARES.VARIANT_ID]: variant.id,
	[ENUM_FORM_TRAIN_FARES.NAME]: variant.name
});

export const mapFareRowToVariantWrite = (
	row: TTrainFareRow,
	product: ITrainProduct
): ITrainVariantWrite => {
	const existing = product.variants.find(
		(variant) => variant.id === row[ENUM_FORM_TRAIN_FARES.VARIANT_ID]
	);

	return {
		name: row[ENUM_FORM_TRAIN_FARES.NAME].trim(),
		expenses: existing?.expenses ?? EMPTY_FIXED_CHARGE()
	};
};
