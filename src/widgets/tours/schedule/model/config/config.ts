import { ENUM_DATES_TYPE, type IDatesType } from "../types";

export const DATES_TYPE_LIST: IDatesType[] = [
	{
		label: "tabs.fixed_dates",
		value: ENUM_DATES_TYPE.FIXED_DATES
	},
	{
		label: "tabs.recurring_dates",
		value: ENUM_DATES_TYPE.RECURRING_DATES
	}
];
