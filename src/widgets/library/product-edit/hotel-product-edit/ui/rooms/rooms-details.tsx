import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_HOTEL_PRODUCT_ROOMS,
	ENUM_FORM_HOTEL_SECTION,
	ENUM_HOTEL_PRICING,
	ENUM_SUPPLIER_TYPE,
	type IHotelProduct,
	type THotelProductEditSchema
} from "@/entities/supplier";

import { CreateProductVariant } from "@/features/library";

import { RoomCard } from "./room-card";

interface IRoomsDetailsProps {
	form: UseFormReturn<THotelProductEditSchema>;
	supplierId: string;
	productId: string;
	product?: IHotelProduct | null;
}

const RoomsDetailsBase: FC<IRoomsDetailsProps> = ({
	form,
	supplierId,
	productId,
	product
}) => {
	const { t } = useTranslation("hotel_product_edit_page");
	const { fields } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_HOTEL_SECTION.ROOMS}.${ENUM_FORM_HOTEL_PRODUCT_ROOMS.ROOMS_LIST}`
	});

	return (
		<div className="grid gap-6">
			<div className="flex items-center justify-between gap-4">
				<h2 className="text-xl">{t("form.rooms.details.title")}</h2>
				<CreateProductVariant
					supplierId={supplierId}
					productId={productId}
					typ={ENUM_SUPPLIER_TYPE.HOTEL}
					pricing={product?.pricing ?? ENUM_HOTEL_PRICING.PER_ROOM}
					ns="hotel_product_edit_page"
				/>
			</div>

			<div className="grid gap-4">
				{fields.map((field, index) => (
					<RoomCard
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

export const RoomsDetails = withErrorBoundary(RoomsDetailsBase);
