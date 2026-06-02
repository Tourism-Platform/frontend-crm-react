import { Plus, Trash2 } from "lucide-react";
import { type FC, Fragment } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CustomField,
	CustomInputSelect
} from "@/shared/ui";

import {
	ENUM_FORM_CARS,
	ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD,
	ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD,
	ENUM_TRANSPORTATION_PRICING_FIELD,
	type TTransportationEditSchema
} from "@/entities/tour";

import {
	ENUM_FORM_SECTION,
	PER_CAR_CATEGORY_ROW_FIELDS_LIST,
	PER_CAR_MARKUP_FIELD,
	getCarDisplayName
} from "../../model";

interface IPerCarByClassCardProps {
	form: UseFormReturn<TTransportationEditSchema>;
	index: number;
	addMarginSeparately: boolean;
}

export const PerCarByClassCard: FC<IPerCarByClassCardProps> = ({
	form,
	index,
	addMarginSeparately
}) => {
	const { t } = useTranslation("transportation_edit_page");

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}.${ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS}.${index}.${ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CATEGORIES}`
	});

	return (
		<Card>
			<CardHeader>
				<h4 className="font-semibold">
					{getCarDisplayName(
						form.watch(
							`${ENUM_FORM_SECTION.CARS}.${ENUM_FORM_CARS.CARS_LIST}.${index}.${ENUM_FORM_CARS.CAR_NAME}`
						) ?? ""
					)}
				</h4>
			</CardHeader>
			<CardContent className="grid">
				{fields.map((field, categoryIndex) => (
					<div
						key={field.id}
						className={cn(
							"grid grid-cols-[1fr_1fr_1fr_0.5fr_auto] gap-3",
							addMarginSeparately &&
								"grid-cols-[1fr_1fr_1fr_1.5fr_0.5fr_auto]"
						)}
					>
						{PER_CAR_CATEGORY_ROW_FIELDS_LIST.map(
							({ key, ...item }, fieldIndex) => (
								<Fragment key={key}>
									{addMarginSeparately &&
									fieldIndex ===
										PER_CAR_CATEGORY_ROW_FIELDS_LIST.length -
											1 ? (
										<CustomInputSelect
											control={form.control}
											name={`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}.${ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS}.${index}.${ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CATEGORIES}.${categoryIndex}.${PER_CAR_MARKUP_FIELD.key}`}
											label={PER_CAR_MARKUP_FIELD.label}
											placeholder={
												PER_CAR_MARKUP_FIELD.placeholder
											}
											selectOptions={[
												...PER_CAR_MARKUP_FIELD.selectOptions
											]}
											t={t}
										/>
									) : null}
									<CustomField
										control={form.control}
										name={`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}.${ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS}.${index}.${ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CATEGORIES}.${categoryIndex}.${key}`}
										t={t}
										{...item}
									/>
								</Fragment>
							)
						)}
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => remove(categoryIndex)}
							disabled={fields.length <= 1}
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				))}
				<Button
					type="button"
					variant="outline"
					className="w-fit"
					onClick={() =>
						append({
							[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.NAME]: "",
							[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.COST]: null,
							[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.FEES]: null,
							[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.CURRENCY]:
								"",
							[ENUM_TRANSPORTATION_CATEGORY_ROW_FIELD.MARKUP]:
								null
						})
					}
				>
					<Plus className="mr-2 h-4 w-4" />
					{t("form.pricing.form.per_car.buttons.add_category")}
				</Button>
			</CardContent>
		</Card>
	);
};
