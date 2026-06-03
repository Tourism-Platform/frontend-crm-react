import { Clock4 } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { Card, CardContent, PreviewerSimple, Separator } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import type { ICatalogTourCard } from "../types";

interface ICatalogTourCardProps {
	data: ICatalogTourCard;
}

export const CatalogTourCard: FC<ICatalogTourCardProps> = ({ data: tour }) => {
	const { t } = useTranslation("tours_catalog_page");
	return (
		<Link
			to={buildRoute(ENUM_PATH.TOURS.CATALOG.PREVIEW_TOUR, {
				tourId: tour.id
			})}
		>
			<Card className="pt-0 overflow-hidden h-full">
				<div className="relative h-48 w-full shrink-0">
					<img
						src={
							tour.imageUrl ||
							"https://via.placeholder.com/400x200"
						}
						alt={tour.title}
						className="h-full w-full object-cover"
					/>
				</div>
				<CardContent className="grid gap-5 grid-rows-[min-content_min-content_1fr_min-content] h-full">
					<h3 className="text-lg font-semibold line-clamp-1">
						{tour.title}
					</h3>
					<Separator />
					<PreviewerSimple
						text={tour.description}
						lines={3}
						className="text-sm"
					/>
					<div className="flex items-center gap-2 justify-between">
						<div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-muted-foreground">
							<Clock4 className="w-4 h-4" />
							<span className="text-xs">
								{t("card.duration.days", {
									count: tour.duration
								})}
							</span>
						</div>
						<span className="text-primary whitespace-nowrap text-lg">
							{t("card.price.from", {
								price: formatToDollars(tour.priceFrom)
							})}
						</span>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};
