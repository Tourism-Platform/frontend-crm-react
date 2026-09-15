import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_TRANSFER_CARS,
	ENUM_FORM_TRANSFER_SECTION,
	ENUM_SUPPLIER_TYPE,
	ENUM_TRANSFER_PRICING,
	type ITransferProduct,
	type TTransferProductEditSchema
} from "@/entities/supplier";

import { CreateProductVariant } from "@/features/library";

import { CarsCard } from "./cars-card";

interface ICarsDetailsProps {
	form: UseFormReturn<TTransferProductEditSchema>;
	supplierId: string;
	productId: string;
	product?: ITransferProduct | null;
}

const CarsDetailsBase: FC<ICarsDetailsProps> = ({
	form,
	supplierId,
	productId,
	product
}) => {
	const { t } = useTranslation("transfer_product_edit_page");
	const { fields } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_TRANSFER_SECTION.CARS}.${ENUM_FORM_TRANSFER_CARS.CARS_LIST}`
	});

	return (
		<div className="grid gap-6">
			<div className="flex items-center justify-between gap-4">
				<h2 className="text-xl">{t("form.cars.details.title")}</h2>
				<CreateProductVariant
					supplierId={supplierId}
					productId={productId}
					typ={ENUM_SUPPLIER_TYPE.TRANSFER}
					pricing={product?.pricing ?? ENUM_TRANSFER_PRICING.PER_CAR}
					ns="transfer_product_edit_page"
				/>
			</div>

			<div className="grid gap-4">
				{fields.map((field, index) => (
					<CarsCard
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

export const CarsDetails = withErrorBoundary(CarsDetailsBase);
