import { type FC } from "react";
import { type FieldArrayWithId, type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Checkbox, Label } from "@/shared/ui";

import { type TOverrideProductFormValues } from "@/entities/tour";

import { getUnitChargeOptions } from "../model";

import { OverrideUnitCard } from "./override-unit-card";

interface IOverrideUnitDetailsProps {
	form: UseFormReturn<TOverrideProductFormValues>;
	unitFields: FieldArrayWithId<TOverrideProductFormValues, "units", "id">[];
	unitChargeOptions: ReturnType<typeof getUnitChargeOptions>;
	addMarginSeparately: boolean;
	onAddMarginSeparatelyChange: (checked: boolean) => void;
}

export const OverrideUnitDetails: FC<IOverrideUnitDetailsProps> = ({
	form,
	unitFields,
	unitChargeOptions,
	addMarginSeparately,
	onAddMarginSeparatelyChange
}) => {
	const { t } = useTranslation("common_events");

	if (unitFields.length === 0) {
		return (
			<p className="text-sm text-muted-foreground">
				{t("override_product.dialog.fields.units.empty")}
			</p>
		);
	}

	return (
		<div className="grid gap-4">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<h3 className="text-lg">
					{t("override_product.dialog.pricing.details_title")}
				</h3>
				<div className="flex items-center gap-2">
					<Checkbox
						id="add-margin-separately-units"
						checked={addMarginSeparately}
						onCheckedChange={(checked) =>
							onAddMarginSeparatelyChange(Boolean(checked))
						}
					/>
					<Label htmlFor="add-margin-separately-units">
						{t(
							"override_product.dialog.pricing.add_margin_separately"
						)}
					</Label>
				</div>
			</div>
			<div className="grid gap-4">
				{unitFields.map((field, index) => (
					<OverrideUnitCard
						key={field.id}
						form={form}
						index={index}
						name={field.name}
						unitChargeOptions={unitChargeOptions}
						addMarginSeparately={addMarginSeparately}
					/>
				))}
			</div>
		</div>
	);
};
