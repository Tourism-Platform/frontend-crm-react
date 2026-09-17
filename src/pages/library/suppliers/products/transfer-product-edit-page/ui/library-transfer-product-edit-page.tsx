import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useNavigateByType, useOptionalResourceQuery } from "@/shared/hooks";

import {
	ENUM_SUPPLIER_TYPE,
	LIBRARY_SUPPLIER_PRODUCT_CREATE_ID,
	TRANSFER_PRODUCT_EDIT_SCHEMA,
	type TTransferProductEditSchema,
	buildSupplierProductEditRoute,
	emptyTransferProductEditForm,
	useGetSupplierProductFormQuery,
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

	const { navigateToType, isExpectedType } = useNavigateByType({
		expectedType: ENUM_SUPPLIER_TYPE.TRANSFER,
		actualType: product?.typ,
		params: { supplierId, productId: product?.id ?? productId },
		resolvePath: buildSupplierProductEditRoute,
		enabled: !isCreate && Boolean(product)
	});

	const { data: formValues } = useOptionalResourceQuery(
		useGetSupplierProductFormQuery(
			{ supplierId, productId },
			{
				skip:
					!supplierId ||
					!productId ||
					isCreate ||
					!product ||
					!isExpectedType
			}
		)
	);

	const form = useForm<TTransferProductEditSchema>({
		resolver: zodResolver(TRANSFER_PRODUCT_EDIT_SCHEMA),
		mode: "onSubmit",
		defaultValues: emptyTransferProductEditForm()
	});

	useEffect(() => {
		if (isRealError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isRealError, t]);

	useEffect(() => {
		if (!isCreate && formValues) {
			form.reset(formValues as TTransferProductEditSchema);
		}
	}, [formValues, form, isCreate]);

	const transferProduct =
		product?.typ === ENUM_SUPPLIER_TYPE.TRANSFER ? product : undefined;

	const { createSectionSubmit, isLoading } = useLibraryTransferProductEdit({
		supplierId,
		productId,
		isCreate,
		form,
		product: transferProduct,
		onCreated: (id, typ) =>
			navigateToType(typ, { replace: true }, { productId: id })
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
