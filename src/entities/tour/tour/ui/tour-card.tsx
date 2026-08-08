import {
	CalendarMarkIcon,
	HealthIcon,
	TagIcon,
	UsersGroupRoundedIcon
} from "@solar-icons/react/outline";
import { Image } from "lucide-react";
import { type FC, type ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { tourPlaceholder } from "@/shared/assets";
import { ENUM_PATH, buildRoute } from "@/shared/config";
import { cn } from "@/shared/lib";
import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Skeleton
} from "@/shared/ui";

import { TOUR_CATEGORY_LABELS, TOUR_TYPE_LABELS } from "../config";
import { TOUR_STATUS_LABELS, TOUR_STATUS_VARIANTS } from "../constants";
import type { ENUM_TOUR_STATUS_TYPE, ITourCard } from "../types";
import { ENUM_TOUR_STATUS } from "../types";

const VISIBLE_CATEGORIES = 2;

const STATUS_OVERLAY_CLASS: Record<ENUM_TOUR_STATUS_TYPE, string> = {
	[ENUM_TOUR_STATUS.PUBLISHED]: "bg-emerald-600 text-white",
	[ENUM_TOUR_STATUS.DRAFT]: "bg-sky-600 text-white",
	[ENUM_TOUR_STATUS.ARCHIVED]: "bg-amber-600 text-white",
	[ENUM_TOUR_STATUS.ALL]: "bg-foreground text-background"
};

interface ITourCardProps {
	data: ITourCard;
}

type TMetaItem = {
	key: string;
	icon: ReactNode;
	label: string;
};

export const TourCard: FC<ITourCardProps> = ({ data: card }) => {
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const { t } = useTranslation(["options", "tours_page"]);

	const visibleCategories = card.categories.slice(0, VISIBLE_CATEGORIES);
	const hiddenCategoriesCount = Math.max(
		card.categories.length - VISIBLE_CATEGORIES,
		0
	);

	const groupLabel =
		card.groupSizeMin != null && card.groupSizeMin > 0
			? t("card.group", {
					ns: "tours_page",
					min: card.groupSizeMin,
					max: card.groupSizeMax
				})
			: String(card.groupSizeMax);

	const ageLabel =
		card.ageFrom != null && card.ageTo != null
			? t("card.age", {
					ns: "tours_page",
					from: card.ageFrom,
					to: card.ageTo
				})
			: null;

	const metaItems: TMetaItem[] = [
		{
			key: "duration",
			icon: <CalendarMarkIcon className="size-3.5 shrink-0" />,
			label: t("card.duration", {
				ns: "tours_page",
				days: card.days,
				nights: card.nights,
				daysUnit: t("tour.duration.days", { ns: "options" }),
				nightsUnit: t("tour.duration.nights", { ns: "options" })
			})
		},
		{
			key: "group",
			icon: <UsersGroupRoundedIcon className="size-3.5 shrink-0" />,
			label: groupLabel
		},
		...(ageLabel
			? [
					{
						key: "age",
						icon: <HealthIcon className="size-3.5 shrink-0" />,
						label: ageLabel
					} satisfies TMetaItem
				]
			: []),
		{
			key: "type",
			icon: <TagIcon className="size-3.5 shrink-0" />,
			label: t(TOUR_TYPE_LABELS[card.type], { ns: "options" })
		}
	];

	return (
		<Card className="relative h-full gap-0 overflow-hidden pt-0 pb-4">
			<div className="relative h-48 w-full shrink-0 overflow-hidden bg-muted">
				{!isImageLoaded && (
					<div className="absolute inset-0 z-0 flex items-center justify-center">
						<Skeleton className="absolute inset-0 size-full" />
						<Image className="size-10 animate-pulse text-muted-foreground/20" />
					</div>
				)}
				<img
					src={card.imageUrl || tourPlaceholder}
					alt={card.title}
					onError={(e) => {
						e.currentTarget.src = tourPlaceholder;
					}}
					onLoad={() => setIsImageLoaded(true)}
					className={cn(
						"absolute inset-0 size-full object-cover transition-opacity duration-500",
						isImageLoaded ? "opacity-100" : "opacity-0"
					)}
				/>
				<div className="absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-black/55 to-transparent" />
				<div className="absolute left-3 top-3 z-10">
					<Badge
						variant={TOUR_STATUS_VARIANTS[card.status]}
						className={cn(
							"border-0 shadow-sm",
							STATUS_OVERLAY_CLASS[card.status]
						)}
					>
						{t(TOUR_STATUS_LABELS[card.status], { ns: "options" })}
					</Badge>
				</div>
				{!!card.languages.length && (
					<div className="absolute bottom-3 left-3 z-10 flex flex-wrap gap-1">
						{card.languages.map((lang) => (
							<Badge
								key={lang}
								variant="secondary"
								className="bg-background/95 text-foreground shadow-sm backdrop-blur-sm"
							>
								{lang}
							</Badge>
						))}
					</div>
				)}
			</div>

			<CardHeader className="grid gap-2.5 pb-3 pt-4">
				<CardTitle className="line-clamp-2 leading-snug">
					<Link
						className="transition-colors hover:text-primary hover:underline"
						to={buildRoute(ENUM_PATH.TOURS.OVERVIEW, {
							tourId: card.id
						})}
					>
						{card.title}
					</Link>
				</CardTitle>
				{!!card.categories.length && (
					<div className="flex flex-wrap gap-1">
						{visibleCategories.map((category) => (
							<Badge key={category} variant="outline">
								{t(TOUR_CATEGORY_LABELS[category], {
									ns: "options"
								})}
							</Badge>
						))}
						{hiddenCategoriesCount > 0 && (
							<Badge variant="outline">
								+{hiddenCategoriesCount}
							</Badge>
						)}
					</div>
				)}
			</CardHeader>

			<CardContent className="mt-auto grid grid-cols-2 gap-2">
				{metaItems.map((item) => (
					<div
						key={item.key}
						className="flex min-w-0 items-center gap-1.5 rounded-md bg-accent px-2.5 py-2 text-xs text-muted-foreground"
					>
						{item.icon}
						<span className="truncate">{item.label}</span>
					</div>
				))}
			</CardContent>
		</Card>
	);
};
