import {
	type ENUM_CURRENCY_OPTIONS_TYPE,
	currencyConverter
} from "@/entities/commission";

import {
	ENUM_ACTIVITY_MARKUP_TYP,
	ENUM_ACTIVITY_PRICING_FIELD,
	ENUM_ACTIVITY_PRICING_INVOICING,
	ENUM_ACTIVITY_PRICING_TYPE,
	type IActivityPriceRowMarkup,
	type TActivityDetailsBackend,
	type TActivityPricingSchema,
	type TCommissionMarkupBackend,
	type TCommissionMarkupInputBackend
} from "../../types";

const mapMarkupFromBackend = (
	markup?: TCommissionMarkupBackend | null
): IActivityPriceRowMarkup | null => {
	if (!markup) return null;
	if (markup.typ === "percentage") {
		return {
			typ: ENUM_ACTIVITY_MARKUP_TYP.PERCENTAGE,
			value: String((markup.percentage ?? 0) * 100)
		};
	}
	return {
		typ: ENUM_ACTIVITY_MARKUP_TYP.FIXED,
		value: String(markup.cost?.val ?? "")
	};
};

const mapMarkupToBackend = (
	markup: IActivityPriceRowMarkup | null,
	rowCurrency: ENUM_CURRENCY_OPTIONS_TYPE,
	addMarginSeparately: boolean
): TCommissionMarkupInputBackend | null => {
	if (!addMarginSeparately || !markup?.value) return null;
	if (markup.typ === ENUM_ACTIVITY_MARKUP_TYP.PERCENTAGE) {
		return {
			typ: "percentage",
			percentage: Number(markup.value) / 100
		};
	}
	return {
		typ: "fixed",
		cost: {
			val: Number(markup.value),
			currency: currencyConverter.to(rowCurrency)!
		}
	};
};

const getDefaultActivityPricing = (): TActivityPricingSchema => ({
	invoicing: ENUM_ACTIVITY_PRICING_INVOICING.INDIVIDUAL,
	pricing_type: ENUM_ACTIVITY_PRICING_TYPE.FLAT_RATE,
	add_margin_separately: false,
	markup: null,
	package_type: ""
});

export const mapActivityPricingFromBackend = (
	details?: TActivityDetailsBackend | null
): TActivityPricingSchema => {
	const expenses = details?.expenses;
	const defaults = getDefaultActivityPricing();

	if (!expenses) {
		return defaults;
	}

	const feesVal = expenses.fees?.cost?.val;

	if (expenses.typ === "fixed") {
		const markup = mapMarkupFromBackend(expenses.markup);
		return {
			...defaults,
			pricing_type: ENUM_ACTIVITY_PRICING_TYPE.FLAT_RATE,
			add_margin_separately: Boolean(markup?.value),
			[ENUM_ACTIVITY_PRICING_FIELD.MARKUP]: markup,
			...(expenses.cost?.val != null && {
				total_price: expenses.cost.val
			}),
			...(feesVal != null && { taxes: feesVal }),
			...(expenses.cost?.currency && {
				currency: currencyConverter.from(expenses.cost.currency)
			})
		};
	}

	const perPersonMarkup = mapMarkupFromBackend(expenses.markup);
	return {
		...defaults,
		pricing_type: ENUM_ACTIVITY_PRICING_TYPE.PER_PERSON,
		add_margin_separately: Boolean(perPersonMarkup?.value),
		[ENUM_ACTIVITY_PRICING_FIELD.MARKUP]: perPersonMarkup,
		...(expenses.cost_per_person?.val != null && {
			total_price: expenses.cost_per_person.val
		}),
		...(feesVal != null && { taxes: feesVal }),
		...(expenses.cost_per_person?.currency && {
			currency: currencyConverter.from(expenses.cost_per_person.currency)
		})
	};
};

export const mapActivityPricingToBackend = (
	pricing?: TActivityPricingSchema
): { details?: Pick<TActivityDetailsBackend, "expenses"> } => {
	if (
		!pricing ||
		pricing.invoicing !== ENUM_ACTIVITY_PRICING_INVOICING.INDIVIDUAL
	) {
		return {};
	}

	const totalPrice = pricing[ENUM_ACTIVITY_PRICING_FIELD.TOTAL_PRICE];
	const currency = pricing[ENUM_ACTIVITY_PRICING_FIELD.CURRENCY];
	const taxes = pricing[ENUM_ACTIVITY_PRICING_FIELD.TAXES];

	if (totalPrice == null || !currency) {
		return {};
	}

	const cost = {
		val: totalPrice,
		currency: currencyConverter.to(currency)!
	};
	const fees =
		taxes != null
			? {
					typ: "fixed" as const,
					cost: {
						val: taxes,
						currency: currencyConverter.to(currency)!
					}
				}
			: null;
	const markup = mapMarkupToBackend(
		pricing[ENUM_ACTIVITY_PRICING_FIELD.MARKUP] ?? null,
		currency,
		pricing.add_margin_separately
	);

	if (pricing.pricing_type === ENUM_ACTIVITY_PRICING_TYPE.FLAT_RATE) {
		return {
			details: {
				expenses: { typ: "fixed", cost, fees, markup }
			}
		};
	}

	return {
		details: {
			expenses: { typ: "per_person", cost_per_person: cost, fees, markup }
		}
	};
};
