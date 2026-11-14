import {
	CalendarMarkIcon,
	GalleryIcon,
	HeartPulseIcon,
	TagIcon,
	UsersGroupRoundedIcon
} from "@solar-icons/react/outline";
import { type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { useImageStatus } from "@/shared/hooks";
import { cn } from "@/shared/lib";
import { Badge, Card, Skeleton } from "@/shared/ui";

import { TOUR_CATEGORY_LABELS, TOUR_TYPE_LABELS } from "../config";
import { TOUR_STATUS_LABELS, TOUR_STATUS_VARIANTS } from "../constants";
import type { ITourCard } from "../types";
import { formatTourAge, formatTourGroup } from "../utils";

import { TourCardChips } from "./tour-card-chips";

const VISIBLE_CATEGORIES = 2;
const VISIBLE_LANGUAGES = 3;

interface ITourCardProps {
	data: ITourCard;
}

type TMetaItem = {
	key: string;
	icon: ReactNode;
	label: string;
};

/**
 * Карточка сетки как витрина Blogix (D10): обложка со статусом, языками и категориями
 * по углам, ниже — название и метрики сеткой 2 × 2. Без кнопок: переход на обзор
 * тура — по названию
 */
export const TourCard: FC<ITourCardProps> = ({ data: card }) => {
	const { isLoaded, isLoading, isError, onLoad, onError } = useImageStatus(
		card.imageUrl
	);
	const { t } = useTranslation(["options", "tours_page"]);

	const categoryLabels = card.categories.map((category) =>
		t(TOUR_CATEGORY_LABELS[category], { ns: "options" })
	);

	const metaItems: TMetaItem[] = [
		{
			key: "duration",
			icon: <CalendarMarkIcon className="size-3.5 shrink-0" />,
			label: t("card.duration", {
				ns: "tours_page",
				days: card.days ?? 0,
				nights: card.nights ?? 0,
				daysUnit: t("tour.duration.days", { ns: "options" }),
				nightsUnit: t("tour.duration.nights", { ns: "options" })
			})
		},
		{
			key: "group",
			icon: <UsersGroupRoundedIcon className="size-3.5 shrink-0" />,
			label: formatTourGroup(
				card.groupSizeMin,
				card.groupSizeMax,
				(min, max) => t("card.group", { ns: "tours_page", min, max })
			)
		},
		{
			key: "age",
			icon: <HeartPulseIcon className="size-3.5 shrink-0" />,
			label: formatTourAge(card.ageFrom, card.ageTo, (from, to) =>
				t("card.age", { ns: "tours_page", from, to })
			)
		},
		{
			key: "type",
			icon: <TagIcon className="size-3.5 shrink-0" />,
			label: t(TOUR_TYPE_LABELS[card.type], { ns: "options" })
		}
	];

	return (
		<Card className="group/card h-full gap-0 overflow-hidden p-1.5 transition-shadow hover:shadow-md">
			{/* Витрина: радиус = радиус карточки − отступ p-1.5, углы концентричны */}
			<div className="relative isolate aspect-[4/3] shrink-0 overflow-hidden rounded-md bg-muted">
				{!isLoaded && (
					<div className="absolute inset-0 flex items-center justify-center">
						{isLoading && (
							<Skeleton className="absolute inset-0 size-full rounded-none" />
						)}
						<GalleryIcon
							className={cn(
								"size-16 text-muted-foreground/40",
								isLoading &&
									"animate-pulse text-muted-foreground/20"
							)}
						/>
					</div>
				)}
				{card.imageUrl && !isError && (
					<img
						src={card.imageUrl}
						alt={card.title}
						onLoad={onLoad}
						onError={onError}
						className={cn(
							"absolute inset-0 size-full object-cover transition-[opacity,transform] duration-500 group-hover/card:scale-105 motion-reduce:transition-none",
							isLoaded ? "opacity-100" : "opacity-0"
						)}
					/>
				)}

				{/* Подложка цвета карточки: полупрозрачный бейдж не сливается с картинкой */}
				<div className="absolute top-2 left-2 z-10 flex rounded-sm bg-card">
					<Badge variant={TOUR_STATUS_VARIANTS[card.status]}>
						{t(TOUR_STATUS_LABELS[card.status], { ns: "options" })}
					</Badge>
				</div>
				<div className="absolute top-2 right-2 z-10 flex max-w-[60%] justify-end">
					<TourCardChips
						mode="flags"
						items={card.languages}
						visible={VISIBLE_LANGUAGES}
					/>
				</div>
				<div className="absolute right-2 bottom-2 left-2 z-10 flex">
					<TourCardChips
						mode="chips"
						items={categoryLabels}
						visible={VISIBLE_CATEGORIES}
					/>
				</div>
			</div>

			{/* Текст слева: название, метрики */}
			<div className="flex flex-1 flex-col gap-1 px-1.5 pt-3 pb-1.5">
				<h3 className="line-clamp-2 text-sm leading-snug font-semibold">
					<Link
						className="transition-colors hover:text-primary hover:underline"
						to={buildRoute(ENUM_PATH.TOURS.OVERVIEW, {
							tourId: card.id
						})}
					>
						{card.title}
					</Link>
				</h3>
				<div className="mt-auto grid grid-cols-2 gap-x-3 gap-y-1.5 pt-2.5 text-xs text-muted-foreground tabular-nums">
					{metaItems.map((item) => (
						<span
							key={item.key}
							title={item.label}
							className="flex min-w-0 items-center gap-1.5"
						>
							{item.icon}
							<span className="truncate">{item.label}</span>
						</span>
					))}
				</div>
			</div>
		</Card>
	);
};
