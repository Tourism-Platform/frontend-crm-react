import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { SerchFavoriteIcon } from "@/shared/assets";
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from "@/shared/ui";

import {
	CatalogTourCard,
	CatalogTourCardSkeleton,
	type ICatalogTourFilters,
	useGetCatalogToursQuery
} from "@/entities/tour";

interface ICatalogToursSimilarProps {
	params: ICatalogTourFilters;
}

export const CatalogToursSimilar: FC<ICatalogToursSimilarProps> = ({
	params
}) => {
	const { t } = useTranslation("tours_catalog_page");

	const {
		data: toursData,
		isLoading,
		isFetching
	} = useGetCatalogToursQuery(params);

	const tours = toursData?.data ?? [];

	return (
		<div className="grid gap-10 ">
			<Alert variant="warning" appearance="light" className="px-9 py-6">
				<AlertIcon>
					<SerchFavoriteIcon />
				</AlertIcon>
				<AlertContent className="flex gap-2">
					<AlertTitle className="mb-0">{t("alert.title")}</AlertTitle>
					<AlertDescription>
						{t("alert.description")}
					</AlertDescription>
				</AlertContent>
			</Alert>

			<div className="w-[calc(96rem-400px-24px)]">
				<Carousel>
					<CarouselContent className="pb-2">
						{isLoading || isFetching
							? Array.from({ length: 3 }).map((_, index) => (
									<CarouselItem
										key={`skeleton-${index}`}
										className="basis-1/3 pl-5"
									>
										<CatalogTourCardSkeleton />
									</CarouselItem>
								))
							: tours.map((tour, index) => (
									<CarouselItem
										key={index}
										className="basis-1/3 pl-5"
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
