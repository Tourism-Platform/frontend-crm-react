import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";

import { ENUM_TOUR_STATUS } from "../constants";
import { TOUR_FINANCE_MOCK, TOUR_GENERAL_MOCK, TOUR_MOCK } from "../mock";
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
			type: tour.type
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
			id: id as string,
			title: body.title || tours[index].title,
			type: body.type || tours[index].type,
			group_size: body.group_size || 15,
			duration_from: body.duration_from || 5,
			duration_to: body.duration_to || 10,
			age_requires_from: body.age_requires_from || 18,
			age_requires_to: body.age_requires_to || 65,
			categories: body.categories || TOUR_GENERAL_MOCK.categories
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
			id: id as string,
			currency_type: body.currency_type || "USD",
			pricing_visibility: body.pricing_visibility || "show_from"
		};

		return HttpResponse.json(updatedFinance, { status: 200 });
	})
];
