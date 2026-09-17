import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_FORM_BUS_VARIANT,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_VEHICLE_BODY_TYPE,
	type IBusVariantWrite,
	type TBusVariantFormSchema
} from "../../types";

export const emptyBusVariantForm = (): TBusVariantFormSchema => ({
	[ENUM_FORM_BUS_VARIANT.NAME]: "",
	[ENUM_FORM_BUS_VARIANT.BODY_TYPE]: ENUM_VEHICLE_BODY_TYPE.BUS,
	[ENUM_FORM_BUS_VARIANT.PAX]: 1,
	[ENUM_FORM_BUS_VARIANT.DESCRIPTION]: "",
	[ENUM_FORM_BUS_VARIANT.COST]: null,
	[ENUM_FORM_BUS_VARIANT.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_FORM_BUS_VARIANT.FEES]: []
});

export const mapBusVariantFormToWrite = (
	values: TBusVariantFormSchema
): IBusVariantWrite => {
	const money = {
		val: values[ENUM_FORM_BUS_VARIANT.COST] ?? 0,
		currency:
			values[ENUM_FORM_BUS_VARIANT.CURRENCY] || DEFAULT_EVENT_CURRENCY
	};
	const fees = values[ENUM_FORM_BUS_VARIANT.FEES].length
		? values[ENUM_FORM_BUS_VARIANT.FEES]
		: null;

	return {
		name: values[ENUM_FORM_BUS_VARIANT.NAME].trim(),
		bodyType: values[ENUM_FORM_BUS_VARIANT.BODY_TYPE],
		pax: values[ENUM_FORM_BUS_VARIANT.PAX],
		description: values[ENUM_FORM_BUS_VARIANT.DESCRIPTION].trim() || null,
		expenses: {
			typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
			cost: money,
			fees,
			markup: null
		}
	};
};
