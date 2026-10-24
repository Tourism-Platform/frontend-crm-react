import { HttpResponse } from "msw";

import {
	TOUR_CATALOG_PATHS,
	createMockHandler,
	getQueryList,
	matchesQuery,
	toListResponse
} from "@/shared/api";

import {
	CATALOG_PLACES_MOCK,
	getTourRoute,
	listPublishedTours,
	toCatalogTour
} from "../mock";
import {
	ENUM_SUGGEST_KIND_BACKEND,
	ENUM_TOUR_CATALOG_SORT_BACKEND,
	type ENUM_TOUR_CATALOG_SORT_BACKEND_TYPE,
	type TPublicTourCatalogSchemaOutputBackend
} from "../types";

const pricePerPerson = (tour: TPublicTourCatalogSchemaOutputBackend) =>
	tour.price_per_person?.min ?? 0;

const SORTERS: Record<
	ENUM_TOUR_CATALOG_SORT_BACKEND_TYPE,
	(
		a: TPublicTourCatalogSchemaOutputBackend,
		b: TPublicTourCatalogSchemaOutputBackend
	) => number
> = {
	[ENUM_TOUR_CATALOG_SORT_BACKEND.PRICE_ASC]: (a, b) =>
		pricePerPerson(a) - pricePerPerson(b),
	[ENUM_TOUR_CATALOG_SORT_BACKEND.PRICE_DESC]: (a, b) =>
		pricePerPerson(b) - pricePerPerson(a),
	[ENUM_TOUR_CATALOG_SORT_BACKEND.DURATION_ASC]: (a, b) => a.days - b.days,
	[ENUM_TOUR_CATALOG_SORT_BACKEND.DURATION_DESC]: (a, b) => b.days - a.days
};

const listCatalog = (query: URLSearchParams) => {
	const categories = getQueryList(query, "categories");
	const cities = getQueryList(query, "city");
	const countries = getQueryList(query, "country");
	const languages = getQueryList(query, "tour_lang");
	const daysMin = Number(query.get("duration_days_min") ?? 0);
	const daysMax = Number(query.get("duration_days_max") ?? Infinity);
	const sort = query.get(
		"sort"
	) as ENUM_TOUR_CATALOG_SORT_BACKEND_TYPE | null;

	const tours = listPublishedTours()
		.filter((tour) => {
			const route = getTourRoute(tour);
			return (
				matchesQuery(query.get("q"), tour.title, ...route.flat()) &&
				(!categories.length ||
					tour.categories.some((category) =>
						categories.includes(category)
					)) &&
				(!cities.length ||
					route.some(([city]) => cities.includes(city))) &&
				(!countries.length ||
					route.some(([, country]) => countries.includes(country))) &&
				(!languages.length ||
					tour.languages.some((language) =>
						languages.includes(language)
					)) &&
				tour.days >= daysMin &&
				tour.days <= daysMax
			);
		})
		.map(toCatalogTour);

	return sort && SORTERS[sort] ? tours.sort(SORTERS[sort]) : tours;
};

const unique = (values: string[]) => [...new Set(values)].sort();

export const tourCatalogHandlers = [
	createMockHandler(TOUR_CATALOG_PATHS.listPublicCatalog, ({ query }) =>
		HttpResponse.json(toListResponse(listCatalog(query), query))
	),

	createMockHandler(TOUR_CATALOG_PATHS.listAgencyCatalog, ({ query }) =>
		HttpResponse.json(toListResponse(listCatalog(query), query))
	),

	createMockHandler(TOUR_CATALOG_PATHS.listFilters, () => {
		const routes = listPublishedTours().flatMap(getTourRoute);
		return HttpResponse.json({
			cities: unique(routes.map(([city]) => city)),
			countries: unique(routes.map(([, country]) => country))
		});
	}),

	createMockHandler(TOUR_CATALOG_PATHS.suggestLocations, ({ query }) => {
		const q = query.get("q");
		const limit = Number(query.get("limit") ?? 10);
		const routes = listPublishedTours().flatMap(getTourRoute);

		const suggestions = [
			...unique(routes.map(([city]) => city)).map((city) => ({
				value: city,
				kind: ENUM_SUGGEST_KIND_BACKEND.CITY,
				city
			})),
			...unique(routes.map(([, country]) => country)).map((country) => ({
				value: country,
				kind: ENUM_SUGGEST_KIND_BACKEND.COUNTRY,
				city: null
			})),
			...CATALOG_PLACES_MOCK.map(([place, city]) => ({
				value: place,
				kind: ENUM_SUGGEST_KIND_BACKEND.PLACE,
				city
			}))
		].filter((item) => matchesQuery(q, item.value));

		return HttpResponse.json(suggestions.slice(0, limit));
	})
];
