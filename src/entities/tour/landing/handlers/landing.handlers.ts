import { HttpResponse } from "msw";

import {
	TOUR_LANDING_PAGE_PATHS,
	createMockHandler,
	mockNoContent,
	mockNotFound,
	readFormFiles
} from "@/shared/api";

import { getTour } from "@/entities/tour/tour/mock/tour.store";

import {
	addLandingImages,
	deleteLandingImage,
	getLanding,
	listLandingImages,
	setPrimaryLandingImage,
	updateLanding
} from "../mock/landing.store";

const withTour = (tourId: unknown, resolve: (tourId: string) => Response) =>
	getTour(String(tourId))
		? resolve(String(tourId))
		: mockNotFound("Tour not found");

export const tourLandingHandlers = [
	createMockHandler(
		TOUR_LANDING_PAGE_PATHS.getLandingPage(":tourId"),
		({ params }) =>
			withTour(params.tourId, (tourId) =>
				HttpResponse.json(getLanding(tourId))
			)
	),

	createMockHandler(
		TOUR_LANDING_PAGE_PATHS.updateLandingPage(":tourId"),
		({ params, body }) =>
			withTour(params.tourId, (tourId) =>
				HttpResponse.json(updateLanding(tourId, body))
			)
	),

	createMockHandler(
		TOUR_LANDING_PAGE_PATHS.listLandingImages(":tourId"),
		({ params }) =>
			withTour(params.tourId, (tourId) =>
				HttpResponse.json(listLandingImages(tourId))
			)
	),

	createMockHandler(
		TOUR_LANDING_PAGE_PATHS.uploadLandingImages(":tourId"),
		async ({ params, request }) => {
			const files = await readFormFiles(request);
			return withTour(params.tourId, (tourId) =>
				HttpResponse.json(addLandingImages(tourId, files.length), {
					status: 201
				})
			);
		}
	),

	createMockHandler(
		TOUR_LANDING_PAGE_PATHS.deleteLandingImage(":tourId", ":imageId"),
		({ params }) =>
			withTour(params.tourId, (tourId) =>
				deleteLandingImage(tourId, String(params.imageId))
					? mockNoContent()
					: mockNotFound("Image not found")
			)
	),

	createMockHandler(
		TOUR_LANDING_PAGE_PATHS.setPrimaryLandingImage(":tourId", ":imageId"),
		({ params }) =>
			withTour(params.tourId, (tourId) => {
				const image = setPrimaryLandingImage(
					tourId,
					String(params.imageId)
				);
				return image
					? HttpResponse.json(image)
					: mockNotFound("Image not found");
			})
	)
];
