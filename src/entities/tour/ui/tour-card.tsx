import { Image, MoreHorizontal } from "lucide-react";
import { type FC, useState } from "react";
import { Link } from "react-router-dom";

import { FlagIcon, MoneysIcon, UsersOutlineIcon } from "@/shared/assets";
import { ENUM_PATH, buildRoute } from "@/shared/config";
import { cn } from "@/shared/lib";
import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Separator,
	Skeleton
} from "@/shared/ui";

import { useTranslation } from "react-i18next";
import { TOUR_STATUS_LABELS, TOUR_STATUS_VARIANTS } from "../constants";
import type { ITourCard } from "../types";

interface ITourCardProps {
	data: ITourCard;
}

export const TourCard: FC<ITourCardProps> = ({ data: card }) => {
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const { t } = useTranslation("options");

	return (
		<Card className="relative pt-10 overflow-hidden">
			<MoreHorizontal className="absolute top-2 right-4 text-muted-foreground/50 z-10" />

			<div className="relative max-h-35 ratio-16/9 w-full bg-muted flex items-center justify-center overflow-hidden">
				{!isImageLoaded && (
					<div className="absolute inset-0 flex items-center justify-center z-0">
						<Skeleton className="size-full absolute inset-0" />
						<Image className="size-10 text-muted-foreground/20 animate-pulse" />
					</div>
				)}
				<img
					src={card.image_url}
					alt={card.title}
					onLoad={() => setIsImageLoaded(true)}
					className={cn(
						"max-h-35 object-cover w-full transition-opacity duration-500",
						isImageLoaded ? "opacity-100" : "opacity-0"
					)}
				/>
			</div>

			<CardHeader className="grid gap-2">
				<Badge variant={TOUR_STATUS_VARIANTS[card.status]}>
					{t(TOUR_STATUS_LABELS[card.status], { ns: "options" })}
				</Badge>
				<CardTitle className="truncate">
					<Link
						className="hover:underline hover:text-primary transition-colors"
						to={buildRoute(ENUM_PATH.TOURS.OVERVIEW, {
							tourId: card.id
						})}
					>
						{card.title}
					</Link>
				</CardTitle>
			</CardHeader>
			<div className="px-6">
				<Separator />
			</div>
			<CardContent className="grid gap-3 mt-1">
				<div className="bg-accent px-3 py-2 rounded-md text-muted-foreground text-xs flex gap-2 items-center">
					<FlagIcon className="h-4" />
					<p>{card?.route?.join(" - ")}</p>
				</div>
				<div className="bg-accent px-3 py-2 rounded-md text-muted-foreground text-xs flex gap-2 items-center">
					<UsersOutlineIcon className="h-4" />
					<p>{card.type}</p>
				</div>
				<div className="bg-accent px-3 py-2 rounded-md text-muted-foreground text-xs flex gap-2 items-center">
					<MoneysIcon className="h-4" />
					<p>
						{card.price_from} - {card.price_to}
					</p>
				</div>
			</CardContent>
		</Card>
	);
};

export const TourCardSkeleton: FC = () => {
	return (
		<Card className="relative pt-10">
			<Skeleton className="h-35 ratio-16/9" />
			<CardHeader className="grid gap-2">
				<Skeleton className="h-5 w-20 rounded-full" />
				<Skeleton className="h-6 w-full" />
			</CardHeader>
			<div className="px-6">
				<Separator />
			</div>
			<CardContent className="grid gap-3">
				{[1, 2, 3].map((i) => (
					<Skeleton key={i} className="h-8 w-full rounded-md" />
				))}
			</CardContent>
		</Card>
	);
};
