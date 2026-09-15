import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CustomField } from "@/shared/ui";

import {
	ENUM_FORM_TRANSFER_CARS,
	ENUM_FORM_TRANSFER_SECTION,
	type TTransferProductEditSchema
} from "@/entities/supplier";

import { CARS_DATA_LIST } from "../../model";

import { CarsMenu } from "./cars-menu";

interface ICarsCardProps {
	form: UseFormReturn<TTransferProductEditSchema>;
	index: number;
	supplierId: string;
	productId: string;
}

export const CarsCard: FC<ICarsCardProps> = ({
	form,
	index,
	supplierId,
	productId
}) => {
	const { t } = useTranslation("transfer_product_edit_page");
	const variantId = form.watch(
		`${ENUM_FORM_TRANSFER_SECTION.CARS}.${ENUM_FORM_TRANSFER_CARS.CARS_LIST}.${index}.${ENUM_FORM_TRANSFER_CARS.VARIANT_ID}`
	);
	const variantName = form.watch(
		`${ENUM_FORM_TRANSFER_SECTION.CARS}.${ENUM_FORM_TRANSFER_CARS.CARS_LIST}.${index}.${ENUM_FORM_TRANSFER_CARS.NAME}`
	);

	return (
		<Card className="relative">
			<CardHeader className="flex items-center justify-between">
				<div className="grid gap-1">
					<p>
						{t("form.cars.details.car_item", { index: index + 1 })}
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
					<CarsMenu
						supplierId={supplierId}
						productId={productId}
						variantId={variantId}
						variantName={variantName}
					/>
				</div>

				<div className="grid grid-cols-2 gap-x-4 gap-y-1">
					{CARS_DATA_LIST().map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form.control}
							name={`${ENUM_FORM_TRANSFER_SECTION.CARS}.${ENUM_FORM_TRANSFER_CARS.CARS_LIST}.${index}.${key}`}
							t={t}
							{...item}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
