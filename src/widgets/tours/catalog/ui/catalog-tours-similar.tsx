import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { SerchFavoriteIcon } from "@/shared/assets";
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	DataState,
	withErrorBoundary
} from "@/shared/ui";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from "@/shared/ui/shadcn-ui/carousel";

import {
	CatalogTourCard,
	type ICatalogTourFilters,
	useGetCatalogToursQuery
} from "@/entities/tour";

interface ICatalogToursSimilarProps {
	params: ICatalogTourFilters;
}

const CatalogToursSimilarBase: FC<ICatalogToursSimilarProps> = ({ params }) => {
	const { t } = useTranslation("tours_catalog_page");

	const {
		data: toursData,
		isLoading,
		isFetching
	} = useGetCatalogToursQuery(params);

	const tours = useMemo(() => toursData?.data ?? [], [toursData]);

	return (
		<div className="grid gap-10 ">
			<Alert variant="primary" appearance="light" role="status">
				<AlertIcon>
					<SerchFavoriteIcon />
				</AlertIcon>
				<AlertContent className="space-y-1">
					<AlertTitle>{t("alert.title")}</AlertTitle>
					<AlertDescription className="text-muted-foreground">
						{t("alert.description")}
					</AlertDescription>
				</AlertContent>
			</Alert>

			<DataState data={tours} isLoading={isLoading || isFetching}>
				{(tours) => (
					<div className="w-[calc(100%-24px)]">
						<Carousel>
							<CarouselContent className="pb-2">
								{tours.map((tour, index) => (
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
				)}
			</DataState>
		</div>
	);
};

export const CatalogToursSimilar = withErrorBoundary(CatalogToursSimilarBase);
