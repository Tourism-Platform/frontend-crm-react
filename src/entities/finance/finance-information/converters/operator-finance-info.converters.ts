import { currencyConverter } from "@/entities/commission";

import type {
	TOperatorFinanceInfoBackend,
	TOperatorFinanceInfoBackendUpdate
} from "../types";
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

	defaultCurrency: currencyConverter.from(backend.default_currency)!,
	acceptedCurrencies: currencyConverter.fromMany(backend.accepted_currencies),
	fxMargin: Number((Number(backend.fx_margin) * 100).toFixed(2)),

	vatEnabled: backend.vat_enabled,
	vatRate: Number(backend.vat_rate ?? 0),
	profitTaxEnabled: backend.profit_tax_enabled,
	profitTaxRate: Number(backend.profit_tax_rate ?? 0)
});

export const mapOperatorFinanceInfoToBackend = (
	frontend: Partial<TOperatorFinanceInfo>
): TOperatorFinanceInfoBackendUpdate => ({
	...(frontend.defaultCurrency && {
		default_currency: currencyConverter.to(frontend.defaultCurrency)
	}),

	...(frontend.acceptedCurrencies && {
		accepted_currencies: currencyConverter.toMany(
			frontend.acceptedCurrencies
		)
	}),

	// 0 — валидная маржа, поэтому проверка на undefined, а не на truthy
	...(frontend.fxMargin !== undefined && {
		fx_margin: String(Number((frontend.fxMargin / 100).toFixed(4)))
	}),

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
