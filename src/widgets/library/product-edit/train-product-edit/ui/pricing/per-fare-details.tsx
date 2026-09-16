import { type FC, useEffect } from "react";
import { type UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Checkbox, Label, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_TRAIN_FARES,
	ENUM_FORM_TRAIN_SECTION,
	ENUM_TRAIN_PRODUCT_PRICING_FIELD,
	ENUM_TRAIN_PRODUCT_PRICING_TYPE,
	type TTrainProductEditSchema,
	alignTrainPerFareRows
} from "@/entities/supplier";

import { PerFareCard } from "./per-fare-card";

const syncPerFareRows = (form: UseFormReturn<TTrainProductEditSchema>) => {
	if (
		form.getValues(
			`${ENUM_FORM_TRAIN_SECTION.PRICING}.${ENUM_TRAIN_PRODUCT_PRICING_FIELD.PRICING_TYPE}`
		) !== ENUM_TRAIN_PRODUCT_PRICING_TYPE.PER_FARE
	) {
		return;
	}

	const faresList =
		form.getValues(
			`${ENUM_FORM_TRAIN_SECTION.FARES}.${ENUM_FORM_TRAIN_FARES.FARES_LIST}`
		) ?? [];
	const current =
		form.getValues(
			`${ENUM_FORM_TRAIN_SECTION.PRICING}.${ENUM_TRAIN_PRODUCT_PRICING_FIELD.FARES}`
		) ?? [];

	if (
		current.length === faresList.length &&
		current.every(
			(row, index) => row.variant_id === faresList[index]?.variant_id
		)
	) {
		return;
	}

	form.setValue(
		`${ENUM_FORM_TRAIN_SECTION.PRICING}.${ENUM_TRAIN_PRODUCT_PRICING_FIELD.FARES}`,
		alignTrainPerFareRows({
			faresList: faresList.map((fare) => ({
				variant_id: fare[ENUM_FORM_TRAIN_FARES.VARIANT_ID]
			})),
			current,
			...(form.getValues(
				`${ENUM_FORM_TRAIN_SECTION.PRICING}.${ENUM_TRAIN_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`
			) && { addMarginSeparately: true })
		})
	);
};

const PerFareDetailsBase: FC<{
	form: UseFormReturn<TTrainProductEditSchema>;
}> = ({ form }) => {
	const { t } = useTranslation("train_product_edit_page");

	const faresList = useWatch({
		control: form.control,
		name: `${ENUM_FORM_TRAIN_SECTION.FARES}.${ENUM_FORM_TRAIN_FARES.FARES_LIST}`
	});
	const pricingType = useWatch({
		control: form.control,
		name: `${ENUM_FORM_TRAIN_SECTION.PRICING}.${ENUM_TRAIN_PRODUCT_PRICING_FIELD.PRICING_TYPE}`
	});
	const addMarginSeparately = useWatch({
		control: form.control,
		name: `${ENUM_FORM_TRAIN_SECTION.PRICING}.${ENUM_TRAIN_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`
	});

	useEffect(() => {
		syncPerFareRows(form);
	}, [faresList, pricingType, form]);

	const handleAddMarginSeparatelyChange = (checked: boolean) => {
		form.setValue(
			`${ENUM_FORM_TRAIN_SECTION.PRICING}.${ENUM_TRAIN_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`,
			checked
		);
		form.setValue(
			`${ENUM_FORM_TRAIN_SECTION.PRICING}.${ENUM_TRAIN_PRODUCT_PRICING_FIELD.FARES}`,
			alignTrainPerFareRows({
				faresList: (faresList ?? []).map((fare) => ({
					variant_id: fare[ENUM_FORM_TRAIN_FARES.VARIANT_ID]
				})),
				addMarginSeparately: checked,
				current: form.getValues(
					`${ENUM_FORM_TRAIN_SECTION.PRICING}.${ENUM_TRAIN_PRODUCT_PRICING_FIELD.FARES}`
				)
			})
		);
	};

	if (pricingType !== ENUM_TRAIN_PRODUCT_PRICING_TYPE.PER_FARE) {
		return null;
	}

	if (!faresList?.length) {
		return (
			<p className="text-sm text-muted-foreground">
				{t("form.pricing.form.per_fare.empty_fares")}
			</p>
		);
	}

	return (
		<div className="grid gap-4">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<h3 className="text-lg">
					{t("form.pricing.form.pricing_details.title")}
				</h3>
				<div className="flex items-center gap-2">
					<Checkbox
						id="add-margin-separately"
						checked={Boolean(addMarginSeparately)}
						onCheckedChange={(checked) =>
							handleAddMarginSeparatelyChange(Boolean(checked))
						}
					/>
					<Label htmlFor="add-margin-separately">
						{t(
							"form.pricing.form.per_fare.checkboxes.add_margin_separately"
						)}
					</Label>
				</div>
			</div>

			<div className="grid gap-4">
				{faresList.map((_, index) => (
					<PerFareCard
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

export const PerFareDetails = withErrorBoundary(PerFareDetailsBase);
