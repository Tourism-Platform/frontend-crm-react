import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";

import type { TAccommodationEditSchema } from "./accommodation";
import type { TActivityEditSchema } from "./activity";
import type { ENUM_EVENT_TYPE } from "./event-enum.types";
import type { TFlightEditSchema } from "./flight";
import type { TInfoEditSchema } from "./info";
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
	/** Язык UI — конвертируется в LanguageCode при save */
	language?: ENUM_LANGUAGES_TYPE;
}
export type TTourEvent =
	| TFlightEditSchema
	| TTransportationEditSchema
	| TInfoEditSchema
	| TAccommodationEditSchema
	| TActivityEditSchema;

export type TTourEventUpdate = Partial<
	| TFlightEditSchema
	| TTransportationEditSchema
	| TInfoEditSchema
	| TAccommodationEditSchema
	| TActivityEditSchema
>;

export interface ITourEventReorder {
	day: number;
	position: number;
}
