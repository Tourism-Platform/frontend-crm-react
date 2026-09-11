import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useOptionalResourceQuery } from "@/shared/hooks";

import {
	ENUM_SUPPLIER_TYPE,
	type ITransferProduct,
	LIBRARY_SUPPLIER_PRODUCT_CREATE_ID,
	type TSupplierProduct,
	useGetSupplierProductQuery
} from "@/entities/supplier";

import { TransferProductEdit } from "@/widgets/library";

const isTransferProduct = (
	product?: TSupplierProduct
): product is ITransferProduct => product?.typ === ENUM_SUPPLIER_TYPE.TRANSFER;

export const LibraryTransferProductEditPage: FC = () => {
	const { t } = useTranslation([
		"transfer_product_edit_page",
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

	const transferProduct = isTransferProduct(product) ? product : null;

	return (
		<TransferProductEdit
			supplierId={supplierId}
			productId={productId}
			isCreate={isCreate}
			product={transferProduct}
		/>
	);
};
