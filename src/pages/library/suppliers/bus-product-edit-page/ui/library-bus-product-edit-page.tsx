import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useOptionalResourceQuery } from "@/shared/hooks";

import {
	ENUM_SUPPLIER_TYPE,
	type IBusProduct,
	LIBRARY_SUPPLIER_PRODUCT_CREATE_ID,
	type TSupplierProduct,
	useGetSupplierProductQuery
} from "@/entities/supplier";

import { BusProductEdit } from "@/widgets/library";

const isBusProduct = (product?: TSupplierProduct): product is IBusProduct =>
	product?.typ === ENUM_SUPPLIER_TYPE.BUS;

export const LibraryBusProductEditPage: FC = () => {
	const { t } = useTranslation([
		"bus_product_edit_page",
		"common_events",
		"options"
	]);
	const { supplierId = "", productId = "" } = useParams<{
		supplierId: string;
		productId: string;
	}>();
	const isCreate = productId === LIBRARY_SUPPLIER_PRODUCT_CREATE_ID;

	const { data: product, isRealError } = useOptionalResourceQuery(
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

	const busProduct = isBusProduct(product) ? product : null;

	return (
		<BusProductEdit
			supplierId={supplierId}
			productId={productId}
			isCreate={isCreate}
			product={busProduct}
		/>
	);
};
