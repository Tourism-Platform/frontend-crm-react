import type {
	ActivityEventCreate,
	ActivityEventInput,
	BusEventCreate,
	BusEventInput,
	EventReorderSchema,
	FlightEventCreate,
	FlightEventInput,
	GuideEventCreate,
	GuideEventInput,
	HousingEventCreate,
	HousingEventInput,
	InformationEventCreate,
	InformationEventInput,
	LanguageCode,
	MoveToMultiResult,
	MoveToMultiSchema,
	MoveToSingleResult,
	MultipleOptionEvent,
	OptionReorderSchema,
	SupplementaryEventCreate,
	SupplementaryEventInput,
	TourEventResponse,
	TrainEventCreate,
	TrainEventInput,
	TransferEventCreate,
	TransferEventInput
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_EVENTS_PATHS = {
	createEvent: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/create`,
			method: "POST",
			_types: {} as {
				body:
					| InformationEventCreate
					| BusEventCreate
					| TrainEventCreate
					| TransferEventCreate
					| ActivityEventCreate
					| HousingEventCreate
					| FlightEventCreate
					| GuideEventCreate
					| SupplementaryEventCreate
					| MultipleOptionEvent;
				query: { lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
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
				response: TourEventResponse[];
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
		}) as const,
	updateSingleEvent: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/single/${eventId}/update`,
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
					| SupplementaryEventInput;
				query: { lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	moveEventToMulti: (
		tourId: string,
		optionId: string,
		eventId: string,
		targetEventId: string
	) =>
		({
			url: `/tour/${tourId}/${optionId}/event/single/${eventId}/move-to-multi/${targetEventId}`,
			method: "POST",
			_types: {} as {
				body: MoveToMultiSchema | null;
				query: { lang?: LanguageCode };
				response: MoveToMultiResult;
			}
		}) as const,
	reorderEventOptions: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/multi/${eventId}/reorder-options`,
			method: "POST",
			_types: {} as {
				body: OptionReorderSchema;
				query: { lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	addEventOption: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/multi/${eventId}/add-option`,
			method: "POST",
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
					| SupplementaryEventInput;
				query: { lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	updateEventOption: (
		tourId: string,
		optionId: string,
		eventId: string,
		eventOptionId: string
	) =>
		({
			url: `/tour/${tourId}/${optionId}/event/multi/${eventId}/update-option/${eventOptionId}`,
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
					| SupplementaryEventInput;
				query: { lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	deleteEventOption: (
		tourId: string,
		optionId: string,
		eventId: string,
		eventOptionId: string
	) =>
		({
			url: `/tour/${tourId}/${optionId}/event/multi/${eventId}/remove-option/${eventOptionId}`,
			method: "DELETE",
			_types: {} as {
				body: void;
				query: { lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	moveEventOptionToSingle: (
		tourId: string,
		optionId: string,
		eventId: string,
		eventOptionId: string
	) =>
		({
			url: `/tour/${tourId}/${optionId}/event/multi/${eventId}/move-to-single/${eventOptionId}`,
			method: "POST",
			_types: {} as {
				body: EventReorderSchema | null;
				query: { lang?: LanguageCode };
				response: MoveToSingleResult;
			}
		}) as const
} as const;
