import {
	CalendarMarkIcon,
	HealthIcon,
	UsersGroupRoundedIcon
} from "@solar-icons/react/outline";
import { Image, Layers } from "lucide-react";
import { type FC, type ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { MapPinIcon, tourPlaceholder } from "@/shared/assets";
import { ENUM_PATH, buildRoute } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Badge, Card, PreviewerSimple, Skeleton } from "@/shared/ui";
import { formatMoney } from "@/shared/utils";

import { TOUR_CATEGORY_LABELS } from "../../tour";
import { CATALOG_TOUR_TYPE_LABELS } from "../config";
import type { ICatalogTourCard } from "../types";

const VISIBLE_CATEGORIES = 2;
const VISIBLE_LANGUAGES = 5;

type TCatalogTourCardHorizontalProps = {
	data: ICatalogTourCard;
	className?: string;
};

type TMetaItem = {
	key: string;
	icon: ReactNode;
	label: string;
};

export const CatalogTourCardHorizontal: FC<TCatalogTourCardHorizontalProps> = ({
	data: tour,
	className
}) => {
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const { t } = useTranslation(["tours_catalog_page", "options"]);

	const tourHref = buildRoute(ENUM_PATH.TOURS.CATALOG.PREVIEW_TOUR, {
		tourId: tour.id
	});

	const visibleCategories = tour.categories.slice(0, VISIBLE_CATEGORIES);
	const hiddenCategoriesCount = Math.max(
		tour.categories.length - VISIBLE_CATEGORIES,
		0
	);

	const visibleLanguages = tour.languages.slice(0, VISIBLE_LANGUAGES);
	const hiddenLanguagesCount = Math.max(
		tour.languages.length - VISIBLE_LANGUAGES,
		0
	);

	const groupLabel = t("card.group", {
		min: tour.groupSizeMin ?? 0,
		max: tour.groupSizeMax ?? 0
	});

	const ageLabel = t("card.age", {
		from: tour.ageFrom ?? 0,
		to: tour.ageTo ?? 0
	});

	const metaItems: TMetaItem[] = [
		{
			key: "duration",
			icon: <CalendarMarkIcon className="size-3.5 shrink-0" />,
			label: t("card.duration", {
				days: tour.days ?? 0,
				nights: tour.nights ?? 0,
				daysUnit: t("tour.duration.days", { ns: "options" }),
				nightsUnit: t("tour.duration.nights", { ns: "options" })
			})
		},
		{
			key: "group",
			icon: <UsersGroupRoundedIcon className="size-3.5 shrink-0" />,
			label: groupLabel
		},
		{
			key: "age",
			icon: <HealthIcon className="size-3.5 shrink-0" />,
			label: ageLabel
		},
		{
			key: "options",
			icon: <Layers className="size-3.5 shrink-0" />,
			label: t("card.options", { count: tour.optionCount ?? 0 })
		}
	];

	const priceLabel = formatMoney(tour.priceFrom, {
		currency: tour.currency
	});

	return (
		<Link to={tourHref} className={cn("block min-w-0", className)}>
			<Card className="relative flex min-w-0 flex-row items-stretch gap-0 overflow-hidden py-0 transition-shadow hover:shadow-md">
				<div className="relative min-h-40 w-1/2 shrink-0 self-stretch overflow-hidden bg-muted md:w-1/3">
					{!isImageLoaded && (
						<div className="absolute inset-0 z-0 flex items-center justify-center">
							<Skeleton className="absolute inset-0 size-full" />
							<Image className="size-8 animate-pulse text-muted-foreground/20" />
						</div>
					)}
					<img
						src={tour.imageUrl || tourPlaceholder}
						alt={tour.title}
						onError={(e) => {
							e.currentTarget.src = tourPlaceholder;
						}}
						onLoad={() => setIsImageLoaded(true)}
						className={cn(
							"absolute inset-0 size-full object-cover transition-opacity duration-500",
							isImageLoaded ? "opacity-100" : "opacity-0"
						)}
					/>
					<div className="absolute inset-x-0 bottom-0 z-10 h-14 bg-gradient-to-t from-black/55 to-transparent" />
					<div className="absolute left-2 top-2 z-10">
						<Badge className="border-0 bg-background/95 text-xs text-foreground shadow-sm backdrop-blur-sm">
							{t(CATALOG_TOUR_TYPE_LABELS[tour.type], {
								ns: "options"
							})}
						</Badge>
					</div>
					{!!tour.languages.length && (
						<div className="absolute bottom-2 left-2 z-10 flex flex-wrap gap-1">
							{visibleLanguages.map((lang) => (
								<Badge
									key={lang}
									variant="secondary"
									className="bg-background/95 text-xs text-foreground shadow-sm backdrop-blur-sm"
								>
									{lang}
								</Badge>
							))}
							{hiddenLanguagesCount > 0 && (
								<Badge
									variant="secondary"
									className="bg-background/95 text-xs text-foreground shadow-sm backdrop-blur-sm"
								>
									+{hiddenLanguagesCount}
								</Badge>
							)}
						</div>
					)}
				</div>

				<div className="flex min-w-0 flex-1 flex-col gap-2 px-3 py-3 sm:gap-2.5 sm:px-4 sm:py-4">
					<div className="flex min-w-0 flex-col gap-1.5">
						<span className="line-clamp-2 text-sm font-semibold leading-snug sm:text-base">
							{tour.title}
						</span>
						{!!tour.route.length && (
							<div className="flex min-w-0 items-center gap-1 text-[11px] text-muted-foreground sm:text-xs">
								<MapPinIcon className="size-3 shrink-0" />
								<span className="truncate">
									{tour.route.join(" → ")}
								</span>
							</div>
						)}
						{!!tour.categories.length && (
							<div className="flex flex-wrap gap-1">
								{visibleCategories.map((category) => (
									<Badge
										key={category}
										variant="outline"
										className="text-[10px] sm:text-xs"
									>
										{t(TOUR_CATEGORY_LABELS[category], {
											ns: "options"
										})}
									</Badge>
								))}
								{hiddenCategoriesCount > 0 && (
									<Badge
										variant="outline"
										className="text-[10px] sm:text-xs"
									>
										+{hiddenCategoriesCount}
									</Badge>
								)}
							</div>
						)}
						{!!tour.description && (
							<PreviewerSimple
								text={tour.description}
								lines={2}
								className="text-[11px] text-muted-foreground sm:text-xs"
							/>
						)}
					</div>

					<div className="grid grid-cols-2 gap-1.5 sm:gap-2">
						{metaItems.map((item) => (
							<div
								key={item.key}
								className="flex min-w-0 items-center gap-1 rounded-md bg-accent px-2 py-1.5 text-[11px] text-muted-foreground sm:text-xs"
							>
								{item.icon}
								<span className="truncate">{item.label}</span>
							</div>
						))}
					</div>

					<div className="mt-auto border-t pt-2.5">
						<span className="text-sm font-semibold text-primary sm:text-base">
							{t("card.price.from", { price: priceLabel })}
						</span>
					</div>
				</div>
			</Card>
		</Link>
	);
};
