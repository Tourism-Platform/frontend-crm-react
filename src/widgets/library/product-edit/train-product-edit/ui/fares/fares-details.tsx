import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_TRAIN_FARES,
	ENUM_FORM_TRAIN_SECTION,
	ENUM_SUPPLIER_TYPE,
	ENUM_TRAIN_PRICING,
	type ITrainProduct,
	type TTrainProductEditSchema
} from "@/entities/supplier";

import { CreateProductVariant } from "@/features/library";

import { FareCard } from "./fare-card";

interface IFaresDetailsProps {
	form: UseFormReturn<TTrainProductEditSchema>;
	supplierId: string;
	productId: string;
	product?: ITrainProduct | null;
}

const FaresDetailsBase: FC<IFaresDetailsProps> = ({
	form,
	supplierId,
	productId,
	product
}) => {
	const { t } = useTranslation("train_product_edit_page");
	const { fields } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_TRAIN_SECTION.FARES}.${ENUM_FORM_TRAIN_FARES.FARES_LIST}`
	});

	return (
		<div className="grid gap-6">
			<div className="flex items-center justify-between gap-4">
				<h2 className="text-xl">{t("form.fares.details.title")}</h2>
				<CreateProductVariant
					supplierId={supplierId}
					productId={productId}
					typ={ENUM_SUPPLIER_TYPE.TRAIN}
					pricing={product?.pricing ?? ENUM_TRAIN_PRICING.PER_FARE}
					ns="train_product_edit_page"
				/>
			</div>

			<div className="grid gap-4">
				{fields.map((field, index) => (
					<FareCard
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

export const FaresDetails = withErrorBoundary(FaresDetailsBase);
