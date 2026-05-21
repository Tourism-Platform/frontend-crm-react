import type {
	Currency,
	LandingPagePubSchema,
	OperatorPreviewPubSchema,
	TourOptionPublicResponse
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_PUBLIC_PATHS = {
	getPublicTourOption: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/public/option/${optionId}`,
			method: "GET",
			_types: {} as {
				body: void;
				query: { currency?: Currency };
				response: TourOptionPublicResponse;
			}
		}) as const,
	getPublicLandingPage: (tourId: string) =>
		({
			url: `/tour/${tourId}/public/landing`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: LandingPagePubSchema;
			}
		}) as const,
	getPublicOperatorPreview: (tourId: string) =>
		({
			url: `/tour/${tourId}/public/operator`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: OperatorPreviewPubSchema;
			}
		}) as const
} as const;
