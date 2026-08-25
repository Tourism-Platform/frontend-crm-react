import { currencyConverter } from "@/entities/commission";

import type { IFeeFormRow, TFeeBackend, TFeeInputBackend } from "../../types";
import { ENUM_FEE_FIELD } from "../../types";

export const mapFeeFromBackend = (fee: TFeeBackend): IFeeFormRow => ({
	[ENUM_FEE_FIELD.NAME]: fee.name ?? null,
	[ENUM_FEE_FIELD.COST]: fee.cost?.val ?? null,
	[ENUM_FEE_FIELD.CURRENCY]:
		currencyConverter.from(fee.cost?.currency) ?? null,
	[ENUM_FEE_FIELD.DESCRIPTION]: fee.description ?? null
});

export const mapFeeToBackend = (fee: IFeeFormRow): TFeeInputBackend => {
	const cost = fee[ENUM_FEE_FIELD.COST];
	const currency = fee[ENUM_FEE_FIELD.CURRENCY];

	return {
		name: fee[ENUM_FEE_FIELD.NAME],
		description: fee[ENUM_FEE_FIELD.DESCRIPTION],
		cost:
			cost != null && currency != null
				? {
						val: cost,
						currency: currencyConverter.to(currency)!
					}
				: null
	};
};

export const mapFeesFromBackend = (
	fees?: TFeeBackend[] | null
): IFeeFormRow[] => (fees ?? []).map(mapFeeFromBackend);

export const mapFeesToBackend = (
	fees: IFeeFormRow[] | null | undefined
): TFeeInputBackend[] | null => {
	if (fees == null || fees.length === 0) return null;
	return fees.map(mapFeeToBackend);
};
