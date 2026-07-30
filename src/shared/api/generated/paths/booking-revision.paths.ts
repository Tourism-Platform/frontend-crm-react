import type {
	ActivitySingleEvent,
	BusSingleEvent,
	EventEditOpOutput,
	FlightSingleEvent,
	GuideSingleEvent,
	HousingSingleEvent,
	InformationSingleEvent,
	MultiEvent,
	RevisionPreview,
	SupplementarySingleEvent,
	TrainSingleEvent,
	TransferSingleEvent
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
					| InformationSingleEvent
					| BusSingleEvent
					| TrainSingleEvent
					| TransferSingleEvent
					| ActivitySingleEvent
					| HousingSingleEvent
					| FlightSingleEvent
					| GuideSingleEvent
					| SupplementarySingleEvent
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
					| InformationSingleEvent
					| BusSingleEvent
					| TrainSingleEvent
					| TransferSingleEvent
					| ActivitySingleEvent
					| HousingSingleEvent
					| FlightSingleEvent
					| GuideSingleEvent
					| SupplementarySingleEvent
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
		}) as const
} as const;
