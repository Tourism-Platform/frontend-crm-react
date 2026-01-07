import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import { ENUM_PRICING_VISIBILITY } from "../types";
import type { ITourFinanceBackend } from "../types";

export const TOUR_FINANCE_MOCK: ITourFinanceBackend = {
	id: "9f2b3d82-5c4d-4b9f-9f7a-1a42e71d1b11",
	currency_type: ENUM_CURRENCY_OPTIONS.USD,
	pricing_visibility: ENUM_PRICING_VISIBILITY.SHOW_FROM
};
