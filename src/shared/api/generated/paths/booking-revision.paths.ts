import type {
	ActivityMemberNew,
	ActivityOverrideInput,
	ActivitySingleEvent,
	BusMemberNew,
	BusOverrideInput,
	BusSingleEvent,
	EventEditOpOutput,
	FlightMemberNew,
	FlightSingleEvent,
	GuideMemberNew,
	GuideSingleEvent,
	HotelOverrideInput,
	HousingMemberNew,
	HousingSingleEvent,
	InformationMemberNew,
	InformationSingleEvent,
	MultiEvent,
	ProductSupplyNew,
	RevisionPreview,
	RouteOverrideInput,
	SupplementaryMemberNew,
	SupplementarySingleEvent,
	TrainMemberNew,
	TrainSingleEvent,
	TransferMemberNew,
	TransferOverrideInput,
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
	addPoolMember: (bookingId: string, eventId: string) =>
		({
			url: `/booking/revision/${bookingId}/event/${eventId}/pool`,
			method: "POST",
			_types: {} as {
				body:
					| HousingMemberNew
					| TrainMemberNew
					| FlightMemberNew
					| BusMemberNew
					| TransferMemberNew
					| ActivityMemberNew
					| InformationMemberNew
					| GuideMemberNew
					| SupplementaryMemberNew;
				query: {
					event_option_id?: string | null;
					option_index?: number | null;
				};
				response: RevisionPreview;
			}
		}) as const,
	removePoolMember: (bookingId: string, eventId: string, supplyId: string) =>
		({
			url: `/booking/revision/${bookingId}/event/${eventId}/pool/${supplyId}`,
			method: "DELETE",
			_types: {} as {
				body: void;
				query: {
					event_option_id?: string | null;
					option_index?: number | null;
				};
				response: RevisionPreview;
			}
		}) as const,
	setPoolMemberProduct: (
		bookingId: string,
		eventId: string,
		supplyId: string
	) =>
		({
			url: `/booking/revision/${bookingId}/event/${eventId}/pool/${supplyId}/product`,
			method: "PATCH",
			_types: {} as {
				body: ProductSupplyNew;
				query: {
					event_option_id?: string | null;
					option_index?: number | null;
				};
				response: RevisionPreview;
			}
		}) as const,
	clearPoolMemberProduct: (
		bookingId: string,
		eventId: string,
		supplyId: string
	) =>
		({
			url: `/booking/revision/${bookingId}/event/${eventId}/pool/${supplyId}/product`,
			method: "DELETE",
			_types: {} as {
				body: void;
				query: {
					event_option_id?: string | null;
					option_index?: number | null;
				};
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
	setPoolMemberOverride: (
		bookingId: string,
		eventId: string,
		supplyId: string
	) =>
		({
			url: `/booking/revision/${bookingId}/event/${eventId}/pool/${supplyId}/override`,
			method: "PATCH",
			_types: {} as {
				body:
					| HotelOverrideInput
					| RouteOverrideInput
					| BusOverrideInput
					| TransferOverrideInput
					| ActivityOverrideInput;
				query: {
					event_option_id?: string | null;
					option_index?: number | null;
				};
				response: RevisionPreview;
			}
		}) as const,
	clearPoolMemberOverride: (
		bookingId: string,
		eventId: string,
		supplyId: string
	) =>
		({
			url: `/booking/revision/${bookingId}/event/${eventId}/pool/${supplyId}/override`,
			method: "DELETE",
			_types: {} as {
				body: void;
				query: {
					event_option_id?: string | null;
					option_index?: number | null;
				};
				response: RevisionPreview;
			}
		}) as const
} as const;
