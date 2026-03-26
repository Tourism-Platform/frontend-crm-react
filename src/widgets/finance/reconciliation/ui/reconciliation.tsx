import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent, SmartTable } from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	type ENUM_RECONCILIATION_STATUS_TYPE,
	type IReconciliationFilters,
	RECONCILIATION_STATUS_LABELS,
	useGetReconciliationsQuery
} from "@/entities/finance";

import { COLUMNS } from "../model";

import { ReconciliationHeader } from "./reconciliation-header";

export const Reconciliation: FC = () => {
	const { t } = useTranslation(["reconciliation_page", "options"]);
	const { watch, setValue } = useForm<IReconciliationFilters>({
		defaultValues: {
			search: "",
			status: [],
			page: 1,
			limit: 10
		}
	});

	const filters = watch();

	const {
		data: reconciliationData,
		isLoading,
		isFetching
	} = useGetReconciliationsQuery(filters);

	const data = useMemo(
		() => reconciliationData?.data ?? [],
		[reconciliationData]
	);
	const totalCount = reconciliationData?.total ?? 0;
	const statusCounts = reconciliationData?.statusCounts;

	const statusOptions = useValueToTranslateLabel(
		RECONCILIATION_STATUS_LABELS
	);

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
			setValue("status", val as ENUM_RECONCILIATION_STATUS_TYPE[]);
			setValue("page", 1);
		},
		[setValue]
	);

	return (
		<section className="flex gap-5 flex-col">
			<ReconciliationHeader statusCounts={statusCounts} />

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
