import { Check } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Card, CardContent, FloatingCard, Safari } from "@/shared/ui";

import {
	MAIN_HERO_CATALOG_ITEMS_LIST,
	MAIN_HERO_CHART_BARS_LIST,
	MAIN_HERO_FLOAT_ITEMS_LIST,
	MAIN_HERO_TOUR_ITEMS_LIST
} from "../../model";
import type { THeroTourItem } from "../../model";

const heroCardClass =
	"gap-0 overflow-hidden rounded-2xl border-border/60 py-0 shadow-xl";

export const HeroVisual: FC = () => {
	const { t } = useTranslation("main");
	const builderTitle = t("hero.visual.builder.title");
	const tours = t("hero.visual.builder.tours", {
		returnObjects: true
	}) as THeroTourItem[];
	const catalog = {
		city: t("hero.visual.catalog.city"),
		name: t("hero.visual.catalog.name"),
		meta: t("hero.visual.catalog.meta"),
		price: t("hero.visual.catalog.price"),
		priceSuffix: t("hero.visual.catalog.price_suffix"),
		book: t("hero.visual.catalog.book")
	};

	return (
		<div className="relative mx-auto hidden h-[520px] w-full max-w-[520px] lg:block">
			<FloatingCard
				className="absolute left-0 top-[7.5rem] z-10 w-[300px]"
				{...MAIN_HERO_FLOAT_ITEMS_LIST[0]}
			>
				<Card className={heroCardClass}>
					<div className="relative h-28 overflow-hidden">
						<img
							src={MAIN_HERO_CATALOG_ITEMS_LIST[0].image}
							alt=""
							className="size-full object-cover object-center"
							loading="lazy"
							decoding="async"
							draggable={false}
						/>
						<span className="absolute bottom-2 left-3 text-xs font-semibold text-primary-foreground drop-shadow">
							{catalog.city}
						</span>
					</div>
					<CardContent className="p-4">
						<p className="font-semibold">{catalog.name}</p>
						<p className="text-xs text-muted-foreground">
							{catalog.meta}
						</p>
						<div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
							<p className="text-sm font-bold">
								{catalog.price}{" "}
								<span className="font-normal text-muted-foreground">
									{catalog.priceSuffix}
								</span>
							</p>
							<span className="rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
								{catalog.book}
							</span>
						</div>
					</CardContent>
				</Card>
			</FloatingCard>

			<FloatingCard
				className="absolute bottom-0 right-0 z-10 w-[268px]"
				{...MAIN_HERO_FLOAT_ITEMS_LIST[1]}
			>
				<Card className={heroCardClass}>
					<CardContent className="p-4">
						<p className="text-xs text-muted-foreground">
							{t("hero.visual.stats.label")}
						</p>
						<p className="mt-1 text-2xl font-bold tracking-tight">
							{t("hero.visual.stats.value")}{" "}
							<span className="text-sm font-semibold text-primary">
								{t("hero.visual.stats.trend")}
							</span>
						</p>
						<div className="mt-4 flex h-14 items-end gap-1.5">
							{MAIN_HERO_CHART_BARS_LIST.map((bar) => (
								<div
									key={bar.name}
									className="flex-1 rounded-t-md bg-primary/20"
									style={{ height: `${bar.height}%` }}
								/>
							))}
						</div>
					</CardContent>
				</Card>
			</FloatingCard>

			<FloatingCard
				className="absolute right-0 top-0 z-20 w-[310px]"
				{...MAIN_HERO_FLOAT_ITEMS_LIST[2]}
			>
				<Safari
					url={builderTitle}
					className={cn(heroCardClass, "min-h-0")}
				>
					<div className="space-y-1 p-3">
						{tours.map((tour, index) => {
							const tourItem = MAIN_HERO_TOUR_ITEMS_LIST[index];
							const Icon = tourItem.icon;

							return (
								<div
									key={tour.name}
									className={cn(
										"flex items-center gap-2.5 rounded-lg px-2 py-1.5",
										index === 0 && "bg-accent"
									)}
								>
									<div
										className={cn(
											"flex size-8 shrink-0 items-center justify-center rounded-lg",
											tourItem.iconClass
										)}
									>
										<Icon
											className="size-4"
											strokeWidth={2}
										/>
									</div>
									<div className="min-w-0">
										<p className="truncate text-sm font-semibold">
											{tour.name}
										</p>
										<p className="text-xs text-muted-foreground">
											{tour.meta}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</Safari>
			</FloatingCard>

			<FloatingCard
				className="absolute right-10 top-14 z-30"
				{...MAIN_HERO_FLOAT_ITEMS_LIST[3]}
			>
				<div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card px-3 py-2.5 shadow-xl">
					<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-primary">
						<Check className="size-4" strokeWidth={2.5} />
					</div>
					<div className="min-w-0">
						<p className="text-sm font-semibold leading-tight">
							{t("hero.visual.stats.notification.title")}
						</p>
						<p className="text-xs text-muted-foreground">
							{t("hero.visual.stats.notification.subtitle")}
						</p>
					</div>
				</div>
			</FloatingCard>
		</div>
	);
};
