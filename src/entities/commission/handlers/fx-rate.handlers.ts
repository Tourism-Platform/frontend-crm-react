import { HttpResponse } from "msw";

import {
	OPERATOR_FX_RATE_PATHS,
	createMockHandler,
	mockNoContent,
	mockNotFound,
	mockValidationError,
	toListResponse
} from "@/shared/api";

import {
	deleteFxRate,
	getFxRate,
	listFxRates,
	recordFxRate,
	updateFxRate
} from "../mock/fx-rate.store";

const FX_RATE_NOT_FOUND = "FX rate not found";

const isValidRate = (rate: unknown) => Number(rate) > 0;

export const fxRateHandlers = [
	createMockHandler(OPERATOR_FX_RATE_PATHS.listFxRates, ({ query }) =>
		HttpResponse.json(
			toListResponse(
				listFxRates({
					fromCurrency: query.get("from_currency"),
					toCurrency: query.get("to_currency")
				}),
				query,
				100
			).data
		)
	),

	createMockHandler(OPERATOR_FX_RATE_PATHS.recordFxRate, ({ body }) => {
		if (!body.from_currency || !body.to_currency) {
			return mockValidationError(
				["body", "from_currency"],
				"Field required"
			);
		}
		if (!isValidRate(body.rate)) {
			return mockValidationError(
				["body", "rate"],
				"Rate must be positive"
			);
		}
		return HttpResponse.json(recordFxRate(body), { status: 201 });
	}),

	createMockHandler(
		OPERATOR_FX_RATE_PATHS.getFxRate(":fxRateId"),
		({ params }) => {
			const rate = getFxRate(String(params.fxRateId));
			return rate
				? HttpResponse.json(rate)
				: mockNotFound(FX_RATE_NOT_FOUND);
		}
	),

	createMockHandler(
		OPERATOR_FX_RATE_PATHS.updateFxRate(":fxRateId"),
		({ params, body }) => {
			if (!isValidRate(body.rate)) {
				return mockValidationError(
					["body", "rate"],
					"Rate must be positive"
				);
			}
			const rate = updateFxRate(String(params.fxRateId), body.rate);
			return rate
				? HttpResponse.json(rate)
				: mockNotFound(FX_RATE_NOT_FOUND);
		}
	),

	createMockHandler(
		OPERATOR_FX_RATE_PATHS.deleteFxRate(":fxRateId"),
		({ params }) =>
			deleteFxRate(String(params.fxRateId))
				? mockNoContent()
				: mockNotFound(FX_RATE_NOT_FOUND)
	)
];
