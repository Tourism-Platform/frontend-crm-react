import {
	ENUM_FORM_TRAIN_FARES,
	type ITrainVariant,
	type TTrainFareRow
} from "../../types";

export { mapFareRowToVariantWrite } from "../map-fare-row.converters";

export const mapFareRowFromVariant = (
	variant: ITrainVariant
): TTrainFareRow => ({
	[ENUM_FORM_TRAIN_FARES.VARIANT_ID]: variant.id,
	[ENUM_FORM_TRAIN_FARES.NAME]: variant.name
});
