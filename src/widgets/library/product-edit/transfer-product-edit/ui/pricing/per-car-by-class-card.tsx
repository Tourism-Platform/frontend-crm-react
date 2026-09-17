import { type FC, Fragment } from "react";
import { type UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import {
	Card,
	CardContent,
	CardHeader,
	CustomField,
	CustomInputSelect,
	Separator
} from "@/shared/ui";

import {
	ENUM_FORM_TRANSFER_CARS,
	ENUM_FORM_TRANSFER_SECTION,
	ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD,
	ENUM_TRANSFER_PRODUCT_FLEET_CATEGORY_FIELD,
	ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD,
	ENUM_TRANSFER_PRODUCT_PRICING_FIELD,
	type ENUM_VEHICLE_BODY_TYPE_TYPE,
	type TTransferProductEditSchema,
	VEHICLE_BODY_TYPE_LABELS
} from "@/entities/supplier";

import { FeeLinesField } from "@/features/pricing";

import {
	PER_CAR_CATEGORY_ROW_FIELDS_LIST,
	PER_CAR_MARKUP_FIELD
} from "../../model";

interface IPerCarByClassCardProps {
	form: UseFormReturn<TTransferProductEditSchema>;
	index: number;
	addMarginSeparately: boolean;
}

export const PerCarByClassCard: FC<IPerCarByClassCardProps> = ({
	form,
	index,
	addMarginSeparately
}) => {
	const { t } = useTranslation(["transfer_product_edit_page", "options"]);
	const carName = form.watch(
		`${ENUM_FORM_TRANSFER_SECTION.CARS}.${ENUM_FORM_TRANSFER_CARS.CARS_LIST}.${index}.${ENUM_FORM_TRANSFER_CARS.CAR_NAME}`
	) as ENUM_VEHICLE_BODY_TYPE_TYPE | undefined;
	const carsPath =
		`${ENUM_FORM_TRANSFER_SECTION.PRICING}.${ENUM_TRANSFER_PRODUCT_PRICING_FIELD.EXPENSES}.${ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS}.${index}` as const;

	const fleetCategories =
		useWatch({
			control: form.control,
			name: `${ENUM_FORM_TRANSFER_SECTION.PRICING}.${ENUM_TRANSFER_PRODUCT_PRICING_FIELD.FLEET_CATEGORIES}`
		}) ?? [];

	const categoryRows =
		useWatch({
			control: form.control,
			name: `${carsPath}.${ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CATEGORIES}`
		}) ?? [];

	return (
		<Card>
			<CardHeader>
				<h4 className="font-semibold">
					{carName
						? t(VEHICLE_BODY_TYPE_LABELS[carName], {
								ns: "options"
							})
						: null}
				</h4>
			</CardHeader>
			<CardContent className="grid gap-4">
				{categoryRows.map((_, categoryIndex) => {
					const categoryPath =
						`${carsPath}.${ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CATEGORIES}.${categoryIndex}` as const;
					const fleetRow = fleetCategories[categoryIndex];
					const categoryLabel =
						fleetRow?.[
							ENUM_TRANSFER_PRODUCT_FLEET_CATEGORY_FIELD.NAME
						] ?? "";

					return (
						<Fragment key={categoryPath}>
							<div className="grid gap-3">
								<p className="text-sm font-medium">
									{categoryLabel}
								</p>
								<div
									className={cn(
										"grid max-w-3xl grid-cols-[minmax(0,8rem)_minmax(0,8rem)_auto] gap-3 items-center",
										addMarginSeparately &&
											"max-w-4xl grid-cols-[minmax(0,8rem)_minmax(0,12rem)_minmax(0,8rem)_auto]"
									)}
								>
									{PER_CAR_CATEGORY_ROW_FIELDS_LIST.filter(
										({ key }) =>
											key !==
											ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.NAME
									).map(({ key, ...item }, fieldIndex) => (
										<Fragment key={key}>
											{addMarginSeparately &&
											fieldIndex ===
												PER_CAR_CATEGORY_ROW_FIELDS_LIST.filter(
													({ key: fieldKey }) =>
														fieldKey !==
														ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.NAME
												).length -
													1 ? (
												<CustomInputSelect
													control={form.control}
													name={`${categoryPath}.${PER_CAR_MARKUP_FIELD.key}`}
													label={
														PER_CAR_MARKUP_FIELD.label
													}
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
												name={`${categoryPath}.${key}`}
												t={t}
												className="min-w-0"
												{...item}
											/>
										</Fragment>
									))}
								</div>
								<FeeLinesField
									control={form.control}
									name={`${categoryPath}.${ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.FEES}`}
								/>
							</div>
							{categoryIndex < categoryRows.length - 1 ? (
								<Separator />
							) : null}
						</Fragment>
					);
				})}
			</CardContent>
		</Card>
	);
};
