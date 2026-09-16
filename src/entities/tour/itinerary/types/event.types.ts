import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";

import type { TAccommodationEditSchema } from "./accommodation";
import type { TActivityEditSchema } from "./activity";
import type { ENUM_EVENT_BACKEND_TYPE } from "./event-backend-enum.types";
import type {
	TEventDetailsBackend,
	TEventDetailsWriteBackend,
	TTourEventBackendResponce
} from "./event-backend.types";
import type { ENUM_EVENT_TYPE } from "./event-enum.types";
import type { TFlightEditSchema } from "./flight";
import type { TGuideEditSchema } from "./guide";
import type { TInfoEditSchema } from "./info";
import type { TMultiplyOptionEditSchema } from "./multiply-option";
import type { TSupplementEditSchema } from "./supplement";
import type { TTransportationEditSchema } from "./transportation";

export interface ITourEventOption {
	/** Event option row id — `details[i].id` on the multi read. */
	id: string;
	name: string;
	description: string;
	eventType: ENUM_EVENT_TYPE;
	/** Exact backend discriminator (flight/train/bus are all FLIGHT in eventType). */
	backendTyp: ENUM_EVENT_BACKEND_TYPE;
	/** READ details (`{ plan, pool }`) — never send back as a WRITE body. */
	details: TEventDetailsBackend;
	/** Preformatted start–end clock range for board cards */
	timeSubtitle?: string;
	isOptional?: boolean;
}

export interface ITourEvent {
	/** Event SLOT id — `TourEventResponse.id`. Used as `eventId` in routes/API. */
	id: string;
	tourOptionId: string | null;
	/**
	 * Event OPTION row id for single events — `event.id` on the read.
	 * Undefined for multi slots (each alternative carries its own id).
	 */
	eventOptionId?: string;
	name: string;
	description: string;
	day: number;
	position: number;
	eventType: ENUM_EVENT_TYPE;
	/** Exact backend discriminator (flight/train/bus are all FLIGHT in eventType). */
	backendTyp: ENUM_EVENT_BACKEND_TYPE;
	/** READ details (`{ plan, pool }`); null for multi slots. */
	details: TEventDetailsBackend | null;
	/** Preformatted start–end clock range for board cards */
	timeSubtitle?: string;
	/** Nested alternatives for multiply-option slots */
	options?: ITourEventOption[];
}

export interface ITourEventCreate {
	name: string;
	description: string;
	day: number;
	position: number;
	eventType: ENUM_EVENT_TYPE;
	/** Exact backend discriminator when eventType is ambiguous (FLIGHT group). */
	backendTyp?: ENUM_EVENT_BACKEND_TYPE;
	/** WRITE details (`{ plan?, pool? }`) — output of a WRITE converter only. */
	details?: TEventDetailsWriteBackend;
	packageId?: string | null;
	isOptional?: boolean;
}

export interface ITourEventUpdate {
	tourId: string;
	optionId: string;
	eventId: string;
	/** Option row id — for single events it is `event.id` from the read. */
	eventOptionId: string;
	type: ENUM_EVENT_TYPE;
	data: TTourEventUpdate;
	/** Язык UI — конвертируется в LanguageCode при save */
	language?: ENUM_LANGUAGES_TYPE;
	/** Current READ details — used to echo pool ids on inline spec save. */
	currentDetails?: TEventDetailsBackend;
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

/** Result of getTourEvent: form values + raw backend READ details for supply/override reads. */
export interface IGetTourEventResult {
	form: TTourEvent;
	/** READ details of the addressed option row (`{ plan, pool }`). */
	details: TEventDetailsBackend | undefined;
	/** Resolved option row id — URL param for multi, `event.id` for single. */
	eventOptionId?: string;
	/** Original slot read — used to remap the form onto another pool member. */
	response: TTourEventBackendResponce;
}

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

/** Option reorder is ID-based: every alternative's option row id in the new order. */
export interface IEventOptionReorder {
	order: string[];
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

/** Content update from a read option row (multiply-option page). */
export interface IUpdateEventOptionContent {
	tourId: string;
	optionId: string;
	eventId: string;
	eventOptionId: string;
	/** READ option row — converted to WRITE inside the service. */
	option: Pick<
		ITourEventOption,
		"name" | "description" | "backendTyp" | "details"
	>;
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
	/** Insert index among the target's alternatives (backend clamps to last). */
	optionPosition: number;
}

export interface IMoveEventOptionToSingle {
	tourId: string;
	optionId: string;
	eventId: string;
	eventOptionId: string;
	/** Final slot placement — sent in the same request, no follow-up reorder. */
	target?: ITourEventReorder | null;
}

export interface IMoveToMultiResult {
	targetEvent: ITourEvent;
	removedEventId: string;
}

export interface IMoveToSingleResult {
	newEvent: ITourEvent;
	sourceEvent: ITourEvent;
}
