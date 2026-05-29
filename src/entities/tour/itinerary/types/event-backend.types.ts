import type {
	TOUR_EVENTS_PATHS,
	TourEventResponse,
	TourEventUpdateSchema,
	TransferEventSchemaInput
} from "@/shared/api";

export type TTourEventBackendResponce = TourEventResponse;
export type TTourEventUpdateBackend = TourEventUpdateSchema;

export type TTourEventCreateBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.createEvent
>["_types"]["body"];

export type TTourTransportationBackend = Extract<
	TTourEventCreateBackend,
	TransferEventSchemaInput
>;

export interface ITourEventCreateBackend {
	name: string;
	description: string;
	day: number;
	position: number;
	typ: string;
	details: Record<string, unknown>;
}

// EventReorderSchema не сгенерирован в Api.ts — определён локально по контракту эндпоинта
export type TTourEventReorderBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.reorderEvent
>["_types"]["body"];
