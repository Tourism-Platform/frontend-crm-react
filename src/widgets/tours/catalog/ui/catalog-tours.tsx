import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { INTERSECTION_ELEMENTS } from "@/shared/config";
import { cn } from "@/shared/lib";
import { GLASS_SURFACE, SelectPicker, withErrorBoundary } from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	CATALOG_SORT_LABELS,
	CatalogTourCard,
	CatalogTourCardHorizontal,
	CatalogTourCardHorizontalSkeleton,
	CatalogTourCardSkeleton
} from "@/entities/tour";

import { SearchToursBar } from "@/features/tours";

import { CATALOG_COLUMNS, CATALOG_SORT_ICONS } from "../model";
import { useCatalogTours } from "../model/hooks/use-catalog-tours";

import { CatalogToursFilter } from "./catalog-tours-filter";
import { CatalogToursFiltersSheet } from "./catalog-tours-filters-sheet";
import { CatalogToursPagination } from "./catalog-tours-pagination";
import { CatalogToursSidebar } from "./catalog-tours-sidebar";
import { CatalogToursSimilar } from "./catalog-tours-similar";

const CatalogToursBase: FC = () => {
	const { t } = useTranslation(["tours_catalog_page", "options"]);
	const {
		methods,
		locationForm,
		applyLocationBarSubmit,
		search,
		page,
		sort,
		tours,
		totalCount,
		totalPages,
		isLoading,
		handleSearchChange,
		searchResetKey,
		handleReset,
		handleSortChange,
		handlePrevPage,
		handleNextPage,
		similarParams
	} = useCatalogTours();

	const sortOptions = useValueToTranslateLabel(CATALOG_SORT_LABELS);
	const columns = useMemo(() => CATALOG_COLUMNS(t), [t]);
	const filters = <CatalogToursFilter form={methods} onReset={handleReset} />;

	return (
		<section className="flex gap-5 flex-col">
			<SearchToursBar
				form={locationForm}
				onSubmit={applyLocationBarSubmit}
			/>
			<div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(280px,400px)_minmax(0,1fr)]">
				<CatalogToursSidebar>{filters}</CatalogToursSidebar>
				<div className="flex min-w-0 flex-col gap-12">
					<div className="flex flex-col gap-4">
						<p className="text-xl font-semibold">
							{t("header.found", { count: totalCount })}
						</p>
						{/* Выдача: поиск, сортировка, фильтры и вид — в тулбаре SmartTable; страницы — своя пагинация ниже, по 12 */}
						<SmartTable
							TableClassName={cn(GLASS_SURFACE, "rounded-xl")}
							columns={columns}
							data={tours}
							recordCount={totalCount}
							isLoading={isLoading}
							loadingMode="skeleton"
							defaultPageSize={
								INTERSECTION_ELEMENTS.CATALOG_TOURS
							}
							showPagination={false}
							useViewMode
							defaultViewMode="cards"
							card={CatalogTourCard}
							cardSkeleton={CatalogTourCardSkeleton}
							CardsClassName="gap-4 lg:grid-cols-2 xl:grid-cols-3"
							listCard={CatalogTourCardHorizontal}
							listCardSkeleton={CatalogTourCardHorizontalSkeleton}
							showStatusFilter={false}
							search={search}
							onSearchChange={handleSearchChange}
							searchResetKey={searchResetKey}
							topChildren={
								<SelectPicker
									className="w-full bg-card sm:w-72"
									options={sortOptions}
									optionIcons={CATALOG_SORT_ICONS}
									value={sort}
									onChange={handleSortChange}
									placeholder={t("sort.placeholder")}
								/>
							}
							actions={
								<CatalogToursFiltersSheet>
									{filters}
								</CatalogToursFiltersSheet>
							}
						/>
						<CatalogToursPagination
							page={page}
							totalPages={totalPages}
							totalCount={totalCount}
							isBusy={isLoading}
							onPrev={handlePrevPage}
							onNext={handleNextPage}
						/>
					</div>
					<CatalogToursSimilar params={similarParams} />
				</div>
			</div>
		</section>
	);
};

export const CatalogTours = withErrorBoundary(CatalogToursBase);
