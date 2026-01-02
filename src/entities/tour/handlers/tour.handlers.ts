import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";

import { ENUM_TOUR_STATUS } from "../constants";
import { TOUR_MOCK } from "../mock";
import type { ITourCard } from "../types";

const BASE_URL = ENV.VITE_API_URL || "";

const tours = [...TOUR_MOCK];

export const tourHandlers = [
	http.get(`${BASE_URL}/tours`, async ({ request }) => {
		await delay(500);
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const limit = Number(url.searchParams.get("limit")) || 10;
		const search = url.searchParams.get("search");
		const status = url.searchParams.get("status")?.split(",");

		let filteredTours = [...tours];

		if (search) {
			const query = search.toLowerCase();
			filteredTours = filteredTours.filter(
				(t) =>
					t.title.toLowerCase().includes(query) ||
					t.type.toLowerCase().includes(query)
			);
		}

		if (
			status &&
			status.length > 0 &&
			!status.includes(ENUM_TOUR_STATUS.ALL)
		) {
			filteredTours = filteredTours.filter((t) =>
				status.includes(t.status)
			);
		}

		const start = (page - 1) * limit;
		const end = start + limit;
		const pagedData = filteredTours.slice(start, end);

		return HttpResponse.json(
			{
				data: pagedData,
				total: filteredTours.length
			},
			{ status: 200 }
		);
	}),
	http.post(`${BASE_URL}/tours`, async ({ request }) => {
		await delay(500);
		const body = (await request.json()) as ITourCard;
		const newTour = {
			...body,
			id: (tours.length + 1).toString(),
			price_from: 100,
			price_to: 1000,
			title: body.title,
			route: ["TAS", "SAM", "BUH", "KHIV"],
			status: ENUM_TOUR_STATUS.MODERATE,
			image_url:
				"https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
		};
		tours.push(newTour);
		return HttpResponse.json(newTour, { status: 201 });
	})
];
