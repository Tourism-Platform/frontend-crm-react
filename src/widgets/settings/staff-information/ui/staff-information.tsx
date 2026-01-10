import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Card, CardContent, SmartTable } from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	type ENUM_STAFF_STATUS_OPTIONS_TYPE,
	type IStaffFilters,
	STAFF_STATUS_LABELS,
	useGetStaffQuery
} from "@/entities/staff";

import { InviteStaff } from "@/features/settings";

import { COLUMNS } from "../model";

export const StaffInformation: FC = () => {
	const { t } = useTranslation("staff_information_page");

	const { watch, setValue } = useForm<IStaffFilters>({
		defaultValues: {
			search: "",
			status: [],
			page: 1,
			limit: 10
		}
	});

	const filters = watch();

	const {
		data: staffData,
		isLoading,
		isFetching,
		isError
	} = useGetStaffQuery(filters);

	useEffect(() => {
		if (isError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isError, t]);

	const users = staffData?.data ?? [];
	const totalCount = staffData?.total ?? 0;

	const statusOptions = useValueToTranslateLabel(STAFF_STATUS_LABELS);

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
		setValue("status", val as ENUM_STAFF_STATUS_OPTIONS_TYPE[]);
		setValue("page", 1);
	};

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent>
					<SmartTable
						data={users}
						columns={COLUMNS()}
						actions={<InviteStaff />}
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
