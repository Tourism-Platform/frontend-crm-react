import { Currency, type OperatorFinancialSettingsRead } from "@/shared/api";

export const OPERATOR_FINANCIAL_MOCK: OperatorFinancialSettingsRead = {
	default_currency: Currency.USD,
	accepted_currencies: [Currency.USD, Currency.EUR, Currency.UZS],
	fx_margin: "0.02",
	vat_enabled: true,
	vat_rate: "12",
	profit_tax_enabled: false,
	profit_tax_rate: "0",
	default_markup: { typ: "percentage", percentage: 15 },
	default_staff_commission: { typ: "percentage", percentage: 5 }
};
