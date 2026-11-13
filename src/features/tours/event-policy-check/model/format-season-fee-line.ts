import { formatMoney } from "@/shared/utils";

import type { ISupplierFeeFormRow } from "@/entities/supplier";

type TSeasonFeeLineSource = Pick<
	ISupplierFeeFormRow,
	"name" | "cost" | "currency"
>;

/** Строка сбора/доп. расхода в сезонной цене: без имени — подпись по умолчанию, без суммы — только имя */
export const formatSeasonFeeLine = (
	fee: TSeasonFeeLineSource,
	untitled: string
): { name: string; amount: string | null } => ({
	name: fee.name?.trim() || untitled,
	amount:
		fee.cost == null
			? null
			: formatMoney(fee.cost, { currency: fee.currency, compact: false })
});
