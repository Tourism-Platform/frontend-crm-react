import { HttpResponse } from "msw";

import { FX_PATHS, createMockHandler, getQueryList } from "@/shared/api";

import { CURRENCY_MOCK } from "../mock/currency.mock";

/** Курсы только читаются: справочные курсы + маржа оператора считает бэкенд */
export const fxRateHandlers = [
	// scope в моке не учитываем: принимаемых валют оператора тут нет
	createMockHandler(FX_PATHS.listOperatorRates, ({ query }) => {
		const from = getQueryList(query, "from_currency");
		const to = getQueryList(query, "to_currency");

		return HttpResponse.json(
			CURRENCY_MOCK.filter(
				(rate) =>
					(!from.length || from.includes(rate.from_currency)) &&
					(!to.length || to.includes(rate.to_currency))
			)
		);
	}),

	// Синхронизация справочных курсов (админ): в моке курсы уже актуальны
	createMockHandler(FX_PATHS.syncReferenceRates, () =>
		HttpResponse.json({ inserted: [], missing: [] })
	)
];
