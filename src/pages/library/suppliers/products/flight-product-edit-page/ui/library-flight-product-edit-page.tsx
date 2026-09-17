import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useNavigateByType, useOptionalResourceQuery } from "@/shared/hooks";

import {
	ENUM_SUPPLIER_TYPE,
	FLIGHT_PRODUCT_EDIT_SCHEMA,
	LIBRARY_SUPPLIER_PRODUCT_CREATE_ID,
	type TFlightProductEditSchema,
	buildSupplierProductEditRoute,
	emptyFlightProductEditForm,
	useGetSupplierProductFormQuery,
	useGetSupplierProductQuery
} from "@/entities/supplier";

import { FlightProductEdit } from "@/widgets/library";

import { useLibraryFlightProductEdit } from "../model";

export const LibraryFlightProductEditPage: FC = () => {
	const { t } = useTranslation("flight_product_edit_page");
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
		expectedType: ENUM_SUPPLIER_TYPE.FLIGHT,
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

	const form = useForm<TFlightProductEditSchema>({
		resolver: zodResolver(FLIGHT_PRODUCT_EDIT_SCHEMA),
		mode: "onSubmit",
		defaultValues: emptyFlightProductEditForm()
	});

	useEffect(() => {
		if (isRealError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isRealError, t]);

	useEffect(() => {
		if (!isCreate && formValues) {
			form.reset(formValues as TFlightProductEditSchema);
		}
	}, [formValues, form, isCreate]);

	const flightProduct =
		product?.typ === ENUM_SUPPLIER_TYPE.FLIGHT ? product : undefined;

	const { createSectionSubmit, isLoading } = useLibraryFlightProductEdit({
		supplierId,
		productId,
		isCreate,
		form,
		product: flightProduct,
		onCreated: (id, typ) =>
			navigateToType(typ, { replace: true }, { productId: id })
	});

	if (!isCreate && product && !isExpectedType) {
		return null;
	}

	return (
		<FlightProductEdit
			form={form}
			createSectionSubmit={createSectionSubmit}
			isLoading={isLoading}
			supplierId={supplierId}
			productId={productId}
			isCreate={isCreate}
			product={flightProduct}
		/>
	);
};
