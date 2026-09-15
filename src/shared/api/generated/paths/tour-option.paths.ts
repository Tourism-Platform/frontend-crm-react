import type {
	BodyUploadOptionCoverTourTourIdOptionOptionIdCoverPost,
	Currency,
	LanguageCode,
	PerPaxPriceMatrixSchemaOutput,
	PerRangePriceMatrixSchemaOutput,
	PricingBreakdownResponse,
	TourOptionCreateSchema,
	TourOptionModel,
	TourOptionUpdateSchema
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_OPTION_PATHS = {
	getPricingBreakdown: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/option/${optionId}/pricing-breakdown`,
			method: "GET",
			_types: {} as {
				body: void;
				query: {
					currency?: Currency;
					read_lang?: LanguageCode;
					as_of?: string | null;
					pax?: number | null;
					date?: string | null;
				};
				response: PricingBreakdownResponse;
			}
		}) as const,
	getPriceMatrix: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/option/${optionId}/price-matrix`,
			method: "GET",
			_types: {} as {
				body: void;
				query: {
					currency?: Currency;
					pax_from?: number | null;
					pax_to?: number | null;
					brackets?: string | null;
					date?: string | null;
					as_of?: string | null;
				};
				response:
					| PerPaxPriceMatrixSchemaOutput
					| PerRangePriceMatrixSchemaOutput;
			}
		}) as const,
	listAllTourOptions: (tourId: string) =>
		({
			url: `/tour/${tourId}/option/all`,
			method: "GET",
			_types: {} as {
				body: void;
				query: { skip?: number; limit?: number };
				response: TourOptionModel[];
			}
		}) as const,
	createTourOption: (tourId: string) =>
		({
			url: `/tour/${tourId}/option/create`,
			method: "POST",
			_types: {} as {
				body: TourOptionCreateSchema | null;
				query: void;
				response: TourOptionModel;
			}
		}) as const,
	updateTourOption: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/option/${optionId}`,
			method: "PATCH",
			_types: {} as {
				body: TourOptionUpdateSchema;
				query: void;
				response: TourOptionModel;
			}
		}) as const,
	deleteOption: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/option/${optionId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	uploadOptionCover: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/option/${optionId}/cover`,
			method: "POST",
			_types: {} as {
				body: BodyUploadOptionCoverTourTourIdOptionOptionIdCoverPost;
				query: void;
				response: TourOptionModel;
			}
		}) as const,
	deleteOptionCover: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/option/${optionId}/cover`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
