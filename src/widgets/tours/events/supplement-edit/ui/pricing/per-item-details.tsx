import { type FC, useEffect } from "react";
import { type UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Checkbox, Label, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_SUPPLEMENT_ITEMS,
	ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD,
	ENUM_SUPPLEMENT_PRICING_FIELD,
	ENUM_SUPPLEMENT_PRICING_TYPE,
	type TSupplementEditSchema,
	alignSupplementPerItemExpenses
} from "@/entities/tour";

import { ENUM_FORM_SECTION } from "../../model";

import { PerItemCard } from "./per-item-card";

const syncPerItemExpenses = (form: UseFormReturn<TSupplementEditSchema>) => {
	if (
		form.getValues(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_SUPPLEMENT_PRICING_FIELD.PRICING_TYPE}`
		) !== ENUM_SUPPLEMENT_PRICING_TYPE.PER_ITEM
	) {
		return;
	}

	const itemsListLength =
		form.getValues(
			`${ENUM_FORM_SECTION.ITEMS}.${ENUM_FORM_SUPPLEMENT_ITEMS.ITEMS_LIST}`
		)?.length ?? 0;
	const expenses = form.getValues(
		`${ENUM_FORM_SECTION.PRICING}.${ENUM_SUPPLEMENT_PRICING_FIELD.EXPENSES}`
	);

	if (
		expenses?.typ === ENUM_SUPPLEMENT_PRICING_TYPE.PER_ITEM &&
		expenses[ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD.ITEMS]?.length ===
			itemsListLength
	) {
		return;
	}

	form.setValue(
		`${ENUM_FORM_SECTION.PRICING}.${ENUM_SUPPLEMENT_PRICING_FIELD.EXPENSES}`,
		alignSupplementPerItemExpenses({
			itemsListLength,
			current: expenses,
			...(form.getValues(
				`${ENUM_FORM_SECTION.PRICING}.${ENUM_SUPPLEMENT_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`
			) && { addMarginSeparately: true })
		})
	);
};

const PerItemDetailsBase: FC<{
	form: UseFormReturn<TSupplementEditSchema>;
}> = ({ form }) => {
	const { t } = useTranslation("supplement_edit_page");

	const itemsList = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.ITEMS}.${ENUM_FORM_SUPPLEMENT_ITEMS.ITEMS_LIST}`
	});
	const pricingType = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.PRICING}.${ENUM_SUPPLEMENT_PRICING_FIELD.PRICING_TYPE}`
	});
	const addMarginSeparately = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.PRICING}.${ENUM_SUPPLEMENT_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`
	});

	useEffect(() => {
		syncPerItemExpenses(form);
	}, [itemsList, pricingType, form]);

	const handleAddMarginSeparatelyChange = (checked: boolean) => {
		form.setValue(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_SUPPLEMENT_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`,
			checked
		);
		form.setValue(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_SUPPLEMENT_PRICING_FIELD.EXPENSES}`,
			alignSupplementPerItemExpenses({
				itemsListLength: itemsList?.length ?? 0,
				addMarginSeparately: checked,
				current: form.getValues(
					`${ENUM_FORM_SECTION.PRICING}.${ENUM_SUPPLEMENT_PRICING_FIELD.EXPENSES}`
				)
			})
		);
	};

	if (pricingType !== ENUM_SUPPLEMENT_PRICING_TYPE.PER_ITEM) {
		return null;
	}

	if (!itemsList?.length) {
		return (
			<p className="text-sm text-muted-foreground">
				{t("form.pricing.form.per_item.empty_items")}
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
								"form.pricing.form.per_item.checkboxes.add_margin_separately"
							)}
						</Label>
					</div>
				</div>
			</div>

			<div className="grid gap-4">
				{itemsList.map((_, index) => (
					<PerItemCard
						key={index}
						form={form}
						index={index}
						addMarginSeparately={Boolean(addMarginSeparately)}
					/>
				))}
			</div>
		</div>
	);
};

export const PerItemDetails = withErrorBoundary(PerItemDetailsBase);
