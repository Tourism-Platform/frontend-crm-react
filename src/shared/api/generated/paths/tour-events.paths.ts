import type {
	ActivityEvent,
	ActivityMemberNew,
	ActivityOverrideInput,
	ActivitySingleEvent,
	AttachBody,
	BusEvent,
	BusMemberNew,
	BusOverrideInput,
	BusSingleEvent,
	DetachBody,
	EventOptionalSchema,
	EventReorderSchema,
	FlightEvent,
	FlightMemberNew,
	FlightSingleEvent,
	GuideEvent,
	GuideMemberNew,
	GuideSingleEvent,
	HotelOverrideInput,
	HousingEvent,
	HousingMemberNew,
	HousingSingleEvent,
	InformationEvent,
	InformationMemberNew,
	InformationSingleEvent,
	LanguageCode,
	MoveToMultiResult,
	MoveToMultiSchema,
	MoveToSingleResult,
	MultiEvent,
	OptionReorderSchema,
	PublishBlockSchema,
	RelinkBody,
	RouteOverrideInput,
	ScopeBody,
	SupplementaryEvent,
	SupplementaryMemberNew,
	SupplementarySingleEvent,
	SupplierPolicyWarningSchemaOutput,
	TourEventResponse,
	TrainEvent,
	TrainMemberNew,
	TrainSingleEvent,
	TransferEvent,
	TransferMemberNew,
	TransferOverrideInput,
	TransferSingleEvent
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_EVENTS_PATHS = {
	policyCheckOption: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/policy-check`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: SupplierPolicyWarningSchemaOutput[];
			}
		}) as const,
	policyCheckEvent: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/policy-check`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: SupplierPolicyWarningSchemaOutput[];
			}
		}) as const,
	createEvent: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/create`,
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
				query: { read_lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	listTourEvents: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/itinerary`,
			method: "GET",
			_types: {} as {
				body: void;
				query: {
					day?: number | null;
					read_lang?: LanguageCode;
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
				query: { read_lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	deleteTourEvent: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	validateEvent: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/validate`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: PublishBlockSchema[];
			}
		}) as const,
	addPoolMember: (
		tourId: string,
		optionId: string,
		eventId: string,
		eventOptionId: string
	) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/option/${eventOptionId}/pool`,
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
				query: { read_lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	removePoolMember: (
		tourId: string,
		optionId: string,
		eventId: string,
		eventOptionId: string,
		supplyId: string
	) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/option/${eventOptionId}/pool/${supplyId}`,
			method: "DELETE",
			_types: {} as {
				body: void;
				query: { read_lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	setPoolMemberMain: (
		tourId: string,
		optionId: string,
		eventId: string,
		eventOptionId: string,
		supplyId: string
	) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/option/${eventOptionId}/pool/${supplyId}/main`,
			method: "POST",
			_types: {} as {
				body: void;
				query: { read_lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	setPoolMemberOverride: (
		tourId: string,
		optionId: string,
		eventId: string,
		eventOptionId: string,
		supplyId: string
	) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/option/${eventOptionId}/pool/${supplyId}/override`,
			method: "PATCH",
			_types: {} as {
				body:
					| HotelOverrideInput
					| RouteOverrideInput
					| BusOverrideInput
					| TransferOverrideInput
					| ActivityOverrideInput;
				query: { read_lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	clearPoolMemberOverride: (
		tourId: string,
		optionId: string,
		eventId: string,
		eventOptionId: string,
		supplyId: string
	) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/option/${eventOptionId}/pool/${supplyId}/override`,
			method: "DELETE",
			_types: {} as {
				body: void;
				query: { read_lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	attachPoolMemberProduct: (
		tourId: string,
		optionId: string,
		eventId: string,
		eventOptionId: string,
		supplyId: string
	) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/option/${eventOptionId}/pool/${supplyId}/attach`,
			method: "POST",
			_types: {} as {
				body: AttachBody;
				query: { read_lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	relinkPoolMemberProduct: (
		tourId: string,
		optionId: string,
		eventId: string,
		eventOptionId: string,
		supplyId: string
	) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/option/${eventOptionId}/pool/${supplyId}/relink`,
			method: "POST",
			_types: {} as {
				body: RelinkBody;
				query: { read_lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	scopePoolMemberProduct: (
		tourId: string,
		optionId: string,
		eventId: string,
		eventOptionId: string,
		supplyId: string
	) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/option/${eventOptionId}/pool/${supplyId}/scope`,
			method: "PATCH",
			_types: {} as {
				body: ScopeBody;
				query: { read_lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	detachPoolMemberProduct: (
		tourId: string,
		optionId: string,
		eventId: string,
		eventOptionId: string,
		supplyId: string
	) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/option/${eventOptionId}/pool/${supplyId}/detach`,
			method: "POST",
			_types: {} as {
				body: DetachBody;
				query: { read_lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	reorderEvent: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/reorder`,
			method: "POST",
			_types: {} as {
				body: EventReorderSchema;
				query: { read_lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	setEventOptional: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/optional`,
			method: "PATCH",
			_types: {} as {
				body: EventOptionalSchema;
				query: { read_lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	reorderEventOptions: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/reorder-options`,
			method: "POST",
			_types: {} as {
				body: OptionReorderSchema;
				query: { read_lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	addOption: (tourId: string, optionId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/option`,
			method: "POST",
			_types: {} as {
				body:
					| InformationEvent
					| BusEvent
					| TrainEvent
					| TransferEvent
					| ActivityEvent
					| HousingEvent
					| FlightEvent
					| GuideEvent
					| SupplementaryEvent;
				query: { read_lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	updateOption: (
		tourId: string,
		optionId: string,
		eventId: string,
		eventOptionId: string
	) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/option/${eventOptionId}`,
			method: "PATCH",
			_types: {} as {
				body:
					| InformationEvent
					| BusEvent
					| TrainEvent
					| TransferEvent
					| ActivityEvent
					| HousingEvent
					| FlightEvent
					| GuideEvent
					| SupplementaryEvent;
				query: { read_lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	deleteOption: (
		tourId: string,
		optionId: string,
		eventId: string,
		eventOptionId: string
	) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/option/${eventOptionId}`,
			method: "DELETE",
			_types: {} as {
				body: void;
				query: { read_lang?: LanguageCode };
				response: TourEventResponse;
			}
		}) as const,
	moveOptionToSingle: (
		tourId: string,
		optionId: string,
		eventId: string,
		eventOptionId: string
	) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/option/${eventOptionId}/move-to-single`,
			method: "POST",
			_types: {} as {
				body: EventReorderSchema | null;
				query: { read_lang?: LanguageCode };
				response: MoveToSingleResult;
			}
		}) as const,
	moveEventToMulti: (
		tourId: string,
		optionId: string,
		eventId: string,
		targetEventId: string
	) =>
		({
			url: `/tour/${tourId}/${optionId}/event/${eventId}/move-to-multi/${targetEventId}`,
			method: "POST",
			_types: {} as {
				body: MoveToMultiSchema | null;
				query: { read_lang?: LanguageCode };
				response: MoveToMultiResult;
			}
		}) as const
} as const;
