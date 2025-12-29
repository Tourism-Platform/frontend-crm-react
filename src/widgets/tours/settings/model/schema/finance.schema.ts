import { z } from "zod";

import { CURRENCY_OPTIONS, PRICING_VISIBILITY_OPTIONS } from "@/shared/config";

const CURRENCY_VALUES = CURRENCY_OPTIONS.map((o) => o.value) as [
	string,
	...string[]
];

const PRICING_VALUES = PRICING_VISIBILITY_OPTIONS.map((o) => o.value) as [
	string,
	...string[]
];

export const FINANCE_FORM_SCHEMA = z.object({
	currencyType: z.enum(CURRENCY_VALUES),
	pricingVisibility: z.enum(PRICING_VALUES)
});

export type TFinanceFormSchema = z.infer<typeof FINANCE_FORM_SCHEMA>;
