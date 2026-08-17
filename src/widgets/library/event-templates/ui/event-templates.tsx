import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useOptionalResourceQuery } from "@/shared/hooks";
import { Card, CardContent, withErrorBoundary } from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	type ENUM_EVENT_TYPE,
	EVENT_LIBRARY_TYPE_LABELS,
	type IEventLibraryFilters,
	useListEventLibraryQuery
} from "@/entities/tour";

import { CreateEventTemplate } from "@/features/library";

import { COLUMNS } from "../model";

const DEFAULT_FILTERS: IEventLibraryFilters = {
	search: "",
	status: [],
	page: 1,
	limit: 10
};

const EventTemplatesBase: FC = () => {
	const { t } = useTranslation("event_templates_page");

	const { watch, setValue } = useForm<IEventLibraryFilters>({
		defaultValues: DEFAULT_FILTERS
	});

	const filters = watch();

	const {
		data: templatesData,
		isLoading,
		isFetching,
		isRealError: isError
	} = useOptionalResourceQuery(useListEventLibraryQuery(filters));

	useEffect(() => {
		if (isError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isError, t]);

	const templates = useMemo(() => templatesData?.data ?? [], [templatesData]);
	const totalCount = templatesData?.total ?? 0;

	const statusOptions = useValueToTranslateLabel(EVENT_LIBRARY_TYPE_LABELS);

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
			setValue("status", val as ENUM_EVENT_TYPE[]);
			setValue("page", 1);
		},
		[setValue]
	);

	const actionsJsx = useMemo(() => <CreateEventTemplate />, []);

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent>
					<h2 className="text-lg font-medium mb-4">
						{t("templates_title")}
					</h2>
					<SmartTable
						data={templates}
						columns={columns}
						actions={actionsJsx}
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
						statusKey="eventType"
					/>
				</CardContent>
			</Card>
		</section>
	);
};

export const EventTemplates = withErrorBoundary(EventTemplatesBase);
