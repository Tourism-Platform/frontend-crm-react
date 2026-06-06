import type { IMainNetworkBeamItem } from "../types/main-config.types";

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
