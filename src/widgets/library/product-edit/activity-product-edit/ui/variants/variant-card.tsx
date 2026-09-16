import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CustomField } from "@/shared/ui";

import {
	ENUM_FORM_ACTIVITY_SECTION,
	ENUM_FORM_ACTIVITY_VARIANT,
	ENUM_FORM_ACTIVITY_VARIANTS,
	type TActivityProductEditSchema
} from "@/entities/supplier";

import { FeeLinesField } from "@/features/pricing";

import { ACTIVITY_VARIANT_FIELDS_LIST } from "../../model";

import { VariantMenu } from "./variant-menu";
import { VariantsMenu } from "./variants-menu";

interface IVariantCardProps {
	form: UseFormReturn<TActivityProductEditSchema>;
	index: number;
	supplierId: string;
	productId: string;
}

export const VariantCard: FC<IVariantCardProps> = ({
	form,
	index,
	supplierId,
	productId
}) => {
	const { t } = useTranslation("activity_product_edit_page");
	const variantFields = ACTIVITY_VARIANT_FIELDS_LIST();
	const variantId = form.watch(
		`${ENUM_FORM_ACTIVITY_SECTION.VARIANTS}.${ENUM_FORM_ACTIVITY_VARIANTS.VARIANTS_LIST}.${index}.${ENUM_FORM_ACTIVITY_VARIANTS.VARIANT_ID}`
	);
	const variantName = form.watch(
		`${ENUM_FORM_ACTIVITY_SECTION.VARIANTS}.${ENUM_FORM_ACTIVITY_VARIANTS.VARIANTS_LIST}.${index}.${ENUM_FORM_ACTIVITY_VARIANT.NAME}`
	);

	return (
		<Card className="relative">
			<CardHeader className="flex items-center justify-between">
				<div className="grid gap-1">
					{variantName ? (
						<p>{variantName}</p>
					) : (
						<p className="text-muted-foreground">
							{t("form.variants.fields.name.label")}
						</p>
					)}
				</div>
			</CardHeader>
			<CardContent>
				<div className="absolute top-0 right-0">
					<VariantsMenu
						supplierId={supplierId}
						productId={productId}
						variantId={variantId}
						variantName={variantName}
					/>
				</div>
				<div className="grid grid-cols-3 gap-x-4 gap-y-1">
					{variantFields.map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form.control}
							name={`${ENUM_FORM_ACTIVITY_SECTION.VARIANTS}.${ENUM_FORM_ACTIVITY_VARIANTS.VARIANTS_LIST}.${index}.${key}`}
							t={t}
							{...item}
						/>
					))}
					<div className="col-span-3">
						<FeeLinesField
							control={form.control}
							name={`${ENUM_FORM_ACTIVITY_SECTION.VARIANTS}.${ENUM_FORM_ACTIVITY_VARIANTS.VARIANTS_LIST}.${index}.${ENUM_FORM_ACTIVITY_VARIANT.FEES}`}
						/>
					</div>
					<VariantMenu form={form} index={index} />
				</div>
			</CardContent>
		</Card>
	);
};
