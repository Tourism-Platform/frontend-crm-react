import { useMemo } from "react";

import { isNotFoundError } from "@/shared/api";

import { CURRENCY_OPTIONS, pickCurrencyOptions } from "@/entities/commission";

import { useGetOperatorFinanceInfoQuery } from "../api";

/**
 * Опции валют оператора — только принятые.
 * Пока грузится или запрос упал — пусто; настроек ещё нет (null / 404) — все.
 */
export const useAcceptedCurrencyOptions = () => {
	const {
		data: financeInfo,
		isLoading: isCurrencyOptionsLoading,
		isError,
		error
	} = useGetOperatorFinanceInfoQuery();
	const isRealError = isError && !isNotFoundError(error);

	const currencyOptions = useMemo(() => {
		if (isCurrencyOptionsLoading || isRealError) return [];
		if (!financeInfo) return CURRENCY_OPTIONS;

		return pickCurrencyOptions(financeInfo.acceptedCurrencies);
	}, [isCurrencyOptionsLoading, isRealError, financeInfo]);

	return { currencyOptions, isCurrencyOptionsLoading };
};
