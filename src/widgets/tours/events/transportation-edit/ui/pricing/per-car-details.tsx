import { type FC, useEffect } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Checkbox, Label, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_CARS,
	ENUM_TRANSPORTATION_EXPENSE_TYP,
	ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD,
	ENUM_TRANSPORTATION_PRICING_FIELD,
	ENUM_TRANSPORTATION_PRICING_TYPE,
	type TTransportationEditSchema,
	alignTransportationPerCarExpenses
} from "@/entities/tour";

import { ENUM_FORM_SECTION } from "../../model";

import { PerCarByClassCard } from "./per-car-by-class-card";
import { PerCarCard } from "./per-car-card";

const PerCarDetailsBase: FC<{
	form: UseFormReturn<TTransportationEditSchema>;
}> = ({ form }) => {
	const { t } = useTranslation("transportation_edit_page");

	useEffect(() => {
		if (
			form.getValues(
				`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.PRICING_TYPE}`
			) !== ENUM_TRANSPORTATION_PRICING_TYPE.PER_CAR
		) {
			return;
		}

		if (
			form.getValues(
				`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}`
			)?.typ ===
				(form.getValues(
					`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.PRICE_BASED_ON_CLASS}`
				)
					? ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR_CATEGORY
					: ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR) &&
			(form.getValues(
				`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}`
			)?.[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS]?.length ??
				0) ===
				(form.getValues(
					`${ENUM_FORM_SECTION.CARS}.${ENUM_FORM_CARS.CARS_LIST}`
				)?.length ?? 0)
		) {
			return;
		}

		form.setValue(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}`,
			alignTransportationPerCarExpenses({
				priceBasedOnClass: form.getValues(
					`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.PRICE_BASED_ON_CLASS}`
				),
				carsListLength:
					form.getValues(
						`${ENUM_FORM_SECTION.CARS}.${ENUM_FORM_CARS.CARS_LIST}`
					)?.length ?? 0,
				current: form.getValues(
					`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}`
				)
			})
		);
	}, [
		form.watch(`${ENUM_FORM_SECTION.CARS}.${ENUM_FORM_CARS.CARS_LIST}`),
		form.watch(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.PRICING_TYPE}`
		),
		form.watch(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.PRICE_BASED_ON_CLASS}`
		),
		form
	]);

	if (
		form.watch(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.PRICING_TYPE}`
		) !== ENUM_TRANSPORTATION_PRICING_TYPE.PER_CAR
	) {
		return null;
	}

	if (
		!(
			form.watch(
				`${ENUM_FORM_SECTION.CARS}.${ENUM_FORM_CARS.CARS_LIST}`
			) ?? []
		).length
	) {
		return (
			<p className="text-sm text-muted-foreground">
				{t("form.pricing.form.per_car.empty_cars")}
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
							id="price-based-on-class"
							checked={form.watch(
								`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.PRICE_BASED_ON_CLASS}`
							)}
							onCheckedChange={(checked) => {
								form.setValue(
									`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.PRICE_BASED_ON_CLASS}`,
									Boolean(checked)
								);
								form.setValue(
									`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}`,
									alignTransportationPerCarExpenses({
										priceBasedOnClass: Boolean(checked),
										carsListLength:
											form.getValues(
												`${ENUM_FORM_SECTION.CARS}.${ENUM_FORM_CARS.CARS_LIST}`
											)?.length ?? 0,
										...(form.getValues(
											`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`
										) && { addMarginSeparately: true }),
										current: form.getValues(
											`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}`
										)
									})
								);
							}}
						/>
						<Label htmlFor="price-based-on-class">
							{t(
								"form.pricing.form.per_car.checkboxes.price_based_on_class"
							)}
						</Label>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox
							id="add-margin-separately"
							checked={form.watch(
								`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`
							)}
							onCheckedChange={(checked) => {
								form.setValue(
									`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`,
									Boolean(checked)
								);
								form.setValue(
									`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}`,
									alignTransportationPerCarExpenses({
										priceBasedOnClass: form.getValues(
											`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.PRICE_BASED_ON_CLASS}`
										),
										carsListLength:
											form.getValues(
												`${ENUM_FORM_SECTION.CARS}.${ENUM_FORM_CARS.CARS_LIST}`
											)?.length ?? 0,
										addMarginSeparately: Boolean(checked),
										current: form.getValues(
											`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}`
										)
									})
								);
							}}
						/>
						<Label htmlFor="add-margin-separately">
							{t(
								"form.pricing.form.per_car.checkboxes.add_margin_separately"
							)}
						</Label>
					</div>
				</div>
			</div>

			<div className="grid gap-4">
				{(
					form.watch(
						`${ENUM_FORM_SECTION.CARS}.${ENUM_FORM_CARS.CARS_LIST}`
					) ?? []
				).map((_, index) =>
					form.watch(
						`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.PRICE_BASED_ON_CLASS}`
					) ? (
						<PerCarByClassCard
							key={index}
							form={form}
							index={index}
							addMarginSeparately={Boolean(
								form.watch(
									`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`
								)
							)}
						/>
					) : (
						<PerCarCard
							key={index}
							form={form}
							index={index}
							addMarginSeparately={Boolean(
								form.watch(
									`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`
								)
							)}
						/>
					)
				)}
			</div>
		</div>
	);
};

export const PerCarDetails = withErrorBoundary(PerCarDetailsBase);
