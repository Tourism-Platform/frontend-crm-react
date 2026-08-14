import type { FC } from "react";

import { withErrorBoundary } from "@/shared/ui";

import { SearchToursBar } from "@/features/tours";

import { useCatalogTours } from "../model/hooks/use-catalog-tours";

import { CatalogToursList } from "./catalog-tours-list";
import { CatalogToursPagination } from "./catalog-tours-pagination";
import { CatalogToursSidebar } from "./catalog-tours-sidebar";
import { CatalogToursSimilar } from "./catalog-tours-similar";
import { CatalogToursToolbar } from "./catalog-tours-toolbar";

const CatalogToursBase: FC = () => {
	const {
		methods,
		locationForm,
		applyLocationBarSubmit,
		page,
		limit,
		tours,
		totalCount,
		totalPages,
		isLoading,
		viewMode,
		setViewMode,
		localSearch,
		setLocalSearch,
		searchInputRef,
		handleReset,
		handlePrevPage,
		handleNextPage,
		similarParams
	} = useCatalogTours();

	return (
		<section className="grid gap-12">
			<SearchToursBar
				form={locationForm}
				onSubmit={applyLocationBarSubmit}
			/>
			<div className="grid grid-cols-[minmax(280px,400px)_minmax(0,1fr)] gap-6">
				<CatalogToursSidebar form={methods} onReset={handleReset} />
				<div className="flex min-w-0 flex-col gap-12">
					<div className="flex flex-col gap-4">
						<CatalogToursToolbar
							totalCount={totalCount}
							viewMode={viewMode}
							onViewModeChange={setViewMode}
							localSearch={localSearch}
							onLocalSearchChange={setLocalSearch}
							searchInputRef={searchInputRef}
						/>
						<CatalogToursList
							viewMode={viewMode}
							tours={tours}
							limit={limit}
							isLoading={isLoading}
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
