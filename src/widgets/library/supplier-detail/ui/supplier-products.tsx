import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { INTERSECTION_ELEMENTS } from "@/shared/config";
import { useOptionalResourceQuery } from "@/shared/hooks";
import { Card, CardContent, withErrorBoundary } from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import {
	type ISupplierProductFilters,
	useListAllProductsQuery
} from "@/entities/supplier";

import { CreateSupplierProduct } from "@/features/library";

import { COLUMNS } from "../model";

interface ISupplierProductsProps {
	supplierId: string;
}

const SupplierProductsBase: FC<ISupplierProductsProps> = ({ supplierId }) => {
	const { t } = useTranslation("supplier_id_page");
	const { watch, setValue } = useForm<ISupplierProductFilters>({
		defaultValues: {
			page: 1,
			limit: INTERSECTION_ELEMENTS.SUPPLIER_PRODUCTS
		}
	});
	const filters = watch();

	const {
		data: productsData,
		isLoading: isProductsLoading,
		isFetching: isProductsFetching,
		isRealError: isProductsError
	} = useOptionalResourceQuery(
		useListAllProductsQuery(
			{
				supplierId,
				page: filters.page,
				limit: filters.limit
			},
			{ skip: !supplierId }
		)
	);

	useEffect(() => {
		if (isProductsError) {
			toast.error(t("toasts.load_products.error"));
		}
	}, [isProductsError, t]);

	const products = useMemo(() => productsData?.data ?? [], [productsData]);
	const totalCount = productsData?.total ?? 0;
	const columns = useMemo(() => COLUMNS(t, supplierId), [t, supplierId]);

	const paginationObj = useMemo(
		() => ({
			pageIndex: filters.page - 1,
			pageSize: filters.limit
		}),
		[filters.page, filters.limit]
	);

	const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(
		(updaterOrValue) => {
			const currentPagination = {
				pageIndex: filters.page - 1,
				pageSize: filters.limit
			};
			const nextValue =
				typeof updaterOrValue === "function"
					? updaterOrValue(currentPagination)
					: updaterOrValue;
			setValue("page", nextValue.pageIndex + 1);
			setValue("limit", nextValue.pageSize);
		},
		[filters.page, filters.limit, setValue]
	);

	return (
		<Card>
			<CardContent className="flex flex-col gap-4">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<h2 className="text-lg font-semibold">
						{t("products_title")}
					</h2>
					<CreateSupplierProduct supplierId={supplierId} />
				</div>
				<SmartTable
					data={products}
					columns={columns}
					isLoading={isProductsLoading || isProductsFetching}
					loadingMode="skeleton"
					recordCount={totalCount}
					pagination={paginationObj}
					onPaginationChange={handlePaginationChange}
				/>
			</CardContent>
		</Card>
	);
};

export const SupplierProducts = withErrorBoundary(SupplierProductsBase);
