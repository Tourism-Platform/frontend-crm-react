import { CURRENCY_MOCK } from "@/entities/commission/mock/currency.mock";
import {
	ENUM_CURRENCY_BACKEND,
	type ENUM_CURRENCY_BACKEND_TYPE
} from "@/entities/commission/types/currency.types";
import { ENUM_LANGUAGES_BACKEND } from "@/entities/tour/landing/types/languages.types";
import { getOperatorFinancials } from "@/entities/user/operator/mock/operator.store";

import type {
	TBookingPriceBackend,
	TBookingQuoteBackend,
	TBookingQuoteQueryBackend
} from "../types";

import { MOCK_PRICE_PER_PAX_USD } from "./booking-order.mock.constants";
import { getBookingOrderDetail } from "./booking-order.store";

const NO_BANK_RATE = "No bank FX rate is available yet for this currency pair";

interface IFxSnapshot {
	displayCurrencies: ENUM_CURRENCY_BACKEND_TYPE[];
	fxMargin: number;
}

/** Как бэк: принятые оператором валюты + USD, по алфавиту; маржа — текущая */
const getCurrentFxSnapshot = (): IFxSnapshot => {
	const financials = getOperatorFinancials();

	return {
		displayCurrencies: [
			...new Set([
				...(financials?.accepted_currencies ?? []),
				ENUM_CURRENCY_BACKEND.USD
			])
		].sort(),
		fxMargin: Number(financials?.fx_margin ?? 0)
	};
};

// Бронь замораживает валюты и маржу; события создания в моке нет — фиксируем при первом чтении цены
const frozenFxSnapshots = new Map<string, IFxSnapshot>();

const getFrozenFxSnapshot = (bookingId: string): IFxSnapshot => {
	const frozen = frozenFxSnapshots.get(bookingId);
	if (frozen) return frozen;

	const snapshot = getCurrentFxSnapshot();
	frozenFxSnapshots.set(bookingId, snapshot);
	return snapshot;
};

export const resetBookingPriceStore = () => {
	frozenFxSnapshots.clear();
};

/** Непринятая валюта молча заменяется на USD */
const resolveCurrency = (
	requested: string | null,
	displayCurrencies: ENUM_CURRENCY_BACKEND_TYPE[]
): ENUM_CURRENCY_BACKEND_TYPE =>
	displayCurrencies.find((currency) => currency === requested) ??
	ENUM_CURRENCY_BACKEND.USD;

/**
 * USD → валюта; null — у «банка» нет курса.
 * Курс в моке X→USD (USD = X × rate), значит X = USD / rate; маржа сдвигает сумму в пользу оператора — клиент платит больше.
 */
const convertFromUsd = (
	amountUsd: number,
	currency: ENUM_CURRENCY_BACKEND_TYPE,
	fxMargin: number
): string | null => {
	if (currency === ENUM_CURRENCY_BACKEND.USD) return amountUsd.toFixed(2);
	const rate = CURRENCY_MOCK.find(
		(item) =>
			item.from_currency === currency &&
			item.to_currency === ENUM_CURRENCY_BACKEND.USD
	);
	if (!rate) return null;
	return ((amountUsd / Number(rate.rate)) * (1 + fxMargin)).toFixed(2);
};

export const getBookingQuote = (
	query: TBookingQuoteQueryBackend,
	requestedCurrency: string | null
): TBookingQuoteBackend | string => {
	const { displayCurrencies, fxMargin } = getCurrentFxSnapshot();
	const currency = resolveCurrency(requestedCurrency, displayCurrencies);
	const total = convertFromUsd(
		query.pax * MOCK_PRICE_PER_PAX_USD,
		currency,
		fxMargin
	);
	if (total === null) return NO_BANK_RATE;

	return {
		tour_option_id: query.tour_option_id,
		date: query.date,
		pax: query.pax,
		lang: query.lang ?? ENUM_LANGUAGES_BACKEND.ENGLISH,
		currency,
		total_min_price: total,
		display_currencies: displayCurrencies
	};
};

export const getBookingPrice = (
	bookingId: string,
	pax: number,
	requestedCurrency: string | null
): TBookingPriceBackend | string | undefined => {
	const detail = getBookingOrderDetail(bookingId);
	if (!detail) return undefined;

	// Для брони «принятые» — валюты, замороженные вместе с бронью
	const { displayCurrencies, fxMargin } = getFrozenFxSnapshot(bookingId);
	const currency = resolveCurrency(requestedCurrency, displayCurrencies);
	const total = convertFromUsd(
		(Number(detail.order.tour_amount) / detail.order.pax) * pax,
		currency,
		fxMargin
	);
	if (total === null) return NO_BANK_RATE;

	return {
		booking_id: bookingId,
		pax,
		currency,
		total_min_price: total,
		display_currencies: displayCurrencies
	};
};
