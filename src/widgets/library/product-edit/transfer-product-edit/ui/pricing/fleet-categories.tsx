import { Plus, Trash2 } from "lucide-react";
import { type FC, Fragment } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, CustomField, Separator } from "@/shared/ui";

import {
	ENUM_FORM_TRANSFER_SECTION,
	ENUM_TRANSFER_PRODUCT_FLEET_CATEGORY_FIELD,
	ENUM_TRANSFER_PRODUCT_PRICING_FIELD,
	type TTransferProductEditSchema,
	alignTransferPerCarExpenses
} from "@/entities/supplier";

import { createEmptyFleetCategoryRow } from "../../model";

interface IFleetCategoriesProps {
	form: UseFormReturn<TTransferProductEditSchema>;
	carsListLength: number;
}

export const FleetCategories: FC<IFleetCategoriesProps> = ({
	form,
	carsListLength
}) => {
	const { t } = useTranslation("transfer_product_edit_page");
	const fleetPath =
		`${ENUM_FORM_TRANSFER_SECTION.PRICING}.${ENUM_TRANSFER_PRODUCT_PRICING_FIELD.FLEET_CATEGORIES}` as const;

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: fleetPath
	});

	const resyncMatrix = () => {
		const pricing = form.getValues(ENUM_FORM_TRANSFER_SECTION.PRICING);
		const fleetRows =
			pricing[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.FLEET_CATEGORIES];
		const fleetCategories = (fleetRows ?? []).map((row) => ({
			id:
				row[ENUM_TRANSFER_PRODUCT_FLEET_CATEGORY_FIELD.ID] ??
				crypto.randomUUID(),
			name: row[ENUM_TRANSFER_PRODUCT_FLEET_CATEGORY_FIELD.NAME] ?? null
		}));

		form.setValue(
			`${ENUM_FORM_TRANSFER_SECTION.PRICING}.${ENUM_TRANSFER_PRODUCT_PRICING_FIELD.EXPENSES}`,
			alignTransferPerCarExpenses({
				priceBasedOnClass: true,
				carsListLength,
				current: pricing[ENUM_TRANSFER_PRODUCT_PRICING_FIELD.EXPENSES],
				fleetCategories,
				...(pricing[
					ENUM_TRANSFER_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY
				] && { addMarginSeparately: true })
			})
		);
	};

	const handleAppend = () => {
		const id = crypto.randomUUID();
		append({
			...createEmptyFleetCategoryRow(),
			[ENUM_TRANSFER_PRODUCT_FLEET_CATEGORY_FIELD.ID]: id
		});
		resyncMatrix();
	};

	const handleRemove = (index: number) => {
		remove(index);
		resyncMatrix();
	};

	return (
		<div className="grid gap-4">
			<h4 className="font-semibold">
				{t("form.pricing.form.per_car.table.type")}
			</h4>
			{fields.map((field, index) => {
				const rowPath = `${fleetPath}.${index}` as const;
				return (
					<Fragment key={field.id}>
						<div className="flex max-w-xl items-end gap-3">
							<CustomField
								control={form.control}
								name={`${rowPath}.${ENUM_TRANSFER_PRODUCT_FLEET_CATEGORY_FIELD.NAME}`}
								label="form.pricing.form.per_car.table.type"
								placeholder="form.pricing.form.per_car.fields.category_name.placeholder"
								fieldType="input"
								t={t}
								className="min-w-0 flex-1"
							/>
							<Button
								type="button"
								variant="destructive"
								size="icon"
								onClick={() => handleRemove(index)}
								disabled={fields.length <= 1}
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
						{index < fields.length - 1 ? <Separator /> : null}
					</Fragment>
				);
			})}
			<Button
				type="button"
				variant="outline"
				className="w-fit"
				onClick={handleAppend}
			>
				<Plus className="mr-2 h-4 w-4" />
				{t("form.pricing.form.per_car.buttons.add_category")}
			</Button>
		</div>
	);
};
