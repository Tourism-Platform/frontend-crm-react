import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CustomField } from "@/shared/ui";

import {
	ENUM_FORM_BUS_SECTION,
	ENUM_FORM_BUS_VEHICLES,
	type TBusProductEditSchema
} from "@/entities/supplier";

import { VEHICLES_DATA_LIST } from "../../model";

import { VehiclesMenu } from "./vehicles-menu";

interface IVehiclesCardProps {
	form: UseFormReturn<TBusProductEditSchema>;
	index: number;
	supplierId: string;
	productId: string;
}

export const VehiclesCard: FC<IVehiclesCardProps> = ({
	form,
	index,
	supplierId,
	productId
}) => {
	const { t } = useTranslation("bus_product_edit_page");
	const variantId = form.watch(
		`${ENUM_FORM_BUS_SECTION.VEHICLES}.${ENUM_FORM_BUS_VEHICLES.VEHICLES_LIST}.${index}.${ENUM_FORM_BUS_VEHICLES.VARIANT_ID}`
	);
	const variantName = form.watch(
		`${ENUM_FORM_BUS_SECTION.VEHICLES}.${ENUM_FORM_BUS_VEHICLES.VEHICLES_LIST}.${index}.${ENUM_FORM_BUS_VEHICLES.NAME}`
	);

	return (
		<Card className="relative">
			<CardHeader className="flex items-center justify-between">
				<div className="grid gap-1">
					<p>
						{t("form.vehicles.details.vehicle_item", {
							index: index + 1
						})}
					</p>
					{variantName ? (
						<p className="text-sm text-muted-foreground">
							{variantName}
						</p>
					) : null}
				</div>
			</CardHeader>
			<CardContent>
				<div className="absolute top-0 right-0">
					<VehiclesMenu
						supplierId={supplierId}
						productId={productId}
						variantId={variantId}
						variantName={variantName}
					/>
				</div>

				<div className="grid grid-cols-2 gap-x-4 gap-y-1">
					{VEHICLES_DATA_LIST().map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form.control}
							name={`${ENUM_FORM_BUS_SECTION.VEHICLES}.${ENUM_FORM_BUS_VEHICLES.VEHICLES_LIST}.${index}.${key}`}
							t={t}
							{...item}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
