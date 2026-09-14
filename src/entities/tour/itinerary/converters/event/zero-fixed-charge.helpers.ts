import { Currency } from "@/shared/api";
import type { FixedChargeInput } from "@/shared/api";

import {
	DEFAULT_EVENT_CURRENCY,
	type ENUM_CURRENCY_OPTIONS_TYPE,
	currencyConverter
} from "@/entities/commission";

/**
 * Contract 3.1 requires a charge on every priced row; the form allows a
 * row without a cost. Bridge with a zero-valued fixed charge — never drop
 * the row.
 */
export const zeroFixedCharge = (
	currency?: ENUM_CURRENCY_OPTIONS_TYPE
): FixedChargeInput => ({
	typ: "fixed",
	cost: {
		val: 0,
		currency:
			currencyConverter.to(currency ?? DEFAULT_EVENT_CURRENCY) ??
			Currency.USD
	}
});
