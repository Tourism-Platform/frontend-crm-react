import type {
	ActivityEventCreate,
	BusEventCreate,
	EventEditOpOutput,
	FlightEventCreate,
	GuideEventCreate,
	HousingEventCreate,
	InformationEventCreate,
	MultipleOptionEvent,
	RevisionPreview,
	SupplementaryEventCreate,
	TrainEventCreate,
	TransferEventCreate
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
