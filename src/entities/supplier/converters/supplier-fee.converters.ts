import { currencyConverter } from "@/entities/commission/converters/currency.coverters";

import type {
	ISupplierFeeFormRow,
	TSupplierFeeBackend,
	TSupplierFeeInputBackend
} from "../types";
import { ENUM_SUPPLIER_FEE_FIELD } from "../types";

export const mapSupplierFeeFromBackend = (
	fee: TSupplierFeeBackend
): ISupplierFeeFormRow => ({
	[ENUM_SUPPLIER_FEE_FIELD.NAME]: fee.name ?? null,
	[ENUM_SUPPLIER_FEE_FIELD.COST]: fee.cost?.val ?? null,
	[ENUM_SUPPLIER_FEE_FIELD.CURRENCY]:
		currencyConverter.from(fee.cost?.currency) ?? null,
	[ENUM_SUPPLIER_FEE_FIELD.DESCRIPTION]: fee.description ?? null
});

export const mapSupplierFeeToBackend = (
	fee: ISupplierFeeFormRow
): TSupplierFeeInputBackend => {
	const cost = fee[ENUM_SUPPLIER_FEE_FIELD.COST];
	const currency = fee[ENUM_SUPPLIER_FEE_FIELD.CURRENCY];

	return {
		name: fee[ENUM_SUPPLIER_FEE_FIELD.NAME],
		description: fee[ENUM_SUPPLIER_FEE_FIELD.DESCRIPTION],
		cost:
			cost != null && currency != null
				? {
						val: cost,
						currency: currencyConverter.to(currency)!
					}
				: null
	};
};

export const mapSupplierFeesFromBackend = (
	fees?: TSupplierFeeBackend[] | null
): ISupplierFeeFormRow[] => (fees ?? []).map(mapSupplierFeeFromBackend);

export const mapSupplierFeesToBackend = (
	fees: ISupplierFeeFormRow[] | null | undefined
): TSupplierFeeInputBackend[] | null => {
	if (fees == null || fees.length === 0) return null;
	return fees.map(mapSupplierFeeToBackend);
};
