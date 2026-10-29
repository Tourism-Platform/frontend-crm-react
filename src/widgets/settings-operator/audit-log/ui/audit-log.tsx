import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { INTERSECTION_ELEMENTS } from "@/shared/config";
import { useOptionalResourceQuery } from "@/shared/hooks";
import { Card, CardContent, withErrorBoundary } from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import {
	type IAuditLogFilters,
	useGetOrgAuditLogsQuery
} from "@/entities/audit";

import { COLUMNS } from "../model";

const AuditLogBase: FC = () => {
	const { t } = useTranslation("audit_log_page");
	const { t: tCols } = useTranslation(["audit_log_page", "options"]);
	const [filters, setFilters] = useState<IAuditLogFilters>({
		page: 1,
		limit: INTERSECTION_ELEMENTS.AUDIT_LOG
	});

	const {
		data: logsData,
		isLoading,
		isFetching,
		isRealError: isError
	} = useOptionalResourceQuery(useGetOrgAuditLogsQuery(filters));

	useEffect(() => {
		if (isError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isError, t]);

	const logs = useMemo(() => logsData?.data ?? [], [logsData]);
	const totalCount = logsData?.total ?? 0;

	const columns = useMemo(() => COLUMNS(tCols), [tCols]);

	const paginationObj = useMemo(
		() => ({
			pageIndex: filters.page - 1,
			pageSize: filters.limit
		}),
		[filters.page, filters.limit]
	);

	const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(
		(updaterOrValue) => {
			const nextValue =
				typeof updaterOrValue === "function"
					? updaterOrValue(paginationObj)
					: updaterOrValue;

			setFilters((prev) => ({
				...prev,
				page: nextValue.pageIndex + 1,
				limit: nextValue.pageSize
			}));
		},
		[paginationObj]
	);

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="md:text-3xl text-2xl">{t("page_name")}</h1>
			<Card>
				<CardContent>
					<SmartTable
						data={logs}
						columns={columns}
						isLoading={isLoading || isFetching}
						loadingMode="skeleton"
						recordCount={totalCount}
						pagination={paginationObj}
						onPaginationChange={handlePaginationChange}
						showTopFilters={false}
					/>
				</CardContent>
			</Card>
		</section>
	);
};

export const AuditLog = withErrorBoundary(AuditLogBase);
