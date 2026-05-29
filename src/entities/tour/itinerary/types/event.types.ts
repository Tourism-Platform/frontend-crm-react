import type { ENUM_EVENT_TYPE } from "./event-enum.types";
import type { TTransportationEditSchema } from "./transportation";

export interface ITourEvent {
	id: string;
	tourOptionId: string | null;
	name: string;
	description: string;
	day: number;
	position: number;
	eventType: ENUM_EVENT_TYPE;
	details: Record<string, unknown>;
}
export interface ITourEventCreate {
	name: string;
	description: string;
	day: number;
	position: number;
	eventType: ENUM_EVENT_TYPE;
	details?: Record<string, unknown>;
}

export interface ITourEventUpdate {
	tourId: string;
	optionId: string;
	eventId: string;
	type: ENUM_EVENT_TYPE;
	data: TTourEventUpdate;
}
export type TTourEvent = TTransportationEditSchema;
export type TTourEventUpdate = Partial<TTransportationEditSchema>;

export interface ITourEventReorder {
	day: number;
	position: number;
}
