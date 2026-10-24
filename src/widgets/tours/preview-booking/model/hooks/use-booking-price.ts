import { useState } from "react";

import {
	useGetBookingPriceQuery,
	useGetBookingQuoteQuery
} from "@/entities/booking";
import type { ENUM_CURRENCY_OPTIONS_TYPE } from "@/entities/commission";
import type { ENUM_LANGUAGES_TYPE } from "@/entities/tour/landing";

import { resolveBookingPriceError } from "../lib";

interface IUseBookingPriceArgs {
	bookingId?: string;
	tourOptionId?: string;
	date?: Date;
	pax?: number;
	lang?: ENUM_LANGUAGES_TYPE;
}

/** До создания брони — quote, после — цена брони; валюта отображения общая */
export const useBookingPrice = ({
	bookingId,
	tourOptionId,
	date,
	pax,
	lang
}: IUseBookingPriceArgs) => {
	const [currency, setCurrency] = useState<ENUM_CURRENCY_OPTIONS_TYPE>();

	const quote = useGetBookingQuoteQuery(
		{
			tourOptionId: tourOptionId ?? "",
			date: date ?? "",
			pax: pax ?? 0,
			lang,
			currency
		},
		{ skip: !!bookingId || !tourOptionId || !date || !pax }
	);

	const price = useGetBookingPriceQuery(
		{ bookingId: bookingId ?? "", pax: pax ?? 0, currency },
		{ skip: !bookingId || !pax }
	);

	const {
		data: lastBookingPrice,
		currentData: bookingPrice,
		isFetching: isBookingPriceLoading,
		error: bookingPriceError
	} = bookingId ? price : quote;

	return {
		// currentData — без цены прошлых аргументов, когда текущий запрос упал
		bookingPrice,
		// Список валют — из последнего удачного ответа, чтобы после ошибки было куда переключиться
		displayCurrencies: lastBookingPrice?.displayCurrencies ?? [],
		// Валюта ответа; пока ответа нет — выбранная пользователем
		selectedCurrency: bookingPrice?.currency ?? currency,
		isBookingPriceLoading,
		bookingPriceErrorKey: resolveBookingPriceError(bookingPriceError),
		currency,
		setCurrency
	};
};

export type TBookingPriceState = ReturnType<typeof useBookingPrice>;
