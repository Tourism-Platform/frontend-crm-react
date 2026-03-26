import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent, SmartTable } from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	type ENUM_INVOICE_STATUS_TYPE,
	type IInvoiceFilters,
	INVOICE_STATUS_LABELS,
	useGetInvoicesQuery
} from "@/entities/finance";

import { COLUMNS } from "../model";

import { InvoicesHeader } from "./invoices-header";

export const Invoices: FC = () => {
	const { t } = useTranslation(["invoices_page", "options"]);
	const { watch, setValue } = useForm<IInvoiceFilters>({
		defaultValues: {
			search: "",
			status: [],
			page: 1,
			limit: 10
		}
	});

	const filters = watch();

	const {
		data: invoicesData,
		isLoading,
		isFetching
	} = useGetInvoicesQuery(filters);

	const data = useMemo(() => invoicesData?.data ?? [], [invoicesData]);
	const totalCount = invoicesData?.total ?? 0;
	const statusCounts = invoicesData?.statusCounts;

	const statusOptions = useValueToTranslateLabel(INVOICE_STATUS_LABELS);

	const columns = useMemo(() => COLUMNS(t), [t]);

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

	const handleSearchChange = useCallback(
		(val: string) => {
			setValue("search", val);
			setValue("page", 1);
		},
		[setValue]
	);

	const handleStatusChange = useCallback(
		(val: string[]) => {
			setValue("status", val as ENUM_INVOICE_STATUS_TYPE[]);
			setValue("page", 1);
		},
		[setValue]
	);

	return (
		<section className="flex gap-5 flex-col">
			<InvoicesHeader statusCounts={statusCounts} />

			<Card>
				<CardContent>
					<SmartTable
						data={data}
						columns={columns}
						isLoading={isLoading || isFetching}
						loadingMode="skeleton"
						recordCount={totalCount}
						pagination={paginationObj}
						onPaginationChange={handlePaginationChange}
						search={filters.search}
						onSearchChange={handleSearchChange}
						status={filters.status}
						onStatusChange={handleStatusChange}
						statusOptions={statusOptions}
					/>
				</CardContent>
			</Card>
		</section>
	);
};
