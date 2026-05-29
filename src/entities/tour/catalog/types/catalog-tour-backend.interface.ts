import type { TOUR_CATALOG_PATHS } from "@/shared/api";

export type TCatalogTourBackend =
	(typeof TOUR_CATALOG_PATHS.listPublicCatalog._types.response)[number];

export type TListCatalogToursBackendResponse =
	typeof TOUR_CATALOG_PATHS.listPublicCatalog._types.response;

export type TCatalogTourQueryBackend =
	typeof TOUR_CATALOG_PATHS.listPublicCatalog._types.query;

export interface ICatalogTourBackend {
	id: string;
	title: string;
	price_from: number;
	price_to: number;
	image_url: string;
	description: string;
	duration: number;
}
