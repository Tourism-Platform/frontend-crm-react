import type {
	ActivityOverrideSchemaInput,
	ActivitySingleEventInput,
	BusOverrideSchemaInput,
	BusSingleEventInput,
	EventEditOpOutput,
	EventProductLinkSchema,
	FlightOverrideSchemaInput,
	FlightSingleEventInput,
	GuideSingleEventInput,
	HousingOverrideSchemaInput,
	HousingSingleEventInput,
	InformationSingleEventInput,
	MultiEvent,
	RevisionPreview,
	SupplementarySingleEventInput,
	TrainOverrideSchemaInput,
	TrainSingleEventInput,
	TransferOverrideSchemaInput,
	TransferSingleEventInput
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const BOOKING_REVISION_PATHS = {
	addEvent: (bookingId: string) =>
		({
			url: `/booking/revision/${bookingId}/event`,
			method: "POST",
			_types: {} as {
				body:
					| InformationSingleEventInput
					| BusSingleEventInput
					| TrainSingleEventInput
					| TransferSingleEventInput
					| ActivitySingleEventInput
					| HousingSingleEventInput
					| FlightSingleEventInput
					| GuideSingleEventInput
					| SupplementarySingleEventInput
					| MultiEvent;
				query: void;
				response: RevisionPreview;
			}
		}) as const,
	updateEvent: (bookingId: string, eventId: string) =>
		({
			url: `/booking/revision/${bookingId}/event/${eventId}`,
			method: "PATCH",
			_types: {} as {
				body:
					| InformationSingleEventInput
					| BusSingleEventInput
					| TrainSingleEventInput
					| TransferSingleEventInput
					| ActivitySingleEventInput
					| HousingSingleEventInput
					| FlightSingleEventInput
					| GuideSingleEventInput
					| SupplementarySingleEventInput
					| MultiEvent;
				query: void;
				response: RevisionPreview;
			}
		}) as const,
	removeEvent: (bookingId: string, eventId: string) =>
		({
			url: `/booking/revision/${bookingId}/event/${eventId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: RevisionPreview }
		}) as const,
	setEventProduct: (bookingId: string, eventId: string) =>
		({
			url: `/booking/revision/${bookingId}/event/${eventId}/product`,
			method: "PATCH",
			_types: {} as {
				body: EventProductLinkSchema;
				query: { option_index?: number | null };
				response: RevisionPreview;
			}
		}) as const,
	clearEventProduct: (bookingId: string, eventId: string) =>
		({
			url: `/booking/revision/${bookingId}/event/${eventId}/product`,
			method: "DELETE",
			_types: {} as {
				body: void;
				query: { option_index?: number | null };
				response: RevisionPreview;
			}
		}) as const,
	listEdits: (bookingId: string) =>
		({
			url: `/booking/revision/${bookingId}/edits`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: EventEditOpOutput[];
			}
		}) as const,
	preview: (bookingId: string) =>
		({
			url: `/booking/revision/${bookingId}/preview`,
			method: "GET",
			_types: {} as { body: void; query: void; response: RevisionPreview }
		}) as const,
	setEventOverride: (bookingId: string, eventId: string) =>
		({
			url: `/booking/revision/${bookingId}/event/${eventId}/override`,
			method: "PATCH",
			_types: {} as {
				body:
					| HousingOverrideSchemaInput
					| TrainOverrideSchemaInput
					| FlightOverrideSchemaInput
					| BusOverrideSchemaInput
					| TransferOverrideSchemaInput
					| ActivityOverrideSchemaInput;
				query: { option_index?: number | null };
				response: RevisionPreview;
			}
		}) as const,
	clearEventOverride: (bookingId: string, eventId: string) =>
		({
			url: `/booking/revision/${bookingId}/event/${eventId}/override`,
			method: "DELETE",
			_types: {} as {
				body: void;
				query: { option_index?: number | null };
				response: RevisionPreview;
			}
		}) as const
} as const;
