import { getApiErrorDetail } from "@/shared/api";

type TFinanceSettingsErrorKey =
	| "general.form.toasts.save.errors.currency_in_use"
	| "general.form.toasts.save.errors.currency_not_accepted"
	| "general.form.toasts.save.errors.default_not_accepted"
	| "general.form.toasts.save.error";

// Префиксы detail из PATCH /operator/me/financials; после двоеточия — код валюты
const CURRENCY_ERROR_PREFIXES: [string, TFinanceSettingsErrorKey][] = [
	[
		"Currency is still used by prices or open orders:",
		"general.form.toasts.save.errors.currency_in_use"
	],
	[
		"Currency is not accepted by the operator:",
		"general.form.toasts.save.errors.currency_not_accepted"
	]
];

const DEFAULT_NOT_ACCEPTED_DETAIL =
	"default_currency must be one of accepted_currencies";

/** Returns i18n key only — call site does `t(key, { currency })`. */
export const resolveFinanceSettingsError = (
	error: unknown
): { key: TFinanceSettingsErrorKey; currency?: string } => {
	const detail = getApiErrorDetail(error);
	if (!detail) return { key: "general.form.toasts.save.error" };

	if (detail.startsWith(DEFAULT_NOT_ACCEPTED_DETAIL)) {
		return { key: "general.form.toasts.save.errors.default_not_accepted" };
	}

	for (const [prefix, key] of CURRENCY_ERROR_PREFIXES) {
		if (detail.startsWith(prefix)) {
			return { key, currency: detail.slice(prefix.length).trim() };
		}
	}

	return { key: "general.form.toasts.save.error" };
};
