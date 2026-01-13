import { ENUM_TOUR_STATUS } from "../types";
import { ENUM_TOUR_TYPES, type ITourBackend } from "../types";

export const TOUR_MOCK: ITourBackend[] = [
	{
		id: "9f2b3d82-5c4d-4b9f-9f7a-1a42e71d1b11",
		status: ENUM_TOUR_STATUS.ACTIVE,
		title: "Embark on an Unforgettable Archaeological Journey",
		route: ["TAS", "SAM", "BUH", "KHIV"],
		type: ENUM_TOUR_TYPES.GROUP,
		price_from: 500,
		price_to: 1000,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "3c6a27f5-1a9b-4f92-9cb3-2f58f3d4e8e2",
		status: ENUM_TOUR_STATUS.MODERATE,
		title: "Silk Road Highlights Expedition",
		route: ["TAS", "SAM", "BUH"],
		type: ENUM_TOUR_TYPES.GROUP,
		price_from: 300,
		price_to: 750,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "f7d2e8a6-4e92-46ef-b0fc-7f2a2a69e921",
		status: ENUM_TOUR_STATUS.CANCELLED,
		title: "Desert Adventure: Khiva to Nukus",
		route: ["KHIV", "NUK"],
		type: ENUM_TOUR_TYPES.PRIVATE,
		price_from: 400,
		price_to: 900,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "0f7a1c92-bf61-4db0-921e-2283f9f72f33",
		status: ENUM_TOUR_STATUS.PLANNING,
		title: "Cultural Treasures of Samarkand",
		route: ["TAS", "SAM"],
		type: ENUM_TOUR_TYPES.GROUP,
		price_from: 250,
		price_to: 600,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "a2b8e0d3-83a7-496f-9d87-1e7d39b5c9de",
		status: ENUM_TOUR_STATUS.ACTIVE,
		title: "Ancient Cities Tour: Bukhara & Khiva",
		route: ["BUH", "KHIV"],
		type: ENUM_TOUR_TYPES.GROUP,
		price_from: 350,
		price_to: 800,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "74f3a6b9-1d2c-4f98-a18f-7a4b5c0f0c91",
		status: ENUM_TOUR_STATUS.ARCHIVED,
		title: "Mountain Escape in Chimgan",
		route: ["TAS", "CHIM"],
		type: ENUM_TOUR_TYPES.PRIVATE,
		price_from: 200,
		price_to: 450,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "f2c1e7a8-6c9f-4e2a-889f-45e71a3d9222",
		status: ENUM_TOUR_STATUS.ACTIVE,
		title: "Golden Ring of Uzbekistan",
		route: ["TAS", "SAM", "BUH", "KHIV", "NUK"],
		type: ENUM_TOUR_TYPES.GROUP,
		price_from: 600,
		price_to: 1200,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "e1f9c7b2-0d38-4a63-9b0e-8821a2bffcc7",
		status: ENUM_TOUR_STATUS.MODERATE,
		title: "Tashkent City Break",
		route: ["TAS"],
		type: ENUM_TOUR_TYPES.PRIVATE,
		price_from: 100,
		price_to: 300,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "b4f29c88-6b10-4d3c-9d22-0b2f83af5a42",
		status: ENUM_TOUR_STATUS.PLANNING,
		title: "Fergana Valley Handicraft Tour",
		route: ["FER", "AND", "NAM"],
		type: ENUM_TOUR_TYPES.GROUP,
		price_from: 280,
		price_to: 550,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "c3a6f2b1-4e8f-44c3-a20e-1f6e2d93c44a",
		status: ENUM_TOUR_STATUS.CANCELLED,
		title: "Safari in Kyzylkum Desert",
		route: ["SAM", "KYZ"],
		type: ENUM_TOUR_TYPES.PRIVATE,
		price_from: 450,
		price_to: 950,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "6d4a7f93-0c62-47f8-8b77-97f5d2e381c0",
		status: ENUM_TOUR_STATUS.ACTIVE,
		title: "Weekend Getaway in Samarkand",
		route: ["TAS", "SAM"],
		type: ENUM_TOUR_TYPES.PRIVATE,
		price_from: 200,
		price_to: 400,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "5c0f9e1b-8f42-4d82-a2e0-6c3a1e4f7b29",
		status: ENUM_TOUR_STATUS.ARCHIVED,
		title: "Pilgrimage Tour: Seven Saints of Bukhara",
		route: ["BUH"],
		type: ENUM_TOUR_TYPES.GROUP,
		price_from: 320,
		price_to: 700,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "4b3c8d6f-9f51-4a77-8a23-1d5e8f7c2b92",
		status: ENUM_TOUR_STATUS.MODERATE,
		title: "Adventure Trekking in Nuratau Mountains",
		route: ["NUR", "AYDAR"],
		type: ENUM_TOUR_TYPES.GROUP,
		price_from: 350,
		price_to: 650,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "8f2b7c6a-1e23-49f7-9a62-4f0b1d8e32a3",
		status: ENUM_TOUR_STATUS.PLANNING,
		title: "Khiva Architectural Wonders",
		route: ["KHIV"],
		type: ENUM_TOUR_TYPES.GROUP,
		price_from: 220,
		price_to: 480,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "1e7f9a2b-3c4d-4f8a-9e1a-7f3c8d2a9f11",
		status: ENUM_TOUR_STATUS.CANCELLED,
		title: "Luxury Tour across Uzbekistan",
		route: ["TAS", "SAM", "BUH", "KHIV"],
		type: ENUM_TOUR_TYPES.PRIVATE,
		price_from: 1500,
		price_to: 2500,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "7c2e8f9b-0d1a-4a3f-bf21-2e8f1c4d7b2e",
		status: ENUM_TOUR_STATUS.ACTIVE,
		title: "Nomadic Yurt Experience",
		route: ["AYDAR"],
		type: ENUM_TOUR_TYPES.GROUP,
		price_from: 180,
		price_to: 350,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "0c1f7d2e-6a3b-46e1-8a9f-3c7f2b9e8d3a",
		status: ENUM_TOUR_STATUS.ARCHIVED,
		title: "Eco-tour in Zaamin National Park",
		route: ["ZAA"],
		type: ENUM_TOUR_TYPES.PRIVATE,
		price_from: 260,
		price_to: 520,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "2a9c8e1d-5f7a-49d3-b7c8-1f2b7e3c6a1d",
		status: ENUM_TOUR_STATUS.MODERATE,
		title: "Wine Tasting Journey in Samarkand",
		route: ["SAM"],
		type: ENUM_TOUR_TYPES.GROUP,
		price_from: 400,
		price_to: 700,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	},
	{
		id: "9a2b7f6c-3d1e-40a8-9f2b-5c7d8f3a1b9c",
		status: ENUM_TOUR_STATUS.PLANNING,
		title: "Historical Tashkent City Tour",
		route: ["TAS"],
		type: ENUM_TOUR_TYPES.GROUP,
		price_from: 120,
		price_to: 280,
		image_url:
			"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
	}
];
