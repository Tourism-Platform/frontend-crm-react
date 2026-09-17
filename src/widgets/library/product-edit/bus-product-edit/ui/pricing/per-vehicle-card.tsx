import { type FC, Fragment } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import {
	Card,
	CardContent,
	CardHeader,
	CustomField,
	CustomInputSelect
} from "@/shared/ui";

import {
	ENUM_BUS_PRODUCT_PRICING_FIELD,
	ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD,
	ENUM_FORM_BUS_SECTION,
	ENUM_FORM_BUS_VEHICLES,
	type TBusProductEditSchema
} from "@/entities/supplier";

import { FeeLinesField } from "@/features/pricing";

import {
	PER_VEHICLE_MARKUP_FIELD,
	PER_VEHICLE_ROW_FIELDS_LIST
} from "../../model";

interface IPerVehicleCardProps {
	form: UseFormReturn<TBusProductEditSchema>;
	index: number;
	addMarginSeparately: boolean;
}

export const PerVehicleCard: FC<IPerVehicleCardProps> = ({
	form,
	index,
	addMarginSeparately
}) => {
	const { t } = useTranslation("bus_product_edit_page");
	const vehicleName = form.watch(
		`${ENUM_FORM_BUS_SECTION.VEHICLES}.${ENUM_FORM_BUS_VEHICLES.VEHICLES_LIST}.${index}.${ENUM_FORM_BUS_VEHICLES.NAME}`
	);
	const rowPath =
		`${ENUM_FORM_BUS_SECTION.PRICING}.${ENUM_BUS_PRODUCT_PRICING_FIELD.VEHICLES}.${index}` as const;

	return (
		<Card>
			<CardHeader>
				<h4 className="font-semibold">{vehicleName}</h4>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div
					className={cn(
						"grid max-w-xl grid-cols-2 gap-4",
						addMarginSeparately &&
							"max-w-3xl grid-cols-[minmax(0,12rem)_minmax(0,14rem)_minmax(0,8rem)]"
					)}
				>
					{PER_VEHICLE_ROW_FIELDS_LIST.map(
						({ key, ...item }, fieldIndex) => (
							<Fragment key={key}>
								{addMarginSeparately &&
								fieldIndex ===
									PER_VEHICLE_ROW_FIELDS_LIST.length - 1 ? (
									<CustomInputSelect
										control={form.control}
										name={`${rowPath}.${PER_VEHICLE_MARKUP_FIELD.key}`}
										label={PER_VEHICLE_MARKUP_FIELD.label}
										placeholder={
											PER_VEHICLE_MARKUP_FIELD.placeholder
										}
										selectOptions={[
											...PER_VEHICLE_MARKUP_FIELD.selectOptions
										]}
										t={t}
									/>
								) : null}
								<CustomField
									control={form.control}
									name={`${rowPath}.${key}`}
									t={t}
									{...item}
								/>
							</Fragment>
						)
					)}
				</div>
				<FeeLinesField
					control={form.control}
					name={`${rowPath}.${ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD.FEES}`}
				/>
			</CardContent>
		</Card>
	);
};
