import type {
	DurationChargeInput,
	FixedChargeInput,
	PerPersonChargeInput,
	StaySeasonInput
} from "@/shared/api";
import type { ENUM_LANGUAGES_TYPE } from "@/shared/config/languages";

import type { IHotelPolicy } from "./accommodation";

/**
 * Override domain model (contract 6). Override lives on a pool member's
 * product supply (`pool[i].supply.override`).
 *
 * Overrides reprice the LINKED product's scoped units. The override dialog
 * edits a single whole-arm charge (flat / per-duration / per-person) plus the
 * hotel policy — per-room/per-fare rate rows are a backend capability the
 * current UI does not edit.
 */

export type TEventOverrideCharge =
	| ({ typ: "fixed" } & FixedChargeInput)
	| ({ typ: "per_duration" } & DurationChargeInput)
	| ({ typ: "per_person" } & PerPersonChargeInput);

export interface IHousingEventOverride {
	typ: "housing";
	/** Whole-arm stay rate — base charge; seasons are not edited by the dialog. */
	rate: { base: TEventOverrideCharge; seasons?: StaySeasonInput[] } | null;
	policy: IHotelPolicy | null;
}

export type TRouteOverrideCharge =
	| ({ typ: "fixed" } & FixedChargeInput)
	| ({ typ: "per_person" } & PerPersonChargeInput);

export interface ITrainEventOverride {
	typ: "train";
	/** Whole-arm route charge. */
	charge: TRouteOverrideCharge | null;
}

export type TEventOverride = IHousingEventOverride | ITrainEventOverride;

export interface ISetOptionOverride {
	tourId: string;
	optionId: string;
	eventId: string;
	/** Option row id — for single events it is `event.id` from the read. */
	eventOptionId: string;
	/** Pool member id — `details.pool[i].id`. */
	supplyId: string;
	data: TEventOverride;
	language?: ENUM_LANGUAGES_TYPE;
}

export interface IClearOptionOverride {
	tourId: string;
	optionId: string;
	eventId: string;
	/** Option row id — for single events it is `event.id` from the read. */
	eventOptionId: string;
	/** Pool member id — `details.pool[i].id`. */
	supplyId: string;
	language?: ENUM_LANGUAGES_TYPE;
}
