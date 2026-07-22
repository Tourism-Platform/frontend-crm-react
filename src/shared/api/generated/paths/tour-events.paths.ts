import type {
	ActivityEventCreateSchemaInput,
	ActivityEventInput,
	BusEventCreateSchemaInput,
	BusEventInput,
	EventReorderSchema,
	FlightEventCreateSchemaInput,
	FlightEventInput,
	GuideEventCreateSchemaInput,
	GuideEventInput,
	HousingEventCreateSchemaInput,
	HousingEventInput,
	InformationEventCreateSchemaInput,
	InformationEventInput,
	LanguageCode,
	MultipleOptionEventInput,
	OptionReorderSchema,
	SupplementaryEventCreateSchemaInput,
	SupplementaryEventInput,
	TourEventResponseOutput,
	TrainEventCreateSchemaInput,
	TrainEventInput,
	TransferEventCreateSchemaInput,
	TransferEventInput
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
				query: {
					day?: number | null;
					lang?: LanguageCode;
					skip?: number;
					limit?: number | null;
				};
				response: TourEventResponseOutput[];
			}
		}) as const,
	createEvent: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event`,
			method: "POST",
			_types: {} as {
				body:
					| InformationEventCreateSchemaInput
					| BusEventCreateSchemaInput
					| TrainEventCreateSchemaInput
					| TransferEventCreateSchemaInput
					| ActivityEventCreateSchemaInput
					| HousingEventCreateSchemaInput
					| FlightEventCreateSchemaInput
					| GuideEventCreateSchemaInput
					| SupplementaryEventCreateSchemaInput
					| MultipleOptionEventInput;
				query: { lang?: LanguageCode };
				response: TourEventResponseOutput;
			}
		}) as const,
	getTourEvent: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}`,
			method: "GET",
			_types: {} as {
				body: void;
				query: { lang?: LanguageCode };
				response: TourEventResponseOutput;
			}
		}) as const,
	updateTourEvent: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}`,
			method: "PATCH",
			_types: {} as {
				body:
					| InformationEventInput
					| BusEventInput
					| TrainEventInput
					| TransferEventInput
					| ActivityEventInput
					| HousingEventInput
					| FlightEventInput
					| GuideEventInput
					| SupplementaryEventInput
					| MultipleOptionEventInput;
				query: { lang?: LanguageCode };
				response: TourEventResponseOutput;
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
				response: TourEventResponseOutput;
			}
		}) as const,
	reorderEventOptions: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/option/reorder`,
			method: "POST",
			_types: {} as {
				body: OptionReorderSchema;
				query: { lang?: LanguageCode };
				response: TourEventResponseOutput;
			}
		}) as const
} as const;
