import type { FC } from "react";

import { DataState } from "@/shared/ui";

import {
	CatalogTourCard,
	CatalogTourCardHorizontal,
	type ICatalogTourCard
} from "@/entities/tour";

import type { TCatalogViewMode } from "../model/config/catalog-tours.config";

type TCatalogToursListProps = {
	viewMode: TCatalogViewMode;
	tours: ICatalogTourCard[];
	isLoading: boolean;
};

export const CatalogToursList: FC<TCatalogToursListProps> = ({
	viewMode,
	tours,
	isLoading
}) => {
	return (
		<DataState variant="page" data={tours} isLoading={isLoading}>
			{(tours) =>
				viewMode === "grid" ? (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
						{tours.map((tour) => (
							<CatalogTourCard key={tour.id} data={tour} />
						))}
					</div>
				) : (
					<div className="flex flex-col gap-3">
						{tours.map((tour) => (
							<CatalogTourCardHorizontal
								key={tour.id}
								data={tour}
							/>
						))}
					</div>
				)
			}
		</DataState>
	);
};
