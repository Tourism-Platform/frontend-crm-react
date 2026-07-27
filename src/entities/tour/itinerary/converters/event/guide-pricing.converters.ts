import type {
	GuideByLanguageCategoryInput,
	GuideByLanguageCategoryOutput,
	GuideDetailsOutput
} from "@/shared/api";
import { Currency } from "@/shared/api";

import { languageMapper } from "@/entities/tour/landing/converters/languages.converters";
import { ENUM_LANGUAGES } from "@/entities/tour/landing/types/languages.types";

import {
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_CATEGORY_ROW_FIELD,
	ENUM_GUIDE_EXPENSE_TYP,
	ENUM_GUIDE_MARKUP_TYP,
	ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD,
	ENUM_GUIDE_PRICE_ROW_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	ENUM_GUIDE_PRICING_INVOICING,
	ENUM_GUIDE_PRICING_TYPE,
	type IGuideCategoryPriceRow,
	type IGuidePerGuideByLanguagePriceRow,
	type IGuidePerGuideCategoryExpenses,
	type IGuidePerGuideExpenses,
	type IGuidePerGuidePriceRow,
	type IGuidePriceRowMarkup,
	type TGuidePricingSchema,
	type TGuidesSchema
} from "../../types";

type TGuidesList = TGuidesSchema[typeof ENUM_FORM_GUIDES.GUIDES_LIST];

const createEmptyPerGuidePriceRow = (): IGuidePerGuidePriceRow => ({
	[ENUM_GUIDE_PRICE_ROW_FIELD.COST]: null,
	[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]: null,
	[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]: Currency.USD,
	[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: null
});

const createEmptyCategoryRow = (): IGuideCategoryPriceRow => ({
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.LANG]: "",
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.COST]: null,
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.FEES]: null,
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.CURRENCY]: Currency.USD,
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.MARKUP]: null
});

const createEmptyPerGuideByLanguagePriceRow =
	(): IGuidePerGuideByLanguagePriceRow => ({
		[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]: [
			createEmptyCategoryRow()
		]
	});

const mapCategoryRowFromBackend = (
	category: GuideByLanguageCategoryOutput
): IGuideCategoryPriceRow => {
	const cost = category.expenses?.cost_per_person?.val ?? null;
	const currency = category.expenses?.cost_per_person?.currency ?? "";

	return {
		[ENUM_GUIDE_CATEGORY_ROW_FIELD.LANG]:
			languageMapper.from(category.lang) ?? "",
		[ENUM_GUIDE_CATEGORY_ROW_FIELD.COST]: cost,
		[ENUM_GUIDE_CATEGORY_ROW_FIELD.FEES]: null,
		[ENUM_GUIDE_CATEGORY_ROW_FIELD.CURRENCY]: currency,
		[ENUM_GUIDE_CATEGORY_ROW_FIELD.MARKUP]: mapMarkupFromBackend(
			category.markup
		)
	};
};

const mapMarkupFromBackend = (
	markup?: GuideByLanguageCategoryOutput["markup"]
): IGuidePriceRowMarkup | null => {
	if (!markup) return null;
	if (markup.typ === "percentage") {
		return {
			typ: ENUM_GUIDE_MARKUP_TYP.PERCENTAGE,
			value: String((markup.percentage ?? 0) * 100)
		};
	}
	return {
		typ: ENUM_GUIDE_MARKUP_TYP.FIXED,
		value: String(markup.cost?.val ?? "")
	};
};

const alignPerGuidePriceRows = (
	guidesListLength: number,
	existing: IGuidePerGuidePriceRow[] = [],
	apiRows?: GuideByLanguageCategoryOutput[] | null
): IGuidePerGuidePriceRow[] =>
	Array.from({ length: guidesListLength }, (_, index) => {
		if (existing[index]) {
			return existing[index];
		}
		const apiRow = apiRows?.[index];
		if (apiRow) {
			const mapped = mapCategoryRowFromBackend(apiRow);
			return {
				[ENUM_GUIDE_PRICE_ROW_FIELD.COST]:
					mapped[ENUM_GUIDE_CATEGORY_ROW_FIELD.COST],
				[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]:
					mapped[ENUM_GUIDE_CATEGORY_ROW_FIELD.FEES],
				[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]:
					mapped[ENUM_GUIDE_CATEGORY_ROW_FIELD.CURRENCY],
				[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]:
					mapped[ENUM_GUIDE_CATEGORY_ROW_FIELD.MARKUP]
			};
		}
		return createEmptyPerGuidePriceRow();
	});

const alignPerGuideByLanguagePriceRows = (
	guidesListLength: number,
	existing: IGuidePerGuideByLanguagePriceRow[] = [],
	apiCategories?: GuideByLanguageCategoryOutput[] | null
): IGuidePerGuideByLanguagePriceRow[] => {
	if (guidesListLength <= 0) {
		return [];
	}

	if (existing.length === guidesListLength) {
		return existing;
	}

	const categories =
		apiCategories?.length && existing.length === 0
			? apiCategories.map((category) => ({
					[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]: [
						mapCategoryRowFromBackend(category)
					]
				}))
			: [];

	if (categories.length === guidesListLength) {
		return categories;
	}

	return Array.from({ length: guidesListLength }, (_, index) => {
		if (existing[index]) {
			return existing[index];
		}
		if (categories[index]) {
			return categories[index];
		}
		return createEmptyPerGuideByLanguagePriceRow();
	});
};

const mapMarkupToBackend = (
	markup: IGuidePriceRowMarkup | null,
	rowCurrency: string,
	addMarginSeparately: boolean
): GuideByLanguageCategoryInput["markup"] => {
	if (!addMarginSeparately || !markup?.value) return null;
	if (markup.typ === ENUM_GUIDE_MARKUP_TYP.PERCENTAGE) {
		return {
			typ: "percentage",
			percentage: Number(markup.value) / 100
		};
	}
	if (!rowCurrency) return null;
	return {
		typ: "fixed",
		cost: {
			val: Number(markup.value),
			currency: rowCurrency as Currency
		}
	};
};

const applyMarkupToPerGuideExpenses = (
	expenses: IGuidePerGuideExpenses | IGuidePerGuideCategoryExpenses,
	addMarginSeparately: boolean
): IGuidePerGuideExpenses | IGuidePerGuideCategoryExpenses => {
	if (addMarginSeparately) {
		return expenses;
	}

	if (expenses.typ === ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE) {
		return {
			...expenses,
			[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: expenses[
				ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES
			].map((guide) => ({
				...guide,
				[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: null
			}))
		};
	}

	return {
		...expenses,
		[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: expenses[
			ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES
		].map((guide) => ({
			...guide,
			[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]: guide[
				ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES
			].map((category) => ({
				...category,
				[ENUM_GUIDE_CATEGORY_ROW_FIELD.MARKUP]: null
			}))
		}))
	};
};

const hasAnyMarkup = (
	rows: {
		[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]: IGuidePriceRowMarkup | null;
	}[]
) => rows.some((row) => row[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP]?.value);

const toFiniteNumber = (value: unknown): number | null => {
	if (value == null || value === "") return null;
	const parsed = typeof value === "number" ? value : Number(value);
	return Number.isFinite(parsed) ? parsed : null;
};

const mapRowToBackendCategory = (
	row: IGuidePerGuidePriceRow | IGuideCategoryPriceRow,
	addMargin: boolean,
	lang?: string
): GuideByLanguageCategoryInput | null => {
	const rowCurrency = row[ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY]?.trim() ?? "";
	const cost = toFiniteNumber(row[ENUM_GUIDE_PRICE_ROW_FIELD.COST]);
	const fees = toFiniteNumber(row[ENUM_GUIDE_PRICE_ROW_FIELD.FEES]);
	const total =
		cost != null && fees != null ? cost + fees : cost != null ? cost : fees;
	const hasExpenses = total != null;

	const langCode =
		"lang" in row && row.lang
			? languageMapper.to(row.lang as typeof ENUM_LANGUAGES.ENGLISH)
			: lang
				? languageMapper.to(lang as typeof ENUM_LANGUAGES.ENGLISH)
				: undefined;

	const markup = mapMarkupToBackend(
		row[ENUM_GUIDE_PRICE_ROW_FIELD.MARKUP],
		rowCurrency,
		addMargin
	);

	// Backend: lang/expenses/markup are all optional. Skip fully empty synced rows.
	if (!langCode && !hasExpenses && !markup) {
		return null;
	}

	return {
		...(langCode && { lang: langCode }),
		...(hasExpenses && {
			expenses: {
				typ: "per_person" as const,
				cost_per_person: {
					val: total as number,
					// currency optional on backend (default USD)
					...(rowCurrency && { currency: rowCurrency as Currency })
				}
			}
		}),
		...(markup && { markup })
	};
};

export const alignGuidePerGuideExpenses = (options: {
	priceByLanguage: boolean;
	guidesListLength: number;
	current?: TGuidePricingSchema["expenses"] | null;
	addMarginSeparately?: boolean;
}): IGuidePerGuideExpenses | IGuidePerGuideCategoryExpenses => {
	const { priceByLanguage, guidesListLength, current, addMarginSeparately } =
		options;

	let aligned: IGuidePerGuideExpenses | IGuidePerGuideCategoryExpenses;

	if (priceByLanguage) {
		const existing =
			current?.typ === ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE_CATEGORY
				? current[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]
				: [];

		aligned = {
			typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE_CATEGORY,
			[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]:
				alignPerGuideByLanguagePriceRows(guidesListLength, existing)
		};
	} else {
		const existing =
			current?.typ === ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE
				? current[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]
				: [];

		aligned = {
			typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE,
			[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]:
				alignPerGuidePriceRows(guidesListLength, existing)
		};
	}

	if (addMarginSeparately === undefined) {
		return aligned;
	}

	return applyMarkupToPerGuideExpenses(aligned, addMarginSeparately);
};

export const getDefaultGuidePricing = (
	guidesList: TGuidesList = []
): TGuidePricingSchema => ({
	[ENUM_GUIDE_PRICING_FIELD.INVOICING]:
		ENUM_GUIDE_PRICING_INVOICING.INDIVIDUAL,
	[ENUM_GUIDE_PRICING_FIELD.PRICING_TYPE]: ENUM_GUIDE_PRICING_TYPE.PER_GUIDE,
	[ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE]: true,
	[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: false,
	[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: alignGuidePerGuideExpenses({
		priceByLanguage: true,
		guidesListLength: guidesList.length
	}),
	[ENUM_GUIDE_PRICING_FIELD.PACKAGE_TYPE]: ""
});

export const mapGuidePricingFromBackend = (
	details?: GuideDetailsOutput | null,
	guidesList: TGuidesList = []
): TGuidePricingSchema => {
	const categories = details?.categories ?? [];
	const defaults = getDefaultGuidePricing(guidesList);

	if (!categories.length) {
		return defaults;
	}

	const hasMultipleCategories = categories.length > 1;
	const priceByLanguage =
		hasMultipleCategories ||
		Boolean(categories[0]?.lang && categories.length >= 1);

	if (priceByLanguage) {
		const guides = alignPerGuideByLanguagePriceRows(
			Math.max(guidesList.length, 1),
			[],
			categories
		);
		const flatCategories = guides.flatMap(
			(guide) => guide[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]
		);

		return {
			...defaults,
			[ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE]: true,
			[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]:
				hasAnyMarkup(flatCategories),
			[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: {
				typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE_CATEGORY,
				[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: guides
			}
		};
	}

	const guides = alignPerGuidePriceRows(
		Math.max(guidesList.length, 1),
		[],
		categories
	);

	return {
		...defaults,
		[ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE]: false,
		[ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY]: hasAnyMarkup(guides),
		[ENUM_GUIDE_PRICING_FIELD.EXPENSES]: {
			typ: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE,
			[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]: guides
		}
	};
};

export const mapGuideCategoriesToBackend = (
	pricing?: TGuidePricingSchema,
	guidesListLength = 0
): GuideByLanguageCategoryInput[] => {
	if (
		!pricing ||
		pricing.invoicing !== ENUM_GUIDE_PRICING_INVOICING.INDIVIDUAL ||
		pricing.pricing_type !== ENUM_GUIDE_PRICING_TYPE.PER_GUIDE
	) {
		return [];
	}

	const addMargin = pricing.add_margin_separately;
	const aligned = alignGuidePerGuideExpenses({
		priceByLanguage: pricing.price_by_language,
		guidesListLength,
		current: pricing.expenses
	});

	if (aligned.typ === ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE_CATEGORY) {
		return aligned[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES].flatMap(
			(guide) =>
				guide[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.CATEGORIES]
					.map((category) =>
						mapRowToBackendCategory(category, addMargin)
					)
					.filter(Boolean) as GuideByLanguageCategoryInput[]
		);
	}

	return aligned[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]
		.map((row) => mapRowToBackendCategory(row, addMargin))
		.filter(Boolean) as GuideByLanguageCategoryInput[];
};
