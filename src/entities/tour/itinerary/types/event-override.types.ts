import type { ENUM_LANGUAGES_TYPE } from "@/shared/config/languages";

import type { ENUM_EVENT_BACKEND_TYPE } from "./event-backend-enum.types";
import type { TOverrideProductFormValues } from "./event-override-form.types";

/**
 * Override mutation params (contract 6). `data` carries the override dialog
 * form values — the service converts them into the generated PATCH body
 * union via `mapEventOverrideToBackend`, like every other mutation here.
 * Override lives on a pool member's product supply (`pool[i].supply.override`).
 */
export interface ISetOptionOverride {
	tourId: string;
	optionId: string;
	eventId: string;
	/** Option row id — for single events it is `event.id` from the read. */
	eventOptionId: string;
	/** Pool member id — `details.pool[i].id`. */
	supplyId: string;
	eventTyp: ENUM_EVENT_BACKEND_TYPE;
	data: TOverrideProductFormValues;
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
