import { Currency } from "../../../shared/api/generated/Api";
import { OPERATOR_FX_RATE_PATHS } from "../../../shared/api/generated/paths";

export type TCurrencySeedItem =
	typeof OPERATOR_FX_RATE_PATHS.recordFxRate._types.body;

export const CURRENCY_SEED: readonly TCurrencySeedItem[] = [
	{
		from_currency: Currency.USD,
		to_currency: Currency.UZS,
		rate: "12650"
	},
	{
		from_currency: Currency.EUR,
		to_currency: Currency.UZS,
		rate: "13700"
	},
	{
		from_currency: Currency.GBP,
		to_currency: Currency.UZS,
		rate: "16000"
	},
	{
		from_currency: Currency.RUB,
		to_currency: Currency.UZS,
		rate: "140"
	},
	{
		from_currency: Currency.USD,
		to_currency: Currency.EUR,
		rate: "0.92"
	}
] as const;
