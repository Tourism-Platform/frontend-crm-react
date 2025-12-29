import { z } from "zod";

import { PRICING_VISIBILITY_OPTIONS } from "@/shared/config";

import { CURRENCY_OPTIONS } from "@/entities/commission";

const CURRENCY_VALUES = CURRENCY_OPTIONS.map((o) => o.value) as [
	string,
	...string[]
];

const PRICING_VALUES = PRICING_VISIBILITY_OPTIONS.map((o) => o.value) as [
	string,
	...string[]
];

export const FINANCE_FORM_SCHEMA = z.object({
	currencyType: z.enum(CURRENCY_VALUES, {
		message: "finance.form.errors.currencyType.required"
	}),
	pricingVisibility: z.enum(PRICING_VALUES, {
		message: "finance.form.errors.pricingVisibility.required"
	})
});
