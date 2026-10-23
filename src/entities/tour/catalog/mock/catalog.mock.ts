import {
	Currency,
	type PublicTourCatalogSchemaOutput,
	type TourMetaResponse,
	TourStatus
} from "@/shared/api";

import { listTourOptions } from "@/entities/tour/itinerary/mock/itinerary.store";
import { listLandingImages } from "@/entities/tour/landing/mock/landing.store";
import { getAllTours } from "@/entities/tour/tour/mock/tour.store";

const ROUTES: [string, string][][] = [
	[
		["Tashkent", "Uzbekistan"],
		["Samarkand", "Uzbekistan"],
		["Bukhara", "Uzbekistan"]
	],
	[
		["Khiva", "Uzbekistan"],
		["Nukus", "Uzbekistan"]
	],
	[
		["Almaty", "Kazakhstan"],
		["Bishkek", "Kyrgyzstan"]
	],
	[["Tashkent", "Uzbekistan"]],
	[
		["Samarkand", "Uzbekistan"],
		["Dushanbe", "Tajikistan"]
	]
];

const tourIndex = (tour: TourMetaResponse) =>
	getAllTours().findIndex((item) => item.id === tour.id);

export const getTourRoute = (tour: TourMetaResponse) =>
	ROUTES[Math.max(tourIndex(tour), 0) % ROUTES.length];

const price = (min: number) => ({ min, currency: Currency.USD });

/** Карточка каталога из тура стора: цены и города детерминированы по индексу */
export const toCatalogTour = (
	tour: TourMetaResponse
): PublicTourCatalogSchemaOutput => {
	const index = Math.max(tourIndex(tour), 0);
	const basePrice = 300 + (index % 7) * 150 + tour.days * 40;
	const discount = index % 4 === 1 ? 10 : null;

	return {
		tour_id: tour.id,
		slug: tour.slug,
		title: tour.title,
		cover_image_url: tour.cover_image_path,
		description: `${tour.title} — ${tour.days} days across Central Asia`,
		days: tour.days,
		nights: tour.nights,
		duration_hours: tour.duration_hours,
		age_from: tour.age_from,
		age_to: tour.age_to,
		group_size: tour.group_size,
		group_size_min: tour.group_size_min,
		categories: tour.categories,
		tour_type: tour.typ,
		landing_photos: listLandingImages(tour.id).map(
			(image) => image.image_path
		),
		cities: getTourRoute(tour).map(([city]) => city),
		languages: tour.languages,
		price_range: price(basePrice * 2),
		price_per_person: price(basePrice),
		option_count: listTourOptions(tour.id).length,
		public_price_range: price(Math.round(basePrice * 2.3)),
		public_price_per_person: price(Math.round(basePrice * 1.15)),
		discount: discount ? { typ: "percentage", percentage: discount } : null
	};
};

export const listPublishedTours = () =>
	getAllTours().filter((tour) => tour.status === TourStatus.Published);

/** Места для подсказок поиска помимо городов */
export const CATALOG_PLACES_MOCK = [
	["Registan Square", "Samarkand"],
	["Ark Fortress", "Bukhara"],
	["Itchan Kala", "Khiva"],
	["Chorsu Bazaar", "Tashkent"],
	["Charyn Canyon", "Almaty"]
];
