import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_ACTIVITY_SECTION,
	ENUM_FORM_ACTIVITY_VARIANTS,
	ENUM_SUPPLIER_TYPE,
	type TActivityProductEditSchema
} from "@/entities/supplier";

import { CreateProductVariant } from "@/features/library";

import { VariantCard } from "./variant-card";

interface IVariantsDetailsProps {
	form: UseFormReturn<TActivityProductEditSchema>;
	supplierId: string;
	productId: string;
}

const VariantsDetailsBase: FC<IVariantsDetailsProps> = ({
	form,
	supplierId,
	productId
}) => {
	const { t } = useTranslation("activity_product_edit_page");
	const { fields } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_ACTIVITY_SECTION.VARIANTS}.${ENUM_FORM_ACTIVITY_VARIANTS.VARIANTS_LIST}`
	});

	return (
		<div className="grid gap-6">
			<div className="flex items-center justify-between gap-4">
				<h2 className="text-xl">{t("form.variants.title")}</h2>
				<CreateProductVariant
					supplierId={supplierId}
					productId={productId}
					typ={ENUM_SUPPLIER_TYPE.ACTIVITY}
					ns="activity_product_edit_page"
				/>
			</div>

			<div className="grid gap-4">
				{fields.map((field, index) => (
					<VariantCard
						key={field.id}
						form={form}
						index={index}
						supplierId={supplierId}
						productId={productId}
					/>
				))}
			</div>
		</div>
	);
};

export const VariantsDetails = withErrorBoundary(VariantsDetailsBase);
