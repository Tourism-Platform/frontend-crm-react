import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useNavigateByType, useOptionalResourceQuery } from "@/shared/hooks";

import {
	ENUM_SUPPLIER_TYPE,
	HOTEL_PRODUCT_EDIT_SCHEMA,
	LIBRARY_SUPPLIER_PRODUCT_CREATE_ID,
	type THotelProductEditSchema,
	buildSupplierProductEditRoute,
	emptyHotelProductEditForm,
	useGetSupplierProductFormQuery,
	useGetSupplierProductQuery
} from "@/entities/supplier";

import { HotelProductEdit } from "@/widgets/library";

import { useLibraryHotelProductEdit } from "../model";

export const LibraryHotelProductEditPage: FC = () => {
	const { t } = useTranslation("hotel_product_edit_page");
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
		expectedType: ENUM_SUPPLIER_TYPE.HOTEL,
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

	const form = useForm<THotelProductEditSchema>({
		resolver: zodResolver(HOTEL_PRODUCT_EDIT_SCHEMA),
		mode: "onSubmit",
		defaultValues: emptyHotelProductEditForm()
	});

	useEffect(() => {
		if (isRealError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isRealError, t]);

	useEffect(() => {
		if (!isCreate && formValues) {
			form.reset(formValues as THotelProductEditSchema);
		}
	}, [formValues, form, isCreate]);

	const hotelProduct =
		product?.typ === ENUM_SUPPLIER_TYPE.HOTEL ? product : undefined;

	const { createSectionSubmit, isLoading } = useLibraryHotelProductEdit({
		supplierId,
		productId,
		isCreate,
		form,
		product: hotelProduct,
		onCreated: (id, typ) =>
			navigateToType(typ, { replace: true }, { productId: id })
	});

	if (!isCreate && product && !isExpectedType) {
		return null;
	}

	return (
		<HotelProductEdit
			form={form}
			createSectionSubmit={createSectionSubmit}
			isLoading={isLoading}
			supplierId={supplierId}
			productId={productId}
			isCreate={isCreate}
			product={hotelProduct}
		/>
	);
};
