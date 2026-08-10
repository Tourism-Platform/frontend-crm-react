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
import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	PreviewerSimple,
	Skeleton
} from "@/shared/ui";
import { formatMoney } from "@/shared/utils";

import { TOUR_CATEGORY_LABELS } from "../../tour";
import { CATALOG_TOUR_TYPE_LABELS } from "../config";
import type { ICatalogTourCard } from "../types";

const VISIBLE_CATEGORIES = 2;

type TCatalogTourCardProps = {
	data: ICatalogTourCard;
};

type TMetaItem = {
	key: string;
	icon: ReactNode;
	label: string;
};

export const CatalogTourCard: FC<TCatalogTourCardProps> = ({ data: tour }) => {
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const { t } = useTranslation(["tours_catalog_page", "options"]);

	const visibleCategories = tour.categories.slice(0, VISIBLE_CATEGORIES);
	const hiddenCategoriesCount = Math.max(
		tour.categories.length - VISIBLE_CATEGORIES,
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
		<Link
			to={buildRoute(ENUM_PATH.TOURS.CATALOG.PREVIEW_TOUR, {
				tourId: tour.id
			})}
			className="block h-full min-w-0"
		>
			<Card className="relative h-full min-w-0 gap-0 overflow-hidden pt-0 pb-4 transition-shadow hover:shadow-md">
				<div className="relative h-48 w-full shrink-0 overflow-hidden bg-muted">
					{!isImageLoaded && (
						<div className="absolute inset-0 z-0 flex items-center justify-center">
							<Skeleton className="absolute inset-0 size-full" />
							<Image className="size-10 animate-pulse text-muted-foreground/20" />
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
					<div className="absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-black/55 to-transparent" />
					<div className="absolute left-3 top-3 z-10">
						<Badge className="border-0 bg-background/95 text-foreground shadow-sm backdrop-blur-sm">
							{t(CATALOG_TOUR_TYPE_LABELS[tour.type], {
								ns: "options"
							})}
						</Badge>
					</div>
					{!!tour.languages.length && (
						<div className="absolute bottom-3 left-3 z-10 flex flex-wrap gap-1">
							{tour.languages.map((lang) => (
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
						{tour.title}
					</CardTitle>

					{!!tour.route.length && (
						<div className="flex min-w-0 items-start gap-1.5 text-xs text-muted-foreground">
							<MapPinIcon className="mt-0.5 size-3.5 shrink-0" />
							<span className="line-clamp-2">
								{tour.route.join(" → ")}
							</span>
						</div>
					)}

					{!!tour.categories.length && (
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

					{!!tour.description && (
						<PreviewerSimple
							text={tour.description}
							lines={2}
							className="text-sm text-muted-foreground"
						/>
					)}
				</CardHeader>

				<CardContent className="mt-auto grid gap-3">
					<div className="grid grid-cols-2 gap-2">
						{metaItems.map((item) => (
							<div
								key={item.key}
								className="flex min-w-0 items-center gap-1.5 rounded-md bg-accent px-2.5 py-2 text-xs text-muted-foreground"
							>
								{item.icon}
								<span className="truncate">{item.label}</span>
							</div>
						))}
					</div>

					<div className="flex min-w-0 items-baseline justify-end gap-2 border-t pt-3">
						<span className="truncate text-right text-base font-semibold text-primary">
							{t("card.price.from", { price: priceLabel })}
						</span>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};
