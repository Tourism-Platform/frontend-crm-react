import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useOptionalResourceQuery } from "@/shared/hooks";

import {
	LIBRARY_SUPPLIER_PRODUCT_CREATE_ID,
	useGetSupplierProductQuery
} from "@/entities/supplier";

import { TransferProductEdit } from "@/widgets/library";

import { useLibraryTransferProductEdit } from "../model";

export const LibraryTransferProductEditPage: FC = () => {
	const { t } = useTranslation("transfer_product_edit_page");
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

	const {
		form,
		createSectionSubmit,
		isLoading,
		isExpectedType,
		product: transferProduct
	} = useLibraryTransferProductEdit({
		supplierId,
		productId,
		isCreate,
		product
	});

	if (!isCreate && product && !isExpectedType) {
		return null;
	}

	return (
		<TransferProductEdit
			form={form}
			createSectionSubmit={createSectionSubmit}
			isLoading={isLoading}
			supplierId={supplierId}
			productId={productId}
			isCreate={isCreate}
			product={transferProduct}
		/>
	);
};
