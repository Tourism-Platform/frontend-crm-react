import type { TOUR_EVENTS_PATHS, TourEventResponse } from "@/shared/api";

export type TTourEventBackendResponce = TourEventResponse;
export type TTourEventUpdateBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.updateTourEvent
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

// EventReorderSchema не сгенерирован в Api.ts — определён локально по контракту эндпоинта
export type TTourEventReorderBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.reorderEvent
>["_types"]["body"];
