import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useNavigateByType, useOptionalResourceQuery } from "@/shared/hooks";

import {
	ACTIVITY_PRODUCT_EDIT_SCHEMA,
	ENUM_SUPPLIER_TYPE,
	LIBRARY_SUPPLIER_PRODUCT_CREATE_ID,
	type TActivityProductEditSchema,
	buildSupplierProductEditRoute,
	emptyActivityProductEditForm,
	useGetSupplierProductFormQuery,
	useGetSupplierProductQuery
} from "@/entities/supplier";

import { ActivityProductEdit } from "@/widgets/library";

import { useLibraryActivityProductEdit } from "../model";

export const LibraryActivityProductEditPage: FC = () => {
	const { t } = useTranslation("activity_product_edit_page");
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
		expectedType: ENUM_SUPPLIER_TYPE.ACTIVITY,
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

	const form = useForm<TActivityProductEditSchema>({
		resolver: zodResolver(ACTIVITY_PRODUCT_EDIT_SCHEMA),
		mode: "onSubmit",
		defaultValues: emptyActivityProductEditForm()
	});

	useEffect(() => {
		if (isRealError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isRealError, t]);

	useEffect(() => {
		if (!isCreate && formValues) {
			form.reset(formValues as TActivityProductEditSchema);
		}
	}, [formValues, form, isCreate]);

	const activityProduct =
		product?.typ === ENUM_SUPPLIER_TYPE.ACTIVITY ? product : undefined;

	const { createSectionSubmit, isLoading } = useLibraryActivityProductEdit({
		supplierId,
		productId,
		isCreate,
		form,
		product: activityProduct,
		onCreated: (id, typ) =>
			navigateToType(typ, { replace: true }, { productId: id })
	});

	if (!isCreate && product && !isExpectedType) {
		return null;
	}

	return (
		<ActivityProductEdit
			form={form}
			createSectionSubmit={createSectionSubmit}
			isLoading={isLoading}
			supplierId={supplierId}
			productId={productId}
			isCreate={isCreate}
			product={activityProduct}
		/>
	);
};
