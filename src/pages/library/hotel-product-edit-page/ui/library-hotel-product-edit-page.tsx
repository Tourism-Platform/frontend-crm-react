import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useOptionalResourceQuery } from "@/shared/hooks";
import { PageLoader } from "@/shared/ui";

import {
	ENUM_SUPPLIER_TYPE,
	type IHotelProduct,
	LIBRARY_SUPPLIER_PRODUCT_CREATE_ID,
	type TSupplierProduct,
	useGetSupplierProductQuery
} from "@/entities/supplier";

import { HotelProductEdit } from "@/widgets/library";

const isHotelProduct = (product?: TSupplierProduct): product is IHotelProduct =>
	product?.typ === ENUM_SUPPLIER_TYPE.HOTEL;

export const LibraryHotelProductEditPage: FC = () => {
	const { t } = useTranslation("hotel_product_edit_page");
	const { supplierId = "", productId = "" } = useParams<{
		supplierId: string;
		productId: string;
	}>();
	const isCreate = productId === LIBRARY_SUPPLIER_PRODUCT_CREATE_ID;

	const {
		data: product,
		isLoading,
		isRealError
	} = useOptionalResourceQuery(
		useGetSupplierProductQuery(
			{ supplierId, productId },
			{ skip: !supplierId || !productId || isCreate }
		)
	);

	useEffect(() => {
		if (isRealError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isRealError, t]);

	if (!isCreate && isLoading) {
		return <PageLoader />;
	}

	const hotelProduct = isHotelProduct(product) ? product : null;

	return (
		<HotelProductEdit
			supplierId={supplierId}
			productId={productId}
			isCreate={isCreate}
			product={hotelProduct}
		/>
	);
};
