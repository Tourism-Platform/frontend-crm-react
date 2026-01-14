import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useEffect } from "react";
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
	SmartTable
} from "@/shared/ui";

import {
	CatalogTourCard,
	CatalogTourCardSkeleton,
	ENUM_CATALOG_TOUR_STATUS,
	type ICatalogTourFilters,
	useGetCatalogToursQuery
} from "@/entities/tour";

import { SearchTours } from "@/features/tours";

import { CATALOG_COLUMNS } from "../model";

import { CatalogToursFilter } from "./catalog-tours-filter";

const DEFAULT_FILTERS: ICatalogTourFilters = {
	search: "",
	status: [ENUM_CATALOG_TOUR_STATUS.ALL],
	page: 1,
	limit: 10,
	filters: {
		region: [],
		duration: [],
		language: [],
		category: [],
		price: {
			from: 0,
			to: 3000
		}
	}
};

export const CatalogToursWidget: FC = () => {
	const { t } = useTranslation("tours_catalog_page");

	const methods = useForm<ICatalogTourFilters>({
		defaultValues: DEFAULT_FILTERS
	});

	const { watch, setValue } = methods;
	const filters = watch();
	const debouncedFilters = useDebounce(filters, 500);

	const {
		data: toursData,
		isLoading,
		isFetching,
		isError
	} = useGetCatalogToursQuery(debouncedFilters);

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

	const handleReset = () => {
		methods.reset(DEFAULT_FILTERS);
	};

	return (
		<section className="grid gap-12">
			<SearchTours />
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
				<div className="flex flex-col gap-4">
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
				</div>
			</div>
		</section>
	);
};
