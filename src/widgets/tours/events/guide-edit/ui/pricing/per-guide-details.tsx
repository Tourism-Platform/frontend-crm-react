import { type FC, useEffect } from "react";
import { type UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Checkbox, Label, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_EXPENSE_TYP,
	ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	type TGuideEditSchema,
	alignGuidePerGuideExpenses
} from "@/entities/tour";

import { ENUM_FORM_SECTION } from "../../model";

import { PerGuideByLanguageCard } from "./per-guide-by-language-card";
import { PerGuideCard } from "./per-guide-card";

const syncPerGuideExpenses = (form: UseFormReturn<TGuideEditSchema>) => {
	const priceByLanguage = form.getValues(
		`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE}`
	);
	const expectedTyp = priceByLanguage
		? ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE_CATEGORY
		: ENUM_GUIDE_EXPENSE_TYP.PER_GUIDE;
	const expenses = form.getValues(
		`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.EXPENSES}`
	);
	const guidesListLength =
		form.getValues(
			`${ENUM_FORM_SECTION.GUIDES}.${ENUM_FORM_GUIDES.GUIDES_LIST}`
		)?.length ?? 0;

	if (
		expenses?.typ === expectedTyp &&
		expenses[ENUM_GUIDE_PER_GUIDE_EXPENSES_FIELD.GUIDES]?.length ===
			guidesListLength
	) {
		return;
	}

	form.setValue(
		`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.EXPENSES}`,
		alignGuidePerGuideExpenses({
			priceByLanguage,
			guidesListLength,
			current: expenses,
			...(form.getValues(
				`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`
			) && { addMarginSeparately: true })
		})
	);
};

const PerGuideDetailsBase: FC<{
	form: UseFormReturn<TGuideEditSchema>;
}> = ({ form }) => {
	const { t } = useTranslation("guide_edit_page");

	const guidesList = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.GUIDES}.${ENUM_FORM_GUIDES.GUIDES_LIST}`
	});
	const priceByLanguage = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE}`
	});
	const addMarginSeparately = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`
	});

	useEffect(() => {
		syncPerGuideExpenses(form);
	}, [guidesList, priceByLanguage, form]);

	const handlePriceByLanguageChange = (checked: boolean) => {
		form.setValue(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.PRICE_BY_LANGUAGE}`,
			checked
		);
		form.setValue(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.EXPENSES}`,
			alignGuidePerGuideExpenses({
				priceByLanguage: checked,
				guidesListLength: guidesList?.length ?? 0,
				...(addMarginSeparately && { addMarginSeparately: true }),
				current: form.getValues(
					`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.EXPENSES}`
				)
			})
		);
	};

	const handleAddMarginSeparatelyChange = (checked: boolean) => {
		form.setValue(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`,
			checked
		);
		form.setValue(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.EXPENSES}`,
			alignGuidePerGuideExpenses({
				priceByLanguage: Boolean(priceByLanguage),
				guidesListLength: guidesList?.length ?? 0,
				addMarginSeparately: checked,
				current: form.getValues(
					`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.EXPENSES}`
				)
			})
		);
	};

	if (!guidesList?.length) {
		return (
			<p className="text-sm text-muted-foreground">
				{t("form.pricing.form.per_guide.empty_guides")}
			</p>
		);
	}

	return (
		<div className="grid gap-4">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<h3 className="text-lg">
					{t("form.pricing.form.pricing_details.title")}
				</h3>
				<div className="flex flex-wrap gap-6">
					<div className="flex items-center gap-2">
						<Checkbox
							id="price-by-language"
							checked={Boolean(priceByLanguage)}
							onCheckedChange={(checked) =>
								handlePriceByLanguageChange(Boolean(checked))
							}
						/>
						<Label htmlFor="price-by-language">
							{t(
								"form.pricing.form.per_guide.checkboxes.price_by_language"
							)}
						</Label>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox
							id="add-margin-separately"
							checked={Boolean(addMarginSeparately)}
							onCheckedChange={(checked) =>
								handleAddMarginSeparatelyChange(
									Boolean(checked)
								)
							}
						/>
						<Label htmlFor="add-margin-separately">
							{t(
								"form.pricing.form.per_guide.checkboxes.add_margin_separately"
							)}
						</Label>
					</div>
				</div>
			</div>

			<div className="grid gap-4">
				{guidesList.map((_, index) =>
					priceByLanguage ? (
						<PerGuideByLanguageCard
							key={index}
							form={form}
							index={index}
							addMarginSeparately={Boolean(addMarginSeparately)}
						/>
					) : (
						<PerGuideCard
							key={index}
							form={form}
							index={index}
							addMarginSeparately={Boolean(addMarginSeparately)}
						/>
					)
				)}
			</div>
		</div>
	);
};

export const PerGuideDetails = withErrorBoundary(PerGuideDetailsBase);
