import { HttpResponse, delay, http } from "msw";

import type { GeoFeature } from "@/shared/api";
import { GEO_PATHS } from "@/shared/api";
import { ENV } from "@/shared/config";
import { formatGeoFeatureLabel } from "@/shared/utils/geo-display.utils";

import { GEO_MOCK_FEATURES } from "../mock";

const BASE_URL = (ENV.VITE_API_URL || "").replace(/\/$/, "");
const COORD_EPSILON = 0.01;

const filterGeoFeatures = (query: string, limit: number) => {
	const normalized = query.trim().toLowerCase();
	if (!normalized) return [];

	return GEO_MOCK_FEATURES.filter((feature) => {
		const label = formatGeoFeatureLabel(feature).toLowerCase();
		return label.includes(normalized);
	}).slice(0, limit);
};

const findExactFeature = (lat: number, long: number): GeoFeature | undefined =>
	GEO_MOCK_FEATURES.find(
		(feature) =>
			Math.abs(feature.lat - lat) < COORD_EPSILON &&
			Math.abs(feature.long - long) < COORD_EPSILON
	);

const reverseGeoFeature = (lat: number, long: number): GeoFeature[] => {
	const exact = findExactFeature(lat, long);
	if (exact) {
		return [{ ...exact, lat, long }];
	}

	return [
		{
			lat,
			long,
			name: null,
			city: null,
			street: null,
			housenumber: null,
			postcode: null,
			state: null,
			country: null,
			country_code: null
		}
	];
};

export const geoHandlers = [
	http.get(`${BASE_URL}${GEO_PATHS.search.url}`, async ({ request }) => {
		await delay(400);

		const url = new URL(request.url);
		const q = url.searchParams.get("q") ?? "";
		const limit = Math.min(
			Math.max(Number(url.searchParams.get("limit")) || 10, 1),
			50
		);

		if (q.trim().length < 1) {
			return HttpResponse.json([], { status: 200 });
		}

		return HttpResponse.json(filterGeoFeatures(q, limit), { status: 200 });
	}),
	http.get(`${BASE_URL}${GEO_PATHS.reverse.url}`, async ({ request }) => {
		await delay(400);

		const url = new URL(request.url);
		const lat = Number(url.searchParams.get("lat"));
		const long = Number(url.searchParams.get("long"));

		if (!Number.isFinite(lat) || !Number.isFinite(long)) {
			return HttpResponse.json([], { status: 200 });
		}

		return HttpResponse.json(reverseGeoFeature(lat, long), { status: 200 });
	})
];
