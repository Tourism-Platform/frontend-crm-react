import {
	addMonths,
	endOfMonth,
	format,
	startOfMonth,
	startOfToday
} from "date-fns";

export interface ICalendarRange {
	from: string;
	to: string;
	month: Date;
}

export const getDefaultCalendarRange = (
	month: Date = startOfToday()
): ICalendarRange => {
	const from = startOfMonth(month);
	const to = endOfMonth(addMonths(month, 2));

	return {
		from: format(from, "yyyy-MM-dd"),
		to: format(to, "yyyy-MM-dd"),
		month
	};
};

export const getCalendarRangeForMonth = (month: Date): ICalendarRange =>
	getDefaultCalendarRange(month);

export const isSameCalendarDay = (a: Date, b: Date): boolean =>
	a.getFullYear() === b.getFullYear() &&
	a.getMonth() === b.getMonth() &&
	a.getDate() === b.getDate();

export const dateToDayTimestamp = (date: Date): number =>
	new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

export const areCalendarDatesEqual = (a?: Date, b?: Date | null): boolean => {
	if (!a && !b) return true;
	if (!a || !b) return false;
	return dateToDayTimestamp(a) === dateToDayTimestamp(b);
};
