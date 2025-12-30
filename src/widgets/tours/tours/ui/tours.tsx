import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent, SmartTable } from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	ENUM_TOUR_STATUS,
	type ENUM_TOUR_STATUS_TYPE,
	type ITourFilters,
	TOUR_STATUS_LABELS,
	TourCard,
	TourCardSkeleton,
	useGetToursQuery
} from "@/entities/tour";

import { CreateTour } from "@/features/tours";

import { COLUMNS } from "../model";

export const Tours: FC = () => {
	const { t } = useTranslation("tours_page");

	const { watch, setValue } = useForm<ITourFilters>({
		defaultValues: {
			search: "",
			status: [ENUM_TOUR_STATUS.ALL],
			page: 1,
			limit: 10
		}
	});

	const filters = watch();

	const { data, isLoading, isFetching } = useGetToursQuery(filters);

	const tours = data?.data ?? [];
	const totalCount = data?.total ?? 0;

	const statusOptions = useValueToTranslateLabel(TOUR_STATUS_LABELS);

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
		setValue("status", val as ENUM_TOUR_STATUS_TYPE[]);
		setValue("page", 1);
	};

	const handleStatusTabChange = (val: string) => {
		setValue("status", [val as ENUM_TOUR_STATUS_TYPE]);
		setValue("page", 1);
	};

	const activeTab =
		filters.status.length === 1 ? filters.status[0] : ENUM_TOUR_STATUS.ALL;

	// Переводим тексты табов
	const translatedStatusTabs = useValueToTranslateLabel(TOUR_STATUS_LABELS);

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent>
					<SmartTable
						columns={COLUMNS()}
						data={tours}
						recordCount={totalCount}
						isLoading={isLoading || isFetching}
						loadingMode="skeleton"
						pagination={{
							pageIndex: filters.page - 1,
							pageSize: filters.limit
						}}
						onPaginationChange={handlePaginationChange}
						useViewMode={true}
						defaultViewMode="cards"
						card={TourCard}
						cardSkeleton={TourCardSkeleton}
						showTopFilters={true}
						search={filters.search}
						onSearchChange={handleSearchChange}
						status={filters.status}
						onStatusChange={handleStatusChange}
						statusOptions={statusOptions}
						statusTabs={translatedStatusTabs}
						activeStatusTab={activeTab}
						onStatusTabChange={handleStatusTabChange}
						showStatusTabsFilter={true}
						actions={<CreateTour />}
					/>
				</CardContent>
			</Card>
		</section>
	);
};
