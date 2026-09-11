import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useOptionalResourceQuery } from "@/shared/hooks";

import {
	ENUM_SUPPLIER_TYPE,
	type IFlightProduct,
	LIBRARY_SUPPLIER_PRODUCT_CREATE_ID,
	type TSupplierProduct,
	useGetSupplierProductQuery
} from "@/entities/supplier";

import { FlightProductEdit } from "@/widgets/library";

const isFlightProduct = (
	product?: TSupplierProduct
): product is IFlightProduct => product?.typ === ENUM_SUPPLIER_TYPE.FLIGHT;

export const LibraryFlightProductEditPage: FC = () => {
	const { t } = useTranslation([
		"flight_product_edit_page",
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

	const flightProduct = isFlightProduct(product) ? product : null;

	return (
		<FlightProductEdit
			supplierId={supplierId}
			productId={productId}
			isCreate={isCreate}
			product={flightProduct}
		/>
	);
};
