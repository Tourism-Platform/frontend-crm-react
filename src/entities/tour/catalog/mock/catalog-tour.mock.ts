import { ENUM_CATALOG_TOUR_STATUS, ENUM_CATALOG_TOUR_TYPES } from "../types";
import type { ICatalogTourBackend } from "../types";

export const CATALOG_TOURS_MOCK: ICatalogTourBackend[] = [
	{
		id: "catalog-tour-1",
		status: ENUM_CATALOG_TOUR_STATUS.ACTIVE,
		title: "Catalog: Ancient Wonders of Samarkand",
		route: ["TAS", "SAM"],
		type: ENUM_CATALOG_TOUR_TYPES.GROUP,
		price_from: 450,
		price_to: 900,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-2",
		status: ENUM_CATALOG_TOUR_STATUS.MODERATE,
		title: "Catalog: Khiva Adventure",
		route: ["TAS", "KHIV"],
		type: ENUM_CATALOG_TOUR_TYPES.PRIVATE,
		price_from: 600,
		price_to: 1200,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-3",
		status: ENUM_CATALOG_TOUR_STATUS.PLANNING,
		title: "Catalog: Bukhara Silk Road Treasury",
		route: ["SAM", "BUH"],
		type: ENUM_CATALOG_TOUR_TYPES.GROUP,
		price_from: 350,
		price_to: 700,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-4",
		status: ENUM_CATALOG_TOUR_STATUS.ACTIVE,
		title: "Catalog: Aral Sea Expedition",
		route: ["NUK", "MUY"],
		type: ENUM_CATALOG_TOUR_TYPES.PRIVATE,
		price_from: 800,
		price_to: 1500,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-5",
		status: ENUM_CATALOG_TOUR_STATUS.CANCELLED,
		title: "Catalog: Fergana Valley Crafts",
		route: ["TAS", "FER", "MAR"],
		type: ENUM_CATALOG_TOUR_TYPES.GROUP,
		price_from: 300,
		price_to: 550,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-6",
		status: ENUM_CATALOG_TOUR_STATUS.ARCHIVED,
		title: "Catalog: Chimgan Mountain Skiing",
		route: ["TAS", "CHIM"],
		type: ENUM_CATALOG_TOUR_TYPES.GROUP,
		price_from: 200,
		price_to: 400,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-7",
		status: ENUM_CATALOG_TOUR_STATUS.ACTIVE,
		title: "Catalog: Tashkent Modern & Ancient",
		route: ["TAS"],
		type: ENUM_CATALOG_TOUR_TYPES.PRIVATE,
		price_from: 150,
		price_to: 300,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-8",
		status: ENUM_CATALOG_TOUR_STATUS.MODERATE,
		title: "Catalog: Termez Buddhist Heritage",
		route: ["TAS", "TER"],
		type: ENUM_CATALOG_TOUR_TYPES.GROUP,
		price_from: 500,
		price_to: 1000,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-9",
		status: ENUM_CATALOG_TOUR_STATUS.ACTIVE,
		title: "Catalog: Shahrisabz Tamerlane's Birthplace",
		route: ["SAM", "SHA"],
		type: ENUM_CATALOG_TOUR_TYPES.PRIVATE,
		price_from: 400,
		price_to: 850,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-10",
		status: ENUM_CATALOG_TOUR_STATUS.PLANNING,
		title: "Catalog: Gastronomy of Uzbekistan",
		route: ["TAS", "SAM", "BUH"],
		type: ENUM_CATALOG_TOUR_TYPES.GROUP,
		price_from: 600,
		price_to: 1300,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-11",
		status: ENUM_CATALOG_TOUR_STATUS.ACTIVE,
		title: "Catalog: Desert Yurts and Aydarkul Lake",
		route: ["BUH", "NUR"],
		type: ENUM_CATALOG_TOUR_TYPES.GROUP,
		price_from: 400,
		price_to: 800,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-12",
		status: ENUM_CATALOG_TOUR_STATUS.ACTIVE,
		title: "Catalog: Margilan Silk Factory Experience",
		route: ["TAS", "MAR"],
		type: ENUM_CATALOG_TOUR_TYPES.PRIVATE,
		price_from: 250,
		price_to: 500,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-13",
		status: ENUM_CATALOG_TOUR_STATUS.MODERATE,
		title: "Catalog: Zaamin National Park Trekking",
		route: ["TAS", "ZAA"],
		type: ENUM_CATALOG_TOUR_TYPES.GROUP,
		price_from: 350,
		price_to: 700,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-14",
		status: ENUM_CATALOG_TOUR_STATUS.ACTIVE,
		title: "Catalog: Andijan Garden City Tour",
		route: ["TAS", "AND"],
		type: ENUM_CATALOG_TOUR_TYPES.GROUP,
		price_from: 300,
		price_to: 600,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-15",
		status: ENUM_CATALOG_TOUR_STATUS.PLANNING,
		title: "Catalog: Boysun Cultural Landscape",
		route: ["TER", "BOY"],
		type: ENUM_CATALOG_TOUR_TYPES.PRIVATE,
		price_from: 450,
		price_to: 950,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-16",
		status: ENUM_CATALOG_TOUR_STATUS.ACTIVE,
		title: "Catalog: Kokand Palace of Khan",
		route: ["TAS", "KOK"],
		type: ENUM_CATALOG_TOUR_TYPES.GROUP,
		price_from: 200,
		price_to: 450,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-17",
		status: ENUM_CATALOG_TOUR_STATUS.MODERATE,
		title: "Catalog: Elliq Qala Desert Fortresses",
		route: ["NUK", "KHI"],
		type: ENUM_CATALOG_TOUR_TYPES.PRIVATE,
		price_from: 550,
		price_to: 1100,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-18",
		status: ENUM_CATALOG_TOUR_STATUS.ACTIVE,
		title: "Catalog: Rishtan Pottery Workshop",
		route: ["FER", "RIS"],
		type: ENUM_CATALOG_TOUR_TYPES.GROUP,
		price_from: 150,
		price_to: 350,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-19",
		status: ENUM_CATALOG_TOUR_STATUS.ACTIVE,
		title: "Catalog: Gijduvan Ceramic Center",
		route: ["BUH", "GIJ"],
		type: ENUM_CATALOG_TOUR_TYPES.PRIVATE,
		price_from: 200,
		price_to: 450,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-20",
		status: ENUM_CATALOG_TOUR_STATUS.PLANNING,
		title: "Catalog: Langar Ota Sacred Site",
		route: ["SHA", "LAN"],
		type: ENUM_CATALOG_TOUR_TYPES.GROUP,
		price_from: 300,
		price_to: 650,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-21",
		status: ENUM_CATALOG_TOUR_STATUS.ACTIVE,
		title: "Catalog: Namangan Flowers Festival",
		route: ["NAM"],
		type: ENUM_CATALOG_TOUR_TYPES.GROUP,
		price_from: 250,
		price_to: 500,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-22",
		status: ENUM_CATALOG_TOUR_STATUS.MODERATE,
		title: "Catalog: Urgut Market Exploration",
		route: ["SAM", "URG"],
		type: ENUM_CATALOG_TOUR_TYPES.PRIVATE,
		price_from: 150,
		price_to: 350,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-23",
		status: ENUM_CATALOG_TOUR_STATUS.ACTIVE,
		title: "Catalog: Nukus Art Museum Tour",
		route: ["NUK"],
		type: ENUM_CATALOG_TOUR_TYPES.GROUP,
		price_from: 200,
		price_to: 400,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-24",
		status: ENUM_CATALOG_TOUR_STATUS.PLANNING,
		title: "Catalog: Muynaq Ship Graveyard Visit",
		route: ["MUY"],
		type: ENUM_CATALOG_TOUR_TYPES.PRIVATE,
		price_from: 400,
		price_to: 850,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-25",
		status: ENUM_CATALOG_TOUR_STATUS.ACTIVE,
		title: "Catalog: Navoi Petroglyphs Tour",
		route: ["NAV", "SAR"],
		type: ENUM_CATALOG_TOUR_TYPES.GROUP,
		price_from: 300,
		price_to: 600,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-26",
		status: ENUM_CATALOG_TOUR_STATUS.MODERATE,
		title: "Catalog: Jizzakh Mountains Adventure",
		route: ["JIZ"],
		type: ENUM_CATALOG_TOUR_TYPES.PRIVATE,
		price_from: 250,
		price_to: 550,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-27",
		status: ENUM_CATALOG_TOUR_STATUS.ACTIVE,
		title: "Catalog: Gulistan Steppe Experience",
		route: ["GUL"],
		type: ENUM_CATALOG_TOUR_TYPES.GROUP,
		price_from: 150,
		price_to: 300,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-28",
		status: ENUM_CATALOG_TOUR_STATUS.PLANNING,
		title: "Catalog: Karakalpakstan Ethno Tour",
		route: ["NUK", "CHIMB"],
		type: ENUM_CATALOG_TOUR_TYPES.GROUP,
		price_from: 400,
		price_to: 900,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-29",
		status: ENUM_CATALOG_TOUR_STATUS.ACTIVE,
		title: "Catalog: Silk Road Full Traverse",
		route: ["TAS", "SAM", "BUH", "KHIV", "NUK"],
		type: ENUM_CATALOG_TOUR_TYPES.GROUP,
		price_from: 1200,
		price_to: 2500,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "catalog-tour-30",
		status: ENUM_CATALOG_TOUR_STATUS.ACTIVE,
		title: "Catalog: Hidden Gems of Fergana",
		route: ["FER", "NAM", "AND"],
		type: ENUM_CATALOG_TOUR_TYPES.PRIVATE,
		price_from: 500,
		price_to: 1100,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	}
];
