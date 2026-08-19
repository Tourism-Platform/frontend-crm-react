import type {
	EmptyDetails,
	MultiEventReadOutput,
	TOUR_EVENTS_PATHS,
	TimeSchema,
	TourEventResponse
} from "@/shared/api";

export type TTourEventBackendResponce = TourEventResponse;

export type TTimeSchemaBackend = TimeSchema;
export type TEmptyDetailsBackend = EmptyDetails;
export type TMultiEventReadBackend = MultiEventReadOutput;
export type TMultiEventDetailBackend = NonNullable<
	TMultiEventReadBackend["details"]
>[number];

export type TTourEventUpdateBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.updateSingleEvent
>["_types"]["body"];

export type TTourEventCreateBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.createEvent
>["_types"]["body"];

export interface ITourEventCreateBackend {
	name: string;
	description: string;
	day: number;
	position: number;
	typ: string;
	details: Record<string, unknown>;
}

export type TTourEventReorderBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.reorderEvent
>["_types"]["body"];

export type TEventOptionBodyBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.addEventOption
>["_types"]["body"];

export type TEventOptionReorderBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.reorderEventOptions
>["_types"]["body"];

export type TMoveToMultiResultBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.moveEventToMulti
>["_types"]["response"];

export type TMoveToSingleResultBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.moveEventOptionToSingle
>["_types"]["response"];
