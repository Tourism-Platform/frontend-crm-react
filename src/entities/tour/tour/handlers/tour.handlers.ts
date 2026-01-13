import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";

import {
	TOUR_FINANCE_MOCK,
	TOUR_GENERAL_MOCK,
	TOUR_MOCK,
	TOUR_STATS_MOCK
} from "../mock";
import { ENUM_TOUR_STATUS } from "../types";
import type {
	ITourCard,
	ITourFinanceBackend,
	ITourGeneralBackend
} from "../types";

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
		return HttpResponse.json(newTour, { status: 201 });
	}),
	http.get(`${BASE_URL}/tours/:id/general`, async ({ params }) => {
		await delay(500);
		const { id } = params;
		const tour = tours.find((t) => t.id === id);

		if (!tour) {
			return new HttpResponse(null, { status: 404 });
		}

		const detailTour: ITourGeneralBackend = {
			...TOUR_GENERAL_MOCK,
			id: tour.id,
			title: tour.title,
			type: tour.type,
			status: tour.status
		};

		return HttpResponse.json(detailTour, { status: 200 });
	}),
	http.patch(`${BASE_URL}/tours/:id/general`, async ({ request, params }) => {
		await delay(500);
		const { id } = params;
		const body = (await request.json()) as Partial<ITourGeneralBackend>;
		const index = tours.findIndex((t) => t.id === id);

		if (index === -1) {
			return new HttpResponse(null, { status: 404 });
		}

		const updatedTour: ITourGeneralBackend = {
			...TOUR_GENERAL_MOCK,
			...tours[index],
			...body,
			id: id as string
		};

		return HttpResponse.json(updatedTour, { status: 200 });
	}),
	http.get(`${BASE_URL}/tours/:id/finance`, async ({ params }) => {
		await delay(500);
		const { id } = params;
		const tour = tours.find((t) => t.id === id);

		if (!tour) {
			return new HttpResponse(null, { status: 404 });
		}

		const financeTour: ITourFinanceBackend = {
			...TOUR_FINANCE_MOCK,
			id: tour.id
		};

		return HttpResponse.json(financeTour, { status: 200 });
	}),
	http.patch(`${BASE_URL}/tours/:id/finance`, async ({ request, params }) => {
		await delay(500);
		const { id } = params;
		const body = (await request.json()) as Partial<ITourFinanceBackend>;

		const updatedFinance: ITourFinanceBackend = {
			...TOUR_FINANCE_MOCK,
			...body,
			id: id as string
		};

		return HttpResponse.json(updatedFinance, { status: 200 });
	}),
	http.get(`${BASE_URL}/tours/:id/stats`, async () => {
		await delay(500);
		return HttpResponse.json(TOUR_STATS_MOCK, { status: 200 });
	}),
	http.post(`${BASE_URL}/tours/:id/publish`, async () => {
		await delay(500);
		return new HttpResponse(null, { status: 200 });
	})
];
