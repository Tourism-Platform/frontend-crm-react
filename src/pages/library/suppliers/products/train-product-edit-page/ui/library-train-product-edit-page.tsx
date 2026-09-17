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
	TRAIN_PRODUCT_EDIT_SCHEMA,
	type TTrainProductEditSchema,
	buildSupplierProductEditRoute,
	emptyTrainProductEditForm,
	useGetSupplierProductFormQuery,
	useGetSupplierProductQuery
} from "@/entities/supplier";

import { TrainProductEdit } from "@/widgets/library";

import { useLibraryTrainProductEdit } from "../model";

export const LibraryTrainProductEditPage: FC = () => {
	const { t } = useTranslation("train_product_edit_page");
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
		expectedType: ENUM_SUPPLIER_TYPE.TRAIN,
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

	const form = useForm<TTrainProductEditSchema>({
		resolver: zodResolver(TRAIN_PRODUCT_EDIT_SCHEMA),
		mode: "onSubmit",
		defaultValues: emptyTrainProductEditForm()
	});

	useEffect(() => {
		if (isRealError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isRealError, t]);

	useEffect(() => {
		if (!isCreate && formValues) {
			form.reset(formValues as TTrainProductEditSchema);
		}
	}, [formValues, form, isCreate]);

	const trainProduct =
		product?.typ === ENUM_SUPPLIER_TYPE.TRAIN ? product : undefined;

	const { createSectionSubmit, isLoading } = useLibraryTrainProductEdit({
		supplierId,
		productId,
		isCreate,
		form,
		product: trainProduct,
		onCreated: (id, typ) =>
			navigateToType(typ, { replace: true }, { productId: id })
	});

	if (!isCreate && product && !isExpectedType) {
		return null;
	}

	return (
		<TrainProductEdit
			form={form}
			createSectionSubmit={createSectionSubmit}
			isLoading={isLoading}
			supplierId={supplierId}
			productId={productId}
			isCreate={isCreate}
			product={trainProduct}
		/>
	);
};
