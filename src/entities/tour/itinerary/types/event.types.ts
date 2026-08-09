import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";

import type { TAccommodationEditSchema } from "./accommodation";
import type { TActivityEditSchema } from "./activity";
import type { ENUM_EVENT_TYPE } from "./event-enum.types";
import type { TFlightEditSchema } from "./flight";
import type { TGuideEditSchema } from "./guide";
import type { TInfoEditSchema } from "./info";
import type { TMultiplyOptionEditSchema } from "./multiply-option";
import type { TSupplementEditSchema } from "./supplement";
import type { TTransportationEditSchema } from "./transportation";

export interface ITourEventOption {
	id: string;
	name: string;
	description: string;
	eventType: ENUM_EVENT_TYPE;
	details: Record<string, unknown>;
	/** Preformatted start–end clock range for board cards */
	timeSubtitle?: string;
	// isOptional: boolean;
}

export interface ITourEvent {
	id: string;
	tourOptionId: string | null;
	name: string;
	description: string;
	day: number;
	position: number;
	eventType: ENUM_EVENT_TYPE;
	details: Record<string, unknown>;
	/** Preformatted start–end clock range for board cards */
	timeSubtitle?: string;
	/** Nested alternatives for multiply-option (typ 10) */
	options?: ITourEventOption[];
}

export interface ITourEventCreate {
	name: string;
	description: string;
	day: number;
	position: number;
	eventType: ENUM_EVENT_TYPE;
	details?: Record<string, unknown>;
	supplierId?: string | null;
	packageId?: string | null;
	isOptional?: boolean;
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
	| TSupplementEditSchema
	| TInfoEditSchema
	| TAccommodationEditSchema
	| TActivityEditSchema
	| TGuideEditSchema
	| TMultiplyOptionEditSchema;

export type TTourEventUpdate = Partial<
	| TFlightEditSchema
	| TTransportationEditSchema
	| TSupplementEditSchema
	| TInfoEditSchema
	| TAccommodationEditSchema
	| TActivityEditSchema
	| TGuideEditSchema
	| TMultiplyOptionEditSchema
>;

export interface ITourEventReorder {
	day: number;
	position: number;
}

export interface IEventOptionReorder {
	order: number[];
}

export interface IAddEventOption {
	tourId: string;
	optionId: string;
	eventId: string;
	type: ENUM_EVENT_TYPE;
	data: ITourEventCreate;
	language?: ENUM_LANGUAGES_TYPE;
}

export interface IUpdateEventOption {
	tourId: string;
	optionId: string;
	eventId: string;
	eventOptionId: string;
	type: ENUM_EVENT_TYPE;
	data: TTourEventUpdate;
	language?: ENUM_LANGUAGES_TYPE;
}

/** Same endpoint as updateEventOption, body via mapEventOptionCreateToBackend. */
export interface IUpdateEventOptionContent {
	tourId: string;
	optionId: string;
	eventId: string;
	eventOptionId: string;
	data: ITourEventCreate;
}

export interface IDeleteEventOption {
	tourId: string;
	optionId: string;
	eventId: string;
	eventOptionId: string;
}

export interface IReorderEventOptions {
	tourId: string;
	optionId: string;
	eventId: string;
	data: IEventOptionReorder;
}

export interface IMoveEventToMulti {
	tourId: string;
	optionId: string;
	eventId: string;
	targetEventId: string;
}

export interface IMoveEventOptionToSingle {
	tourId: string;
	optionId: string;
	eventId: string;
	eventOptionId: string;
}

export interface IMoveToMultiResult {
	targetEvent: ITourEvent;
	removedEventId: string;
}

export interface IMoveToSingleResult {
	newEvent: ITourEvent;
	sourceEvent: ITourEvent;
}
