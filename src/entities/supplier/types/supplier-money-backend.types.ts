import type {
	Currency,
	FixedChargeInput,
	FixedExpenseInput,
	MonetaryValueSchema,
	PercentageMarkup
} from "@/shared/api/generated/Api";

export type TCurrencyBackend = Currency;
export type TMonetaryValueBackend = MonetaryValueSchema;
export type TFixedExpenseInputBackend = FixedExpenseInput;
export type TPercentageMarkupBackend = PercentageMarkup;
export type TFixedChargeInputBackend = FixedChargeInput;
