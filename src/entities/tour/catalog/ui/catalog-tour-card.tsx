import {
	CalendarMarkIcon,
	GalleryIcon,
	HeartPulseIcon,
	LayersIcon,
	Routing2Icon,
	UsersGroupRoundedIcon
} from "@solar-icons/react/outline";
import { type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { useImageStatus } from "@/shared/hooks";
import { cn } from "@/shared/lib";
import { Badge, Card, Skeleton } from "@/shared/ui";
import { formatMoney } from "@/shared/utils";

import {
	TOUR_CATEGORY_LABELS,
	TourCardChips,
	formatTourAge,
	formatTourGroup
} from "../../tour";
import {
	CATALOG_TOUR_TYPE_LABELS,
	CATALOG_TOUR_TYPE_VARIANTS
} from "../config";
import type { ICatalogTourCard } from "../types";

const VISIBLE_CATEGORIES = 2;
const VISIBLE_LANGUAGES = 3;

type TCatalogTourCardProps = {
	data: ICatalogTourCard;
};

type TMetaItem = {
	key: string;
	icon: ReactNode;
	label: string;
};

/**
 * Карточка сетки как витрина Blogix (D10): обложка с типом, языками и категориями
 * по углам, ниже — цена, название, маршрут и метрики сеткой 2 × 2. Без кнопок.
 * Ссылка на тур — название, растянутое на всю карточку (`after:inset-0`); обложка
 * лежит выше слоя ссылки, но клики пропускает — кроме чипов языков и категорий
 */
export const CatalogTourCard: FC<TCatalogTourCardProps> = ({ data: tour }) => {
	const { isLoaded, isLoading, isError, onLoad, onError } = useImageStatus(
		tour.imageUrl
	);
	const { t } = useTranslation(["tours_catalog_page", "options"]);

	const categoryLabels = tour.categories.map((category) =>
		t(TOUR_CATEGORY_LABELS[category], { ns: "options" })
	);

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
			label: formatTourGroup(
				tour.groupSizeMin,
				tour.groupSizeMax,
				(min, max) => t("card.group", { min, max })
			)
		},
		{
			key: "age",
			icon: <HeartPulseIcon className="size-3.5 shrink-0" />,
			label: formatTourAge(tour.ageFrom, tour.ageTo, (from, to) =>
				t("card.age", { from, to })
			)
		},
		{
			key: "options",
			icon: <LayersIcon className="size-3.5 shrink-0" />,
			label: t("card.options", { count: tour.optionCount ?? 0 })
		}
	];

	const priceLabel = formatMoney(tour.priceFrom, {
		currency: tour.currency
	});

	return (
		<Card
			variant="glass"
			className="group/card h-full min-w-0 gap-0 overflow-hidden p-1.5 transition-shadow hover:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.9),0_16px_40px_-14px_hsl(211_30%_25%/0.35)] dark:hover:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.08),0_16px_40px_-12px_rgb(0_0_0/0.8)]"
		>
			{/* Витрина: радиус = радиус карточки − отступ p-1.5, углы концентричны */}
			<div className="pointer-events-none relative isolate z-20 aspect-[4/3] shrink-0 overflow-hidden rounded-md bg-muted">
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
				{tour.imageUrl && !isError && (
					<img
						src={tour.imageUrl}
						alt={tour.title}
						onLoad={onLoad}
						onError={onError}
						className={cn(
							"absolute inset-0 size-full object-cover transition-[opacity,transform] duration-500 group-hover/card:scale-105 motion-reduce:transition-none",
							isLoaded ? "opacity-100" : "opacity-0"
						)}
					/>
				)}

				<Badge
					variant={CATALOG_TOUR_TYPE_VARIANTS[tour.type]}
					className="absolute top-2 left-2 z-10"
				>
					{t(CATALOG_TOUR_TYPE_LABELS[tour.type], { ns: "options" })}
				</Badge>
				<div className="absolute top-2 right-2 z-10 flex max-w-[60%] justify-end">
					<TourCardChips
						mode="flags"
						items={tour.languages}
						visible={VISIBLE_LANGUAGES}
						className="pointer-events-auto"
					/>
				</div>
				<div className="absolute right-2 bottom-2 left-2 z-10 flex">
					<TourCardChips
						mode="chips"
						items={categoryLabels}
						visible={VISIBLE_CATEGORIES}
						className="pointer-events-auto"
					/>
				</div>
			</div>

			{/* Текст слева, как у товара: цена, название, маршрут, метрики */}
			<div className="flex flex-1 flex-col gap-1 px-1.5 pt-3 pb-1.5">
				<span className="truncate text-base font-semibold text-primary tabular-nums">
					{t("card.price.from", { price: priceLabel })}
				</span>
				<h3 className="line-clamp-2 text-sm leading-snug font-semibold">
					<Link
						to={buildRoute(ENUM_PATH.TOURS.CATALOG.PREVIEW_TOUR, {
							tourId: tour.id
						})}
						className="transition-colors outline-none after:absolute after:inset-0 after:z-10 group-hover/card:text-primary focus-visible:underline"
					>
						{tour.title}
					</Link>
				</h3>
				{!!tour.route.length && (
					<span className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
						<Routing2Icon className="size-3.5 shrink-0" />
						<span className="truncate">
							{tour.route.join(" → ")}
						</span>
					</span>
				)}
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
