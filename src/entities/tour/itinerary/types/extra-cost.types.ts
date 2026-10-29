import {
	DEFAULT_EVENT_CURRENCY,
	type ENUM_CURRENCY_OPTIONS_TYPE
} from "@/entities/commission";

import type { TExtraCostInputBackend } from "./extra-cost-backend.types";

export const ENUM_EXTRA_COST_FIELD = {
	NAME: "name",
	MODE: "mode",
	COST: "cost",
	CURRENCY: "currency",
	RAW: "raw"
} as const;

export type ENUM_EXTRA_COST_FIELD_TYPE =
	(typeof ENUM_EXTRA_COST_FIELD)[keyof typeof ENUM_EXTRA_COST_FIELD];

/** `ExtraCost.expense` shapes the form edits; `per_group` is kept as `raw`. */
export const ENUM_EXTRA_COST_MODE = {
	TRIP: "trip",
	PER_DAY: "per_day",
	PER_PERSON: "per_person",
	PER_PERSON_DAY: "per_person_day"
} as const;

export type ENUM_EXTRA_COST_MODE_TYPE =
	(typeof ENUM_EXTRA_COST_MODE)[keyof typeof ENUM_EXTRA_COST_MODE];

export interface IExtraCostFormRow {
	[ENUM_EXTRA_COST_FIELD.NAME]: string | null;
	[ENUM_EXTRA_COST_FIELD.MODE]: ENUM_EXTRA_COST_MODE_TYPE;
	[ENUM_EXTRA_COST_FIELD.COST]: number | null;
	[ENUM_EXTRA_COST_FIELD.CURRENCY]: ENUM_CURRENCY_OPTIONS_TYPE | null;
	/** A line the form cannot edit, written back as read. */
	[ENUM_EXTRA_COST_FIELD.RAW]: TExtraCostInputBackend | null;
}

export const createEmptyExtraCostRow = (): IExtraCostFormRow => ({
	[ENUM_EXTRA_COST_FIELD.NAME]: null,
	[ENUM_EXTRA_COST_FIELD.MODE]: ENUM_EXTRA_COST_MODE.PER_DAY,
	[ENUM_EXTRA_COST_FIELD.COST]: null,
	[ENUM_EXTRA_COST_FIELD.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_EXTRA_COST_FIELD.RAW]: null
});
