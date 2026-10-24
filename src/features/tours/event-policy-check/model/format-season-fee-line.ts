import { formatMoney } from "@/shared/utils";

import type { ISupplierFeeFormRow } from "@/entities/supplier";

/** Строка сбора в сезонной цене: без имени — подпись по умолчанию */
export const formatSeasonFeeLine = (
	fee: ISupplierFeeFormRow,
	untitled: string
): { name: string; amount: string } => ({
	name: fee.name?.trim() || untitled,
	amount: formatMoney(fee.cost ?? 0, { currency: fee.currency })
});
