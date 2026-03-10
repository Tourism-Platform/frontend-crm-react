import type {
	ActivityEventSchemaInput,
	EventReorderSchema,
	FlightEventSchemaInput,
	HousingEventSchemaInput,
	InformationEventSchema,
	MultipleOptionEventInput,
	TourEventModel,
	TourEventUpdateSchema,
	TransferEventSchemaInput,
	TransportEventSchemaInput
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
				query: { day?: number | null };
				response: TourEventModel[];
			}
		}) as const,
	createEvent: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event`,
			method: "POST",
			_types: {} as {
				body:
					| InformationEventSchema
					| TransportEventSchemaInput
					| TransferEventSchemaInput
					| ActivityEventSchemaInput
					| HousingEventSchemaInput
					| FlightEventSchemaInput
					| MultipleOptionEventInput;
				query: void;
				response: TourEventModel;
			}
		}) as const,
	getTourEvent: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}`,
			method: "GET",
			_types: {} as { body: void; query: void; response: TourEventModel }
		}) as const,
	updateTourEvent: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}`,
			method: "PATCH",
			_types: {} as {
				body: TourEventUpdateSchema;
				query: void;
				response: TourEventModel;
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
				query: void;
				response: TourEventModel;
			}
		}) as const
} as const;
