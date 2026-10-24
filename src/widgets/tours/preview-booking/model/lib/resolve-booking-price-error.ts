import { isNoFxRateError } from "@/shared/api";

type TBookingPriceErrorKey =
	| "sidebar.errors.no_fx_rate"
	| "sidebar.errors.price_failed";

/** Returns i18n key only — call site does `t(key)`. */
export const resolveBookingPriceError = (
	error: unknown
): TBookingPriceErrorKey | null => {
	if (!error) return null;

	return isNoFxRateError(error)
		? "sidebar.errors.no_fx_rate"
		: "sidebar.errors.price_failed";
};
