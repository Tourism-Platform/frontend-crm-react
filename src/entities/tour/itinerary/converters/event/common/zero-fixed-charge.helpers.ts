import {
	DEFAULT_EVENT_CURRENCY,
	type ENUM_CURRENCY_OPTIONS_TYPE,
	currencyConverter
} from "@/entities/commission";
import { ENUM_CURRENCY_BACKEND } from "@/entities/commission/types/currency.types";
import type { TFixedChargeInputBackend } from "@/entities/supplier/types/supplier-money-backend.types";

/**
 * Contract 3.1 requires a charge on every priced row; the form allows a
 * row without a cost. Bridge with a zero-valued fixed charge — never drop
 * the row.
 */
export const zeroFixedCharge = (
	currency?: ENUM_CURRENCY_OPTIONS_TYPE
): TFixedChargeInputBackend => ({
	typ: "fixed",
	cost: {
		val: 0,
		currency:
			currencyConverter.to(currency ?? DEFAULT_EVENT_CURRENCY) ??
			ENUM_CURRENCY_BACKEND.USD
	}
});
