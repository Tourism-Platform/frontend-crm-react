import { type FC, useEffect } from "react";
import { type UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Checkbox, Label, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_BUS_PRODUCT_PRICING_FIELD,
	ENUM_BUS_PRODUCT_PRICING_TYPE,
	ENUM_FORM_BUS_SECTION,
	ENUM_FORM_BUS_VEHICLES,
	type TBusProductEditSchema,
	alignBusPerVehicleRows
} from "@/entities/supplier";

import { PerVehicleCard } from "./per-vehicle-card";

const syncPerVehicleRows = (form: UseFormReturn<TBusProductEditSchema>) => {
	if (
		form.getValues(
			`${ENUM_FORM_BUS_SECTION.PRICING}.${ENUM_BUS_PRODUCT_PRICING_FIELD.PRICING_TYPE}`
		) !== ENUM_BUS_PRODUCT_PRICING_TYPE.PER_VEHICLE
	) {
		return;
	}

	const vehiclesList =
		form.getValues(
			`${ENUM_FORM_BUS_SECTION.VEHICLES}.${ENUM_FORM_BUS_VEHICLES.VEHICLES_LIST}`
		) ?? [];
	const current =
		form.getValues(
			`${ENUM_FORM_BUS_SECTION.PRICING}.${ENUM_BUS_PRODUCT_PRICING_FIELD.VEHICLES}`
		) ?? [];

	if (
		current.length === vehiclesList.length &&
		current.every(
			(row, index) => row.variant_id === vehiclesList[index]?.variant_id
		)
	) {
		return;
	}

	form.setValue(
		`${ENUM_FORM_BUS_SECTION.PRICING}.${ENUM_BUS_PRODUCT_PRICING_FIELD.VEHICLES}`,
		alignBusPerVehicleRows({
			vehiclesList: vehiclesList.map((vehicle) => ({
				variant_id: vehicle[ENUM_FORM_BUS_VEHICLES.VARIANT_ID]
			})),
			current,
			...(form.getValues(
				`${ENUM_FORM_BUS_SECTION.PRICING}.${ENUM_BUS_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`
			) && { addMarginSeparately: true })
		})
	);
};

const PerVehicleDetailsBase: FC<{
	form: UseFormReturn<TBusProductEditSchema>;
}> = ({ form }) => {
	const { t } = useTranslation("bus_product_edit_page");

	const vehiclesList = useWatch({
		control: form.control,
		name: `${ENUM_FORM_BUS_SECTION.VEHICLES}.${ENUM_FORM_BUS_VEHICLES.VEHICLES_LIST}`
	});
	const pricingType = useWatch({
		control: form.control,
		name: `${ENUM_FORM_BUS_SECTION.PRICING}.${ENUM_BUS_PRODUCT_PRICING_FIELD.PRICING_TYPE}`
	});
	const addMarginSeparately = useWatch({
		control: form.control,
		name: `${ENUM_FORM_BUS_SECTION.PRICING}.${ENUM_BUS_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`
	});

	useEffect(() => {
		syncPerVehicleRows(form);
	}, [vehiclesList, pricingType, form]);

	const handleAddMarginSeparatelyChange = (checked: boolean) => {
		form.setValue(
			`${ENUM_FORM_BUS_SECTION.PRICING}.${ENUM_BUS_PRODUCT_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`,
			checked
		);
		form.setValue(
			`${ENUM_FORM_BUS_SECTION.PRICING}.${ENUM_BUS_PRODUCT_PRICING_FIELD.VEHICLES}`,
			alignBusPerVehicleRows({
				vehiclesList: (vehiclesList ?? []).map((vehicle) => ({
					variant_id: vehicle[ENUM_FORM_BUS_VEHICLES.VARIANT_ID]
				})),
				addMarginSeparately: checked,
				current: form.getValues(
					`${ENUM_FORM_BUS_SECTION.PRICING}.${ENUM_BUS_PRODUCT_PRICING_FIELD.VEHICLES}`
				)
			})
		);
	};

	if (pricingType !== ENUM_BUS_PRODUCT_PRICING_TYPE.PER_VEHICLE) {
		return null;
	}

	if (!vehiclesList?.length) {
		return (
			<p className="text-sm text-muted-foreground">
				{t("form.pricing.form.per_vehicle.empty_vehicles")}
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
							"form.pricing.form.per_vehicle.checkboxes.add_margin_separately"
						)}
					</Label>
				</div>
			</div>

			<div className="grid gap-4">
				{vehiclesList.map((_, index) => (
					<PerVehicleCard
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

export const PerVehicleDetails = withErrorBoundary(PerVehicleDetailsBase);
