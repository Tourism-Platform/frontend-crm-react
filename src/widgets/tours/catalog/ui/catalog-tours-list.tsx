import type { FC } from "react";

import { EmptyState } from "@/shared/ui/custom/smart-table";

import {
	CatalogTourCard,
	CatalogTourCardHorizontal,
	CatalogTourCardHorizontalSkeleton,
	CatalogTourCardSkeleton,
	type ICatalogTourCard
} from "@/entities/tour";

import type { TCatalogViewMode } from "../model/config/catalog-tours.config";

type TCatalogToursListProps = {
	viewMode: TCatalogViewMode;
	tours: ICatalogTourCard[];
	limit: number;
	isLoading: boolean;
};

export const CatalogToursList: FC<TCatalogToursListProps> = ({
	viewMode,
	tours,
	limit,
	isLoading
}) => {
	if (isLoading) {
		return viewMode === "grid" ? (
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
				{Array.from({ length: limit }).map((_, index) => (
					<CatalogTourCardSkeleton key={`skeleton-${index}`} />
				))}
			</div>
		) : (
			<div className="flex flex-col gap-3">
				{Array.from({ length: limit }).map((_, index) => (
					<CatalogTourCardHorizontalSkeleton
						key={`skeleton-${index}`}
					/>
				))}
			</div>
		);
	}

	if (tours.length === 0) {
		return <EmptyState />;
	}

	if (viewMode === "grid") {
		return (
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
				{tours.map((tour) => (
					<CatalogTourCard key={tour.id} data={tour} />
				))}
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{tours.map((tour) => (
				<CatalogTourCardHorizontal key={tour.id} data={tour} />
			))}
		</div>
	);
};
