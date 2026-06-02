import { type FC, useEffect } from "react";
import { type UseFormReturn, useWatch } from "react-hook-form";
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

const syncPerCarExpenses = (form: UseFormReturn<TTransportationEditSchema>) => {
	if (
		form.getValues(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.PRICING_TYPE}`
		) !== ENUM_TRANSPORTATION_PRICING_TYPE.PER_CAR
	) {
		return;
	}

	const priceBasedOnClass = form.getValues(
		`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.PRICE_BASED_ON_CLASS}`
	);
	const expectedTyp = priceBasedOnClass
		? ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR_CATEGORY
		: ENUM_TRANSPORTATION_EXPENSE_TYP.PER_CAR;
	const expenses = form.getValues(
		`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}`
	);
	const carsListLength =
		form.getValues(`${ENUM_FORM_SECTION.CARS}.${ENUM_FORM_CARS.CARS_LIST}`)
			?.length ?? 0;

	if (
		expenses?.typ === expectedTyp &&
		expenses[ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS]?.length ===
			carsListLength
	) {
		return;
	}

	form.setValue(
		`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}`,
		alignTransportationPerCarExpenses({
			priceBasedOnClass,
			carsListLength,
			current: expenses,
			...(form.getValues(
				`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`
			) && { addMarginSeparately: true })
		})
	);
};

const PerCarDetailsBase: FC<{
	form: UseFormReturn<TTransportationEditSchema>;
}> = ({ form }) => {
	const { t } = useTranslation("transportation_edit_page");

	const carsList = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.CARS}.${ENUM_FORM_CARS.CARS_LIST}`
	});
	const pricingType = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.PRICING_TYPE}`
	});
	const priceBasedOnClass = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.PRICE_BASED_ON_CLASS}`
	});
	const addMarginSeparately = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`
	});

	useEffect(() => {
		syncPerCarExpenses(form);
	}, [carsList, pricingType, priceBasedOnClass, form]);

	const handlePriceBasedOnClassChange = (checked: boolean) => {
		form.setValue(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.PRICE_BASED_ON_CLASS}`,
			checked
		);
		form.setValue(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}`,
			alignTransportationPerCarExpenses({
				priceBasedOnClass: checked,
				carsListLength: carsList?.length ?? 0,
				...(addMarginSeparately && { addMarginSeparately: true }),
				current: form.getValues(
					`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}`
				)
			})
		);
	};

	const handleAddMarginSeparatelyChange = (checked: boolean) => {
		form.setValue(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`,
			checked
		);
		form.setValue(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}`,
			alignTransportationPerCarExpenses({
				priceBasedOnClass: Boolean(priceBasedOnClass),
				carsListLength: carsList?.length ?? 0,
				addMarginSeparately: checked,
				current: form.getValues(
					`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}`
				)
			})
		);
	};

	if (pricingType !== ENUM_TRANSPORTATION_PRICING_TYPE.PER_CAR) {
		return null;
	}

	if (!carsList?.length) {
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
							checked={Boolean(priceBasedOnClass)}
							onCheckedChange={(checked) =>
								handlePriceBasedOnClassChange(Boolean(checked))
							}
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
							checked={Boolean(addMarginSeparately)}
							onCheckedChange={(checked) =>
								handleAddMarginSeparatelyChange(
									Boolean(checked)
								)
							}
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
				{carsList.map((_, index) =>
					priceBasedOnClass ? (
						<PerCarByClassCard
							key={index}
							form={form}
							index={index}
							addMarginSeparately={Boolean(addMarginSeparately)}
						/>
					) : (
						<PerCarCard
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

export const PerCarDetails = withErrorBoundary(PerCarDetailsBase);
