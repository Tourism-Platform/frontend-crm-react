import { HttpResponse, delay, http } from "msw";

import {
	CATALOG_CATEGORIES_MOCK,
	CATALOG_DESTINATIONS_MOCK,
	CATALOG_DURATIONS_MOCK,
	CATALOG_LANGUAGES_MOCK,
	CATALOG_REGIONS_MOCK,
	CATALOG_TOURS_MOCK,
	PRICE_HISTOGRAM_MOCK,
	RECENT_SEARCHES_MOCK
} from "../mock";

export const tourCatalogHandlers = [
	http.get("*/tours/recently-searched", async () => {
		await delay(500);
		return HttpResponse.json(RECENT_SEARCHES_MOCK);
	}),
	http.get("*/tours/catalog", async ({ request }) => {
		await delay(500);
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const limit = Number(url.searchParams.get("limit")) || 10;
		const search = url.searchParams.get("search");

		// New filters
		const regions = url.searchParams.get("region")?.split(",");
		const durations = url.searchParams.get("duration")?.split(",");
		const languages = url.searchParams.get("language")?.split(",");
		const categories = url.searchParams.get("category")?.split(",");

		let filteredTours = [...CATALOG_TOURS_MOCK];

		if (search) {
			const query = search.toLowerCase();
			filteredTours = filteredTours.filter((t) =>
				t.title.toLowerCase().includes(query)
			);
		}

		// TODO: Implement filtering logic once mock data has these fields
		// For now, we just receive the params to ensure API contract works
		if (regions?.length) {
			// filteredTours = filteredTours.filter(...)
			console.log("Filtering by regions:", regions);
		}
		if (durations?.length) {
			console.log("Filtering by durations:", durations);
		}
		if (languages?.length) {
			console.log("Filtering by languages:", languages);
		}
		if (categories?.length) {
			console.log("Filtering by categories:", categories);
		}

		const start = (page - 1) * limit;
		const end = start + limit;
		const pagedData = filteredTours.slice(start, end);

		return HttpResponse.json({
			data: pagedData,
			total: filteredTours.length
		});
	}),
	http.get("*/tours/catalog/filters/regions", async ({ request }) => {
		await delay(500);
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const limit = Number(url.searchParams.get("limit")) || 5;

		const start = (page - 1) * limit;
		const end = start + limit;
		const pagedData = CATALOG_REGIONS_MOCK.slice(start, end);

		return HttpResponse.json({
			data: pagedData,
			total: CATALOG_REGIONS_MOCK.length
		});
	}),
	http.get("*/tours/catalog/filters/durations", async ({ request }) => {
		await delay(500);
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const limit = Number(url.searchParams.get("limit")) || 5;

		const start = (page - 1) * limit;
		const end = start + limit;
		const pagedData = CATALOG_DURATIONS_MOCK.slice(start, end);

		return HttpResponse.json({
			data: pagedData,
			total: CATALOG_DURATIONS_MOCK.length
		});
	}),
	http.get("*/tours/catalog/filters/languages", async ({ request }) => {
		await delay(500);
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const limit = Number(url.searchParams.get("limit")) || 5;

		const start = (page - 1) * limit;
		const end = start + limit;
		const pagedData = CATALOG_LANGUAGES_MOCK.slice(start, end);

		return HttpResponse.json({
			data: pagedData,
			total: CATALOG_LANGUAGES_MOCK.length
		});
	}),
	http.get("*/tours/catalog/filters/categories", async ({ request }) => {
		await delay(500);
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const limit = Number(url.searchParams.get("limit")) || 5;

		const start = (page - 1) * limit;
		const end = start + limit;
		const pagedData = CATALOG_CATEGORIES_MOCK.slice(start, end);

		return HttpResponse.json({
			data: pagedData,
			total: CATALOG_CATEGORIES_MOCK.length
		});
	}),
	http.get("*/tours/catalog/filters/price-histogram", async ({ request }) => {
		await delay(500);
		const url = new URL(request.url);
		const min = Number(url.searchParams.get("min")) || 0;
		const max = Number(url.searchParams.get("max")) || 3000;
		const step = Number(url.searchParams.get("step")) || 200;

		console.log("Price histogram request:", { min, max, step });

		return HttpResponse.json(PRICE_HISTOGRAM_MOCK);
	}),
	http.get("*/tours/catalog/filters/destinations", async () => {
		await delay(500);

		return HttpResponse.json({
			data: CATALOG_DESTINATIONS_MOCK,
			total: CATALOG_DESTINATIONS_MOCK.length
		});
	})
];
