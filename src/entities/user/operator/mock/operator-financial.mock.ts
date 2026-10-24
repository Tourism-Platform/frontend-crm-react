import { ENUM_CURRENCY_BACKEND } from "@/entities/commission/types/currency.types";
import type { TOperatorFinanceInfoBackend } from "@/entities/finance/finance-information/types/operator-finance-info-backend.interface";

export const OPERATOR_FINANCIAL_MOCK: TOperatorFinanceInfoBackend = {
	default_currency: ENUM_CURRENCY_BACKEND.USD,
	accepted_currencies: [
		ENUM_CURRENCY_BACKEND.USD,
		ENUM_CURRENCY_BACKEND.EUR,
		ENUM_CURRENCY_BACKEND.UZS
	],
	fx_margin: "0.02",
	vat_enabled: true,
	vat_rate: "12",
	profit_tax_enabled: false,
	profit_tax_rate: "0",
	default_markup: { typ: "percentage", percentage: 15 },
	default_staff_commission: { typ: "percentage", percentage: 5 }
};
