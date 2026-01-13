import type { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { Badge, Card, CardContent } from "@/shared/ui";

import {
	CATALOG_TOUR_STATUS_LABELS,
	CATALOG_TOUR_STATUS_VARIANTS
} from "../constants";
import type { ICatalogTourCard } from "../types";

interface ICatalogTourCardProps {
	data: ICatalogTourCard;
	actions?: ReactNode;
}

export const CatalogTourCard: FC<ICatalogTourCardProps> = ({
	data: tour,
	actions
}) => {
	const { t } = useTranslation(["options", "common"]);

	return (
		<Card className="overflow-hidden">
			<div className="relative h-48 w-full">
				<img
					src={tour.imageUrl || "https://via.placeholder.com/400x200"}
					alt={tour.title}
					className="h-full w-full object-cover"
				/>
				<div className="absolute top-2 right-2">
					<Badge variant={CATALOG_TOUR_STATUS_VARIANTS[tour.status]}>
						{t(CATALOG_TOUR_STATUS_LABELS[tour.status], {
							ns: "options"
						})}
					</Badge>
				</div>
			</div>
			<CardContent className="p-4">
				<h3 className="text-lg font-semibold mb-2 line-clamp-1">
					{tour.title}
				</h3>
				<p className="text-sm text-muted-foreground mb-4 line-clamp-2">
					{tour.route.join(" → ")}
				</p>
				<div className="flex justify-between items-center mt-auto">
					<div className="flex flex-col">
						<span className="text-xs text-muted-foreground">
							{/* {t("price.from", { ns: "common" })} */}
						</span>
						<span className="font-bold text-primary">
							${tour.priceFrom} - ${tour.priceTo}
						</span>
					</div>
					{actions}
				</div>
			</CardContent>
		</Card>
	);
};
