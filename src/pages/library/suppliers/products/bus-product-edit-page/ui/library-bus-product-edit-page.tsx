import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useNavigateByType, useOptionalResourceQuery } from "@/shared/hooks";

import {
	BUS_PRODUCT_EDIT_SCHEMA,
	ENUM_SUPPLIER_TYPE,
	LIBRARY_SUPPLIER_PRODUCT_CREATE_ID,
	type TBusProductEditSchema,
	buildSupplierProductEditRoute,
	emptyBusProductEditForm,
	useGetSupplierProductFormQuery,
	useGetSupplierProductQuery
} from "@/entities/supplier";

import { BusProductEdit } from "@/widgets/library";

import { useLibraryBusProductEdit } from "../model";

export const LibraryBusProductEditPage: FC = () => {
	const { t } = useTranslation("bus_product_edit_page");
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
		expectedType: ENUM_SUPPLIER_TYPE.BUS,
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

	const form = useForm<TBusProductEditSchema>({
		resolver: zodResolver(BUS_PRODUCT_EDIT_SCHEMA),
		mode: "onSubmit",
		defaultValues: emptyBusProductEditForm()
	});

	useEffect(() => {
		if (isRealError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isRealError, t]);

	useEffect(() => {
		if (!isCreate && formValues) {
			form.reset(formValues as TBusProductEditSchema);
		}
	}, [formValues, form, isCreate]);

	const busProduct =
		product?.typ === ENUM_SUPPLIER_TYPE.BUS ? product : undefined;

	const { createSectionSubmit, isLoading } = useLibraryBusProductEdit({
		supplierId,
		productId,
		isCreate,
		form,
		product: busProduct,
		onCreated: (id, typ) =>
			navigateToType(typ, { replace: true }, { productId: id })
	});

	if (!isCreate && product && !isExpectedType) {
		return null;
	}

	return (
		<BusProductEdit
			form={form}
			createSectionSubmit={createSectionSubmit}
			isLoading={isLoading}
			supplierId={supplierId}
			productId={productId}
			isCreate={isCreate}
			product={busProduct}
		/>
	);
};
