import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useOptionalResourceQuery } from "@/shared/hooks";
import { DataState, withErrorBoundary } from "@/shared/ui";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from "@/shared/ui/shadcn-ui/carousel";

import { CatalogTourCard, useGetPopularToursQuery } from "@/entities/tour";

const MostPopularToursBase: FC = () => {
	const { t } = useTranslation("tours_catalog_page");

	const {
		data: toursData,
		isLoading,
		isFetching,
		isRealError: isError
	} = useOptionalResourceQuery(useGetPopularToursQuery());

	const tours = toursData?.data ?? [];
	const isDataLoading = isLoading || isFetching;

	useEffect(() => {
		if (isError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isError, t]);

	return (
		<div className="grid gap-7">
			<h2 className="text-xl">{t("popular_tours.title")}</h2>
			<DataState data={tours} isLoading={isDataLoading}>
				{(tours) => (
					<Carousel
						opts={{
							align: "start"
						}}
						className="w-full container"
					>
						<CarouselContent className="-ml-4 pb-2">
							{tours.map((tour, index) => (
								<CarouselItem
									key={tour.id || index}
									className="basis-full sm:basis-1/2 lg:basis-1/4"
								>
									<CatalogTourCard data={tour} />
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				)}
			</DataState>
		</div>
	);
};

export const MostPopularTours = withErrorBoundary(MostPopularToursBase);
