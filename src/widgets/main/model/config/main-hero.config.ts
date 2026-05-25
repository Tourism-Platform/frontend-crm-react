import { Hotel, Plane, TrainFront, Utensils } from "lucide-react";

import type {
	IMainHeroCatalogItem,
	IMainHeroChartBarItem,
	IMainHeroFloatItem,
	IMainHeroTourItem
} from "../types/main-config.types";

export const MAIN_HERO_TOUR_ITEMS_LIST: IMainHeroTourItem[] = [
	{
		name: "flight",
		icon: Plane,
		iconClass: "bg-muted text-foreground"
	},
	{
		name: "hotel",
		icon: Hotel,
		iconClass: "bg-muted text-foreground"
	},
	{
		name: "dining",
		icon: Utensils,
		iconClass: "bg-muted text-foreground"
	},
	{
		name: "train",
		icon: TrainFront,
		iconClass: "bg-muted text-foreground"
	}
];

export const MAIN_HERO_FLOAT_ITEMS_LIST: IMainHeroFloatItem[] = [
	{ name: "catalog", delay: 0.8, duration: 6, floatOffset: 7 },
	{ name: "stats", delay: 1.4, duration: 5.8, floatOffset: 6 },
	{ name: "builder", delay: 0, duration: 5.5, floatOffset: 6 },
	{ name: "notification", delay: 2, duration: 5.2, floatOffset: 5 }
];

export const MAIN_HERO_CATALOG_ITEMS_LIST: IMainHeroCatalogItem[] = [
	{
		name: "catalog",
		image: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=600"
	}
];

export const MAIN_HERO_CHART_BARS_LIST: IMainHeroChartBarItem[] = [
	{ name: "bar-1", height: 40 },
	{ name: "bar-2", height: 55 },
	{ name: "bar-3", height: 35 },
	{ name: "bar-4", height: 70 },
	{ name: "bar-5", height: 60 },
	{ name: "bar-6", height: 85 },
	{ name: "bar-7", height: 95 }
];
