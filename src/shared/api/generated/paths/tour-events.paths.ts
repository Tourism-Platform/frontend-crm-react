import type {
	ActivityEventSchemaInput,
	BusEventSchemaInput,
	EventReorderSchema,
	FlightEventSchemaInput,
	HousingEventSchemaInput,
	InformationEventSchema,
	LanguageCode,
	MultipleOptionEventInput,
	TourEventResponse,
	TourEventUpdateSchema,
	TrainEventSchemaInput,
	TransferEventSchemaInput
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_EVENTS_PATHS = {
	listTourEvents: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event`,
			method: "GET",
			_types: {} as {
				body: void;
				query: { day?: number | null; lang?: LanguageCode };
				response: TourEventResponse[];
			}
		}) as const,
	createEvent: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event`,
			method: "POST",
			_types: {} as {
				body:
					| InformationEventSchema
					| BusEventSchemaInput
					| TrainEventSchemaInput
					| TransferEventSchemaInput
					| ActivityEventSchemaInput
					| HousingEventSchemaInput
					| FlightEventSchemaInput
					| MultipleOptionEventInput;
				query: { lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	getTourEvent: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}`,
			method: "GET",
			_types: {} as {
				body: void;
				query: { lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	updateTourEvent: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}`,
			method: "PATCH",
			_types: {} as {
				body: TourEventUpdateSchema;
				query: { lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	deleteTourEvent: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	reorderEvent: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/reorder`,
			method: "POST",
			_types: {} as {
				body: EventReorderSchema;
				query: { lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const
} as const;
