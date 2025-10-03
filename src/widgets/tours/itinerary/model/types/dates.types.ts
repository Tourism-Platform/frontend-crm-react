import type { TTourItineraryPageKeys } from "@/shared/config";

export interface IDatesType {
	label: TTourItineraryPageKeys;
	value: ENUM_DATES_TYPE_TYPE;
}

export const ENUM_DATES_TYPE = {
	FIXED_DATES: "fixed_dates",
	RECURRING_DATES: "recurring_dates"
} as const;

export type ENUM_DATES_TYPE_TYPE =
	(typeof ENUM_DATES_TYPE)[keyof typeof ENUM_DATES_TYPE];
