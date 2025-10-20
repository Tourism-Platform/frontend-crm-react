import type { TTourEventFlightEditPageKeys } from "@/shared/config";

export const ENUM_INDIVIDUAL_TABS = {
	FLAT_RATE: "FLAT_RATE",
	PER_PERSON: "PER_PERSON"
} as const;

export type ENUM_INDIVIDUAL_TABS_TYPE =
	(typeof ENUM_INDIVIDUAL_TABS)[keyof typeof ENUM_INDIVIDUAL_TABS];

export interface IIndividualTabs {
	label: TTourEventFlightEditPageKeys;
	type: ENUM_INDIVIDUAL_TABS_TYPE;
}
