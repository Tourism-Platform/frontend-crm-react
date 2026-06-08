import { isBefore, startOfToday } from "date-fns";
import { type ComponentProps, type FC, useMemo } from "react";
import { DayButton } from "react-day-picker";

import { cn } from "@/shared/lib";
import { Calendar, withErrorBoundary } from "@/shared/ui";

import type { IExcludedDate } from "@/entities/tour";

import {
	type ICalendarRange,
	dateToDayTimestamp,
	getCalendarRangeForMonth,
	isSameCalendarDay
} from "../model/lib/calendar-range";

interface IRecurringCalendarInfoProps {
	occurrences: Date[];
	excludedDates: IExcludedDate[];
	onExcludeDate: (day: Date) => void;
	onRestoreDate: (dateId: string) => void;
	onRangeChange: (range: ICalendarRange) => void;
}

type TRecurringDayButtonProps = ComponentProps<typeof DayButton>;

const RecurringCalendarInfoBase: FC<IRecurringCalendarInfoProps> = ({
	occurrences,
	excludedDates,
	onExcludeDate,
	onRestoreDate,
	onRangeChange
}) => {
	const occurrenceTimestamps = useMemo(() => {
		const set = new Set<number>();
		occurrences.forEach((d) => set.add(dateToDayTimestamp(d)));
		return set;
	}, [occurrences]);

	const excludedTimestamps = useMemo(() => {
		const set = new Set<number>();
		excludedDates.forEach((d) => set.add(dateToDayTimestamp(d.value)));
		return set;
	}, [excludedDates]);

	const patternTimestamps = useMemo(() => {
		const set = new Set(occurrenceTimestamps);
		excludedTimestamps.forEach((ts) => set.add(ts));
		return set;
	}, [occurrenceTimestamps, excludedTimestamps]);

	const components = useMemo(
		() => ({
			DayButton: ({
				day,
				modifiers,
				className,
				...props
			}: TRecurringDayButtonProps) => {
				const ts = dateToDayTimestamp(day.date);
				const isRemoved = excludedTimestamps.has(ts);
				const isAvailable = occurrenceTimestamps.has(ts) && !isRemoved;

				return (
					<DayButton
						{...props}
						day={day}
						modifiers={modifiers}
						className={cn(
							className,
							!modifiers.disabled &&
								isAvailable &&
								"bg-primary text-primary-foreground",
							!modifiers.disabled &&
								isRemoved &&
								"bg-destructive text-destructive-foreground"
						)}
					/>
				);
			}
		}),
		[excludedTimestamps, occurrenceTimestamps]
	);

	const handleDayClick = (day: Date) => {
		const ts = dateToDayTimestamp(day);

		if (!patternTimestamps.has(ts)) {
			return;
		}

		const excluded = excludedDates.find((item) =>
			isSameCalendarDay(item.value, day)
		);

		if (excluded) {
			onRestoreDate(excluded.id);
			return;
		}

		if (occurrenceTimestamps.has(ts)) {
			onExcludeDate(day);
		}
	};

	const today = startOfToday();

	return (
		<div>
			<Calendar
				numberOfMonths={3}
				pagedNavigation
				showOutsideDays={false}
				onMonthChange={(month) =>
					onRangeChange(getCalendarRangeForMonth(month))
				}
				onDayClick={handleDayClick}
				disabled={(date) =>
					isBefore(date, today) ||
					!patternTimestamps.has(dateToDayTimestamp(date))
				}
				components={components}
				classNames={{
					months: "sm:flex-col md:flex-row gap-20",
					month: "relative first-of-type:before:hidden before:absolute max-md:before:inset-x-2 max-md:before:h-px max-md:before:-top-4 md:before:inset-y-2 md:before:w-px md:before:-left-4"
				}}
			/>
		</div>
	);
};

export const RecurringCalendarInfo = withErrorBoundary(
	RecurringCalendarInfoBase
);
