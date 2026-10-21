import { useCallback } from "react";
import { useSearchParams } from "react-router";

import { ENUM_PATH, parseQueryByRoute } from "@/shared/config";

import {
	ENUM_CURRENCY_OPTIONS,
	type ENUM_CURRENCY_OPTIONS_TYPE
} from "@/entities/commission";

const CURRENCIES = Object.values(ENUM_CURRENCY_OPTIONS) as string[];

const isCurrency = (value?: string): value is ENUM_CURRENCY_OPTIONS_TYPE =>
	Boolean(value && CURRENCIES.includes(value));

/** Валюта цен превью — `?currency=` переносится между страницами тура и опции */
export const usePreviewCurrency = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const query =
		parseQueryByRoute<typeof ENUM_PATH.TOURS.CATALOG.PREVIEW_TOUR>(
			searchParams
		);

	const currency = isCurrency(query.currency)
		? query.currency
		: ENUM_CURRENCY_OPTIONS.USD;

	const setCurrency = useCallback(
		(next: string) => {
			if (!isCurrency(next)) return;

			setSearchParams(
				(prev) => {
					const params = new URLSearchParams(prev);
					params.set("currency", next);
					return params;
				},
				{ replace: true }
			);
		},
		[setSearchParams]
	);

	return { currency, setCurrency };
};
