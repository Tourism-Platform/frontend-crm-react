import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC } from "react";
import { useForm } from "react-hook-form";

import { Card, CardContent, SmartTable } from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	type ENUM_PAYMENT_STATUS_TYPE,
	type IPaymentFilters,
	PAYMENT_STATUS_LABELS,
	useGetAvailableOrderIdsQuery,
	useGetPaymentsQuery
} from "@/entities/finance";

import { NewPayment } from "@/features/finance";

import { COLUMNS } from "../model";

import { ClientPaymentsHeader } from "./client-payments-header";

export const ClientPayments: FC = () => {
	const { watch, setValue } = useForm<IPaymentFilters>({
		defaultValues: {
			search: "",
			status: [],
			page: 1,
			limit: 10
		}
	});

	const filters = watch();

	useGetAvailableOrderIdsQuery();
	const { data, isLoading, isFetching } = useGetPaymentsQuery(filters);

	const payments = data?.data ?? [];
	const totalCount = data?.total ?? 0;
	const statusCounts = data?.statusCounts;

	const statusOptions = useValueToTranslateLabel(PAYMENT_STATUS_LABELS);

	const handlePaginationChange: OnChangeFn<PaginationState> = (
		updaterOrValue
	) => {
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
	};

	const handleSearchChange = (val: string) => {
		setValue("search", val);
		setValue("page", 1);
	};

	const handleStatusChange = (val: string[]) => {
		setValue("status", val as ENUM_PAYMENT_STATUS_TYPE[]);
		setValue("page", 1);
	};

	return (
		<section className="flex gap-5 flex-col">
			<ClientPaymentsHeader statusCounts={statusCounts} />
			<Card>
				<CardContent>
					<SmartTable
						data={payments}
						columns={COLUMNS()}
						actions={<NewPayment />}
						isLoading={isLoading || isFetching}
						loadingMode="skeleton"
						recordCount={totalCount}
						pagination={{
							pageIndex: filters.page - 1,
							pageSize: filters.limit
						}}
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
