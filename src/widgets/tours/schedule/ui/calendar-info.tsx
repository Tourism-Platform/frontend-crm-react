import { startOfToday } from "date-fns";
import { type FC, useMemo } from "react";

import { Calendar, withErrorBoundary } from "@/shared/ui";

import type { IFixedDate } from "@/entities/tour";

interface ICalendarInfoProps {
	fixedDates: IFixedDate[];
	onSelect: (dates: Date[] | undefined) => void;
}

const CalendarInfoBase: FC<ICalendarInfoProps> = ({ fixedDates, onSelect }) => {
	const today = startOfToday();

	const dateArray = useMemo(
		() => fixedDates.map((fd) => fd.value),
		[fixedDates]
	);

	return (
		<div>
			<Calendar
				mode="multiple"
				selected={dateArray}
				onSelect={onSelect}
				disabled={{ before: today }}
				numberOfMonths={3}
				pagedNavigation
				showOutsideDays={false}
				classNames={{
					months: "sm:flex-col md:flex-row gap-20",
					month: "relative first-of-type:before:hidden before:absolute max-md:before:inset-x-2 max-md:before:h-px max-md:before:-top-4 md:before:inset-y-2 md:before:w-px  md:before:-left-4"
				}}
			/>
		</div>
	);
};

export const CalendarInfo = withErrorBoundary(CalendarInfoBase);
