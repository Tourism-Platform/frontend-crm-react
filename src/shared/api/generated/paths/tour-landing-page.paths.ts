import type {
	LandingPageCreate,
	LandingPageImageModel,
	LandingPageModel,
	LandingPageUpdate
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_LANDING_PAGE_PATHS = {
	getLandingPage: (tourId: string) =>
		({
			url: `/tour/${tourId}/landing`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: LandingPageModel;
			}
		}) as const,
	createLandingPage: (tourId: string) =>
		({
			url: `/tour/${tourId}/landing`,
			method: "POST",
			_types: {} as {
				body: LandingPageCreate;
				query: void;
				response: LandingPageModel;
			}
		}) as const,
	updateLandingPage: (tourId: string) =>
		({
			url: `/tour/${tourId}/landing`,
			method: "PATCH",
			_types: {} as {
				body: LandingPageUpdate;
				query: void;
				response: LandingPageModel;
			}
		}) as const,
	listLandingImages: (tourId: string) =>
		({
			url: `/tour/${tourId}/landing/images`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: LandingPageImageModel[];
			}
		}) as const,
	uploadLandingImages: (tourId: string) =>
		({
			url: `/tour/${tourId}/landing/images`,
			method: "POST",
			_types: {} as {
				body: void;
				query: void;
				response: LandingPageImageModel[];
			}
		}) as const,
	deleteLandingImage: (tourId: string, imageId: string) =>
		({
			url: `/tour/${tourId}/landing/images/${imageId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
