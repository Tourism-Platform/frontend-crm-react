import type { IMainNetworkBeamItem } from "../types/main-config.types";
import type { TRoadmapPhase } from "../types/main-i18n.types";

/** Бейдж фазы роадмапа */
export const ROADMAP_BADGE_VARIANT_CLASS: Record<
	TRoadmapPhase["badgeVariant"],
	string
> = {
	now: "bg-emerald-500/10 text-emerald-600",
	soon: "bg-amber-500/10 text-amber-600",
	future: "bg-violet-500/10 text-violet-600"
};

/** Баннер фазы роадмапа */
export const ROADMAP_BANNER_VARIANT_CLASS: Record<
	TRoadmapPhase["badgeVariant"],
	string
> = {
	now: "bg-amber-500 text-white shadow-[0_4px_12px_rgba(245,158,11,0.3)]",
	soon: "bg-amber-500 text-white shadow-[0_4px_12px_rgba(245,158,11,0.3)]",
	future: "bg-violet-600 text-white shadow-[0_4px_12px_rgba(124,58,237,0.3)]"
};

export const MAIN_PAGE_ASSETS_PATH = "/assets/main-page";

export const MAIN_PAGE_IMAGES = {
	samarkand: `${MAIN_PAGE_ASSETS_PATH}/samarkand.jpg`,
	bukhara: `${MAIN_PAGE_ASSETS_PATH}/bukhara.jpg`,
	khiva: `${MAIN_PAGE_ASSETS_PATH}/khiva.jpg`,
	silkRoad: `${MAIN_PAGE_ASSETS_PATH}/silk-road.jpg`
} as const;

export const NETWORK_REGION_MAP_IMAGE = MAIN_PAGE_IMAGES.silkRoad;

export const NETWORK_BEAM_ITEMS_LIST: IMainNetworkBeamItem[] = [
	{ name: "beam-1", curvature: 0, endYOffset: 0 },
	{ name: "beam-2", curvature: 0, endYOffset: 0 },
	{ name: "beam-3", curvature: 0, endYOffset: 0 },
	{ name: "beam-4", curvature: 0, endYOffset: 0 },
	{ name: "beam-5", curvature: 0, endYOffset: 0 }
];
