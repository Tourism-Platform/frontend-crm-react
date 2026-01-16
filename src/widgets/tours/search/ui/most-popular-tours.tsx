import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from "@/shared/ui";

import {
	CatalogTourCard,
	CatalogTourCardSkeleton,
	useGetPopularToursQuery
} from "@/entities/tour";

export const MostPopularTours: FC = () => {
	const { t } = useTranslation("tours_catalog_page");

	const {
		data: toursData,
		isLoading,
		isFetching,
		isError
	} = useGetPopularToursQuery();

	const tours = toursData?.data ?? [];
	const isDataLoading = isLoading || isFetching;

	useEffect(() => {
		if (isError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isError, t]);

	return (
		<div className="grid gap-7">
			<h2 className="text-2xl font-semibold">
				{t("popular_tours.title")}
			</h2>
			<div>
				<Carousel
					opts={{
						align: "start"
					}}
					className="w-full container"
				>
					<CarouselContent className="-ml-4 pb-2">
						{isDataLoading
							? Array.from({ length: 4 }).map((_, index) => (
									<CarouselItem
										key={`skeleton-${index}`}
										className="basis-1/4"
									>
										<CatalogTourCardSkeleton />
									</CarouselItem>
								))
							: tours.map((tour, index) => (
									<CarouselItem
										key={tour.id || index}
										className="basis-1/4"
									>
										<CatalogTourCard data={tour} />
									</CarouselItem>
								))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</div>
	);
};
