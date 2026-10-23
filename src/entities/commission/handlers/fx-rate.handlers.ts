import { HttpResponse } from "msw";

import { FX_PATHS, createMockHandler } from "@/shared/api";

import { CURRENCY_MOCK } from "../mock/currency.mock";

/** Курсы только читаются: справочные курсы + маржа оператора считает бэкенд */
export const fxRateHandlers = [
	createMockHandler(FX_PATHS.listOperatorRates, () =>
		HttpResponse.json(CURRENCY_MOCK)
	),

	// Синхронизация справочных курсов (админ): в моке курсы уже актуальны
	createMockHandler(FX_PATHS.syncReferenceRates, () =>
		HttpResponse.json({ inserted: [], missing: [] })
	)
];
