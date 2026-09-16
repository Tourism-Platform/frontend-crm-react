import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CustomField } from "@/shared/ui";

import {
	ENUM_FORM_TRAIN_FARES,
	ENUM_FORM_TRAIN_SECTION,
	type TTrainProductEditSchema
} from "@/entities/supplier";

import { FARES_DATA_LIST } from "../../model";

import { FaresMenu } from "./fares-menu";

interface IFareCardProps {
	form: UseFormReturn<TTrainProductEditSchema>;
	index: number;
	supplierId: string;
	productId: string;
}

export const FareCard: FC<IFareCardProps> = ({
	form,
	index,
	supplierId,
	productId
}) => {
	const { t } = useTranslation("train_product_edit_page");
	const fareId = form.watch(
		`${ENUM_FORM_TRAIN_SECTION.FARES}.${ENUM_FORM_TRAIN_FARES.FARES_LIST}.${index}.${ENUM_FORM_TRAIN_FARES.VARIANT_ID}`
	);
	const fareName = form.watch(
		`${ENUM_FORM_TRAIN_SECTION.FARES}.${ENUM_FORM_TRAIN_FARES.FARES_LIST}.${index}.${ENUM_FORM_TRAIN_FARES.NAME}`
	);

	return (
		<Card className="relative">
			<CardHeader className="flex items-center justify-between">
				<div className="grid gap-1">
					<p>
						{t("form.fares.details.fare_item", {
							index: index + 1
						})}
					</p>
					{fareName ? (
						<p className="text-sm text-muted-foreground">
							{fareName}
						</p>
					) : null}
				</div>
			</CardHeader>
			<CardContent>
				<div className="absolute top-0 right-0">
					<FaresMenu
						supplierId={supplierId}
						productId={productId}
						variantId={fareId}
						variantName={fareName}
					/>
				</div>

				<div className="grid grid-cols-2 gap-x-4 gap-y-1">
					{FARES_DATA_LIST().map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form.control}
							name={`${ENUM_FORM_TRAIN_SECTION.FARES}.${ENUM_FORM_TRAIN_FARES.FARES_LIST}.${index}.${key}`}
							t={t}
							{...item}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
