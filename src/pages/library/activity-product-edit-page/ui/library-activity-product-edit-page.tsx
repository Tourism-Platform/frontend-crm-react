import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useOptionalResourceQuery } from "@/shared/hooks";

import {
	ENUM_SUPPLIER_TYPE,
	type IActivityProduct,
	LIBRARY_SUPPLIER_PRODUCT_CREATE_ID,
	type TSupplierProduct,
	useGetSupplierProductQuery
} from "@/entities/supplier";

import { ActivityProductEdit } from "@/widgets/library";

const isActivityProduct = (
	product?: TSupplierProduct
): product is IActivityProduct => product?.typ === ENUM_SUPPLIER_TYPE.ACTIVITY;

export const LibraryActivityProductEditPage: FC = () => {
	const { t } = useTranslation([
		"activity_product_edit_page",
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

	const activityProduct = isActivityProduct(product) ? product : null;

	return (
		<ActivityProductEdit
			supplierId={supplierId}
			productId={productId}
			isCreate={isCreate}
			product={activityProduct}
		/>
	);
};
