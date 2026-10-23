import { HttpResponse } from "msw";

import {
	type PublicTourCatalogSchemaOutput,
	SuggestKind,
	TOUR_CATALOG_PATHS,
	TourCatalogSort,
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

const pricePerPerson = (tour: PublicTourCatalogSchemaOutput) =>
	tour.price_per_person?.min ?? 0;

const SORTERS: Record<
	TourCatalogSort,
	(
		a: PublicTourCatalogSchemaOutput,
		b: PublicTourCatalogSchemaOutput
	) => number
> = {
	[TourCatalogSort.PriceAsc]: (a, b) => pricePerPerson(a) - pricePerPerson(b),
	[TourCatalogSort.PriceDesc]: (a, b) =>
		pricePerPerson(b) - pricePerPerson(a),
	[TourCatalogSort.DurationAsc]: (a, b) => a.days - b.days,
	[TourCatalogSort.DurationDesc]: (a, b) => b.days - a.days
};

const listCatalog = (query: URLSearchParams) => {
	const categories = getQueryList(query, "categories");
	const cities = getQueryList(query, "city");
	const countries = getQueryList(query, "country");
	const languages = getQueryList(query, "tour_lang");
	const daysMin = Number(query.get("duration_days_min") ?? 0);
	const daysMax = Number(query.get("duration_days_max") ?? Infinity);
	const sort = query.get("sort") as TourCatalogSort | null;

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
				kind: SuggestKind.City,
				city
			})),
			...unique(routes.map(([, country]) => country)).map((country) => ({
				value: country,
				kind: SuggestKind.Country,
				city: null
			})),
			...CATALOG_PLACES_MOCK.map(([place, city]) => ({
				value: place,
				kind: SuggestKind.Place,
				city
			}))
		].filter((item) => matchesQuery(q, item.value));

		return HttpResponse.json(suggestions.slice(0, limit));
	})
];
