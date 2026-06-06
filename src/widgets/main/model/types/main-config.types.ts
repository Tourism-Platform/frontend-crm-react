import { type LucideIcon } from "lucide-react";

import type {
	TAgencyFeatureId,
	TOperatorFeatureId,
	TSupplierFeatureId
} from "./main-i18n.types";

export interface IMainIconItem {
	name: string;
	icon: LucideIcon;
}

export interface IOperatorFeatureItem {
	id: TOperatorFeatureId;
	icon: LucideIcon;
	isSoon?: boolean;
}

export interface IAgencyFeatureItem {
	id: TAgencyFeatureId;
	icon: LucideIcon;
	isSoon?: boolean;
}

export interface ISupplierFeatureItem {
	id: TSupplierFeatureId;
	icon: LucideIcon;
	isSoon?: boolean;
}

export interface IMainHeroTourItem {
	name: string;
	icon: LucideIcon;
	iconClass: string;
}

export interface IMainHeroFloatItem {
	name: string;
	delay: number;
	duration: number;
	floatOffset: number;
}

export interface IMainHeroChartBarItem {
	name: string;
	height: number;
}

export interface IMainHeroCatalogItem {
	name: string;
	image: string;
}

export interface IMainAgencyTourItem {
	name: string;
	image: string;
}

export interface IMainNetworkBeamItem {
	name: string;
	curvature: number;
	endYOffset: number;
}
