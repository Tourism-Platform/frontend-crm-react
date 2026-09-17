import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";

import {
	ENUM_BUS_PRICING,
	ENUM_FORM_BUS_SECTION,
	ENUM_FORM_BUS_VEHICLES,
	ENUM_SUPPLIER_TYPE,
	type IBusProduct,
	type TBusProductEditSchema
} from "@/entities/supplier";

import { CreateProductVariant } from "@/features/library";

import { VehiclesCard } from "./vehicles-card";

interface IVehiclesDetailsProps {
	form: UseFormReturn<TBusProductEditSchema>;
	supplierId: string;
	productId: string;
	product?: IBusProduct | null;
}

const VehiclesDetailsBase: FC<IVehiclesDetailsProps> = ({
	form,
	supplierId,
	productId,
	product
}) => {
	const { t } = useTranslation("bus_product_edit_page");
	const { fields } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_BUS_SECTION.VEHICLES}.${ENUM_FORM_BUS_VEHICLES.VEHICLES_LIST}`
	});

	return (
		<div className="grid gap-6">
			<div className="flex items-center justify-between gap-4">
				<h2 className="text-xl">{t("form.vehicles.details.title")}</h2>
				<CreateProductVariant
					supplierId={supplierId}
					productId={productId}
					typ={ENUM_SUPPLIER_TYPE.BUS}
					pricing={product?.pricing ?? ENUM_BUS_PRICING.PER_VEHICLE}
					ns="bus_product_edit_page"
				/>
			</div>

			<div className="grid gap-4">
				{fields.map((field, index) => (
					<VehiclesCard
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

export const VehiclesDetails = withErrorBoundary(VehiclesDetailsBase);
