import { parseLocalDateString } from "@/shared/lib";

import type { IRecurrenceRule } from "@/entities/tour";

import { dateToDayTimestamp } from "./calendar-range";

const toWeekdayIndex = (date: Date): number => (date.getDay() + 6) % 7;

export const expandRecurrenceOccurrences = (
	weekdays: number[],
	windowFrom: string,
	windowUntil: string,
	validFrom?: Date,
	validUntil?: Date
): Date[] => {
	if (weekdays.length === 0) return [];

	const rangeStart = dateToDayTimestamp(parseLocalDateString(windowFrom));
	const rangeEnd = dateToDayTimestamp(parseLocalDateString(windowUntil));

	const startTs = validFrom
		? Math.max(rangeStart, dateToDayTimestamp(validFrom))
		: rangeStart;
	const endTs = validUntil
		? Math.min(rangeEnd, dateToDayTimestamp(validUntil))
		: rangeEnd;

	if (startTs > endTs) return [];

	const result: Date[] = [];
	const cursor = new Date(startTs);

	while (dateToDayTimestamp(cursor) <= endTs) {
		if (weekdays.includes(toWeekdayIndex(cursor))) {
			result.push(
				new Date(
					cursor.getFullYear(),
					cursor.getMonth(),
					cursor.getDate()
				)
			);
		}

		cursor.setDate(cursor.getDate() + 1);
	}

	return result;
};

export const expandRecurrenceFromRules = (
	recurrenceRules: IRecurrenceRule[],
	windowFrom: string,
	windowUntil: string
): Date[] => {
	const days = recurrenceRules
		.map((rule) => rule.day)
		.filter((day): day is number => day !== null && day !== undefined);

	if (days.length === 0) return [];

	const uniqueDays = [...new Set(days)];
	const first = recurrenceRules[0];

	return expandRecurrenceOccurrences(
		uniqueDays,
		windowFrom,
		windowUntil,
		first?.validFrom ?? undefined,
		first?.validUntil ?? undefined
	);
};
