import type { OperatorFxRateModel } from "@/shared/api";

import { CURRENCY_SEED } from "./currency.seed";

export const MOCK_OPERATOR_ID = "a0000000-0000-4000-8000-000000000001";

export const CURRENCY_MOCK: OperatorFxRateModel[] = CURRENCY_SEED.map(
	(item, index) => ({
		id: `c0000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
		operator_id: MOCK_OPERATOR_ID,
		from_currency: item.from_currency,
		to_currency: item.to_currency,
		rate: String(item.rate),
		valid_from: "2026-01-01T00:00:00Z",
		created_by: null
	})
);
