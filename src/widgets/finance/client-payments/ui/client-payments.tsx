import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

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
	const { t } = useTranslation("client_payments_page");
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
	const {
		data: paymentsData,
		isLoading,
		isFetching,
		isError
	} = useGetPaymentsQuery(filters);

	useEffect(() => {
		if (isError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isError, t]);

	const payments = paymentsData?.data ?? [];
	const totalCount = paymentsData?.total ?? 0;
	const statusCounts = paymentsData?.statusCounts;

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
