import { type PaginationState } from "@tanstack/react-table";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, SmartTable } from "@/shared/ui";

import { useGetStaffQuery } from "@/entities/staff";

import { InviteStaff } from "@/features/settings";

import { COLUMNS } from "../model";

export const StaffInformation: FC = () => {
	const { t } = useTranslation("staff_information_page");
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	});

	const { data, isLoading, isFetching } = useGetStaffQuery({
		page: pagination.pageIndex + 1,
		limit: pagination.pageSize
	});

	const users = data?.data ?? [];
	const totalCount = data?.total ?? 0;

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
						pagination={pagination}
						onPaginationChange={setPagination}
					/>
				</CardContent>
			</Card>
		</section>
	);
};
