import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Card, CardContent, SmartTable } from "@/shared/ui";

import {
	CatalogTourCard,
	CatalogTourCardSkeleton,
	type ICatalogTourFilters,
	type IRecentSearch,
	type ISearchTours,
	useGetCatalogToursQuery
} from "@/entities/tour";

import { SearchToursBar } from "@/features/tours";

import { CATALOG_COLUMNS } from "@/widgets/tours";

import { RecentlySearch } from "./recently-search";

const DEFAULT_FILTERS: ICatalogTourFilters = {
	search: "",
	page: 1,
	limit: 10,
	filters: {
		region: [],
		duration: [],
		language: [],
		category: [],
		price: {
			from: 0,
			to: 3600
		}
	}
};

export const SearchTours: FC = () => {
	const { t } = useTranslation("tours_catalog_page");

	const topSearchForm = useForm<ISearchTours>({
		defaultValues: {
			destination: "",
			dates: { from: "", to: "" }
		}
	});

	const methods = useForm<ICatalogTourFilters>({
		defaultValues: DEFAULT_FILTERS
	});

	const { watch, setValue } = methods;
	const filters = watch();

	const {
		data: toursData,
		isLoading,
		isFetching,
		isError
	} = useGetCatalogToursQuery(filters);

	useEffect(() => {
		if (isError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isError, t]);

	const tours = toursData?.data ?? [];
	const totalCount = toursData?.total ?? 0;

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

	const handleRecentSelect = (data: IRecentSearch) => {
		topSearchForm.reset({
			destination: data.destination,
			dates: data.dates
		});
	};
	console.log(topSearchForm.watch());

	return (
		<section className="grid gap-12">
			<SearchToursBar form={topSearchForm} />
			<RecentlySearch onSelect={handleRecentSelect} />
			<Card>
				<CardContent>
					<SmartTable
						columns={CATALOG_COLUMNS()}
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
						card={CatalogTourCard}
						cardSkeleton={CatalogTourCardSkeleton}
						showTopFilters={true}
						search={filters.search}
						onSearchChange={handleSearchChange}
						showVisibilityFilter={false}
						showStatusFilter={false}
					/>
				</CardContent>
			</Card>
		</section>
	);
};
