import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useDebounce } from "@/shared/hooks";
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	withErrorBoundary
} from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import {
	CatalogTourCard,
	CatalogTourCardSkeleton,
	type ICatalogTourFilters,
	useGetCatalogToursQuery
} from "@/entities/tour";

import { SearchToursBar } from "@/features/tours";

import { CATALOG_COLUMNS } from "../model";

import { CatalogToursFilter } from "./catalog-tours-filter";
import { CatalogToursSimilar } from "./catalog-tours-similar";

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

const CatalogToursBase: FC = () => {
	const { t } = useTranslation("tours_catalog_page");
	const { t: tCols } = useTranslation(["tours_catalog_page", "options"]);

	const methods = useForm<ICatalogTourFilters>({
		defaultValues: DEFAULT_FILTERS
	});

	const { watch, setValue } = methods;
	const filters = watch();

	const debouncedSource = useMemo(() => filters.filters, [filters.filters]);

	const debouncedFilters = useDebounce(debouncedSource, 500);

	const {
		data: toursData,
		isLoading,
		isFetching,
		isError
	} = useGetCatalogToursQuery({
		...filters,
		filters: debouncedFilters
	});

	useEffect(() => {
		if (isError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isError, t]);
	const tours = useMemo(() => toursData?.data ?? [], [toursData]);
	const totalCount = toursData?.total ?? 0;

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

	const handleReset = useCallback(() => {
		methods.reset(DEFAULT_FILTERS);
	}, [methods]);

	const columns = useMemo(() => CATALOG_COLUMNS(tCols), [tCols]);

	const paginationObj = useMemo(
		() => ({
			pageIndex: filters.page - 1,
			pageSize: filters.limit
		}),
		[filters.page, filters.limit]
	);

	const topChildrenJsx = useMemo(
		() => (
			<p className="text-xl font-semibold">
				{t("header.found", { count: totalCount })}
			</p>
		),
		[t, totalCount]
	);

	const similarParams = useMemo(
		() => ({
			...filters,
			filters: {
				...debouncedFilters,
				duration: []
			}
		}),
		[filters, debouncedFilters]
	);

	return (
		<section className="grid gap-12">
			<SearchToursBar />
			<div className="grid grid-cols-[400px_1fr] gap-6">
				<aside className="flex flex-col gap-4">
					<Card>
						<CardHeader className="flex items-center justify-between ">
							<CardTitle className="text-xl font-semibold">
								{t("filters.title")}
							</CardTitle>
							<Button
								size="sm"
								onClick={handleReset}
								className="h-auto p-0 text-destructive bg-transparent hover:bg-transparent"
							>
								{t("filters.buttons.reset")}
							</Button>
						</CardHeader>
						<CardContent>
							<CatalogToursFilter form={methods} />
						</CardContent>
					</Card>
				</aside>
				<div className="flex flex-col gap-25">
					<SmartTable
						columns={columns}
						data={tours}
						recordCount={totalCount}
						isLoading={isLoading || isFetching}
						loadingMode="skeleton"
						pagination={paginationObj}
						topChildren={topChildrenJsx}
						onPaginationChange={handlePaginationChange}
						useViewMode={true}
						defaultViewMode="cards"
						card={CatalogTourCard}
						cardSkeleton={CatalogTourCardSkeleton}
						CardsClassName="lg:grid-cols-3"
						showTopFilters={true}
						search={filters.search}
						onSearchChange={handleSearchChange}
						showVisibilityFilter={false}
						showStatusFilter={false}
					/>
					<CatalogToursSimilar params={similarParams} />
				</div>
			</div>
		</section>
	);
};

export const CatalogTours = withErrorBoundary(CatalogToursBase);
