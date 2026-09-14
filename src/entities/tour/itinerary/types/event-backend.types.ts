import type {
	ActivityDetailsOutput,
	ActivityDetailsWrite,
	AttachBody,
	BusDetailsOutput,
	BusDetailsWrite,
	DetachBody,
	FlightDetailsOutput,
	FlightDetailsWrite,
	GuideDetailsOutput,
	GuideDetailsWrite,
	HousingDetailsOutput,
	HousingDetailsWrite,
	InformationDetailsOutput,
	InformationDetailsWrite,
	MultiEventReadOutput,
	RelinkBody,
	ScopeBody,
	SupplementaryDetailsOutput,
	SupplementaryDetailsWrite,
	TOUR_EVENTS_PATHS,
	TimeSchema,
	Times,
	TourEventResponse,
	TrainDetailsOutput,
	TrainDetailsWrite,
	TransferDetailsOutput,
	TransferDetailsWrite
} from "@/shared/api";

export type TTourEventBackendResponce = TourEventResponse;

export type TTimeSchemaBackend = TimeSchema;

export type TTimesBackend = Times;

export type TInformationDetailsWriteBackend = InformationDetailsWrite;

export type TMultiEventReadBackend = MultiEventReadOutput;

/** One alternative of a multi (typ "options") event on read. */
export type TMultiEventDetailBackend =
	TMultiEventReadBackend["details"][number];

/** The single-event payload on read (event slot payload with its option row id). */
export type TSingleEventReadBackend = Extract<
	TTourEventBackendResponce["event"],
	{ id: string }
>;

/**
 * READ details union — `details` of a single event or of one alternative.
 * Shape: `{ plan, supply, spec }` — never send this back as a WRITE body.
 */
export type TEventDetailsBackend =
	| HousingDetailsOutput
	| TrainDetailsOutput
	| FlightDetailsOutput
	| BusDetailsOutput
	| TransferDetailsOutput
	| ActivityDetailsOutput
	| GuideDetailsOutput
	| InformationDetailsOutput
	| SupplementaryDetailsOutput;

/**
 * WRITE details union — `details` accepted by create/update option bodies.
 * Shape: `{ plan?, supply? }` — built only by WRITE converters.
 */
export type TEventDetailsWriteBackend =
	| HousingDetailsWrite
	| TrainDetailsWrite
	| FlightDetailsWrite
	| BusDetailsWrite
	| TransferDetailsWrite
	| ActivityDetailsWrite
	| GuideDetailsWrite
	| InformationDetailsWrite
	| SupplementaryDetailsWrite;

/** Unified option update body (single and multi alike). */
export type TTourEventUpdateBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.updateOption
>["_types"]["body"];

export type TTourEventCreateBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.createEvent
>["_types"]["body"];

export type TTourEventReorderBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.reorderEvent
>["_types"]["body"];

export type TEventOptionBodyBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.addOption
>["_types"]["body"];

export type TEventOptionReorderBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.reorderEventOptions
>["_types"]["body"];

export type TMoveToMultiResultBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.moveEventToMulti
>["_types"]["response"];

export type TMoveToMultiBodyBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.moveEventToMulti
>["_types"]["body"];

export type TMoveToSingleResultBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.moveOptionToSingle
>["_types"]["response"];

export type TEventProductLinkBackend = AttachBody;

export type TEventProductDetachBackend = DetachBody;

export type TEventProductRelinkBackend = RelinkBody;

/** `scopeOptionProduct` endpoint body: `{ scope, drop_stray_overrides? }`. */
export type TEventProductScopeBodyBackend = ScopeBody;

/** The scope value itself: `{ typ: "all" } | { typ: "only", ids: string[] }`. */
export type TEventProductScopeBackend = NonNullable<AttachBody["scope"]>;

export type TEventProductReadLangQueryBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.attachOptionProduct
>["_types"]["query"];
