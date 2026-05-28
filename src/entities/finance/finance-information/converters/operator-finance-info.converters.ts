import type { TOperatorFinanceInfoBackend } from "../types";
import type { TOperatorFinanceInfo } from "../types";

export const mapOperatorFinanceInfoToFrontend = (
	backend: TOperatorFinanceInfoBackend
): TOperatorFinanceInfo => ({
	tourMargin:
		backend.default_markup?.typ === "percentage"
			? (backend.default_markup.percentage ?? 0) * 100
			: 0,

	staffPayouts:
		backend.default_staff_commission?.typ === "percentage"
			? (backend.default_staff_commission.percentage ?? 0) * 100
			: 0,

	vatEnabled: backend.vat_enabled,
	vatRate: Number(backend.vat_rate ?? 0),
	profitTaxEnabled: backend.profit_tax_enabled,
	profitTaxRate: Number(backend.profit_tax_rate ?? 0)
});

export const mapOperatorFinanceInfoToBackend = (
	frontend: Partial<TOperatorFinanceInfo>
): Partial<TOperatorFinanceInfoBackend> => ({
	...(frontend.vatEnabled !== undefined && {
		vat_enabled: frontend.vatEnabled
	}),

	...(!!frontend.vatRate && {
		vat_rate: frontend.vatRate.toString()
	}),

	...(frontend.profitTaxEnabled !== undefined && {
		profit_tax_enabled: frontend.profitTaxEnabled
	}),

	...(!!frontend.profitTaxRate && {
		profit_tax_rate: frontend.profitTaxRate.toString()
	}),

	...(!!frontend.tourMargin && {
		default_markup: {
			typ: "percentage",
			percentage: frontend.tourMargin / 100
		}
	}),

	...(!!frontend.staffPayouts && {
		default_staff_commission: {
			typ: "percentage",
			percentage: frontend.staffPayouts / 100
		}
	})
});
