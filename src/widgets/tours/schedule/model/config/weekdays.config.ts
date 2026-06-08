import type { TTourSchedulePageKeys } from "@/shared/config";

export const WEEKDAY_OPTIONS: {
	value: string;
	label: TTourSchedulePageKeys;
}[] = [
	{ value: "0", label: "recurring.weekdays.monday" },
	{ value: "1", label: "recurring.weekdays.tuesday" },
	{ value: "2", label: "recurring.weekdays.wednesday" },
	{ value: "3", label: "recurring.weekdays.thursday" },
	{ value: "4", label: "recurring.weekdays.friday" },
	{ value: "5", label: "recurring.weekdays.saturday" },
	{ value: "6", label: "recurring.weekdays.sunday" }
];
