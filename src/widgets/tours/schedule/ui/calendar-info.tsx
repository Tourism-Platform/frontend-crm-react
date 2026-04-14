import { type FC, useMemo } from "react";

import { Calendar, withErrorBoundary } from "@/shared/ui";

import type { IFixedDate } from "@/entities/tour";
import {
	useAddFixedDateMutation,
	useRemoveFixedDateMutation
} from "@/entities/tour";

interface ICalendarInfoProps {
	tourId: string;
	fixedDates: IFixedDate[];
}

const CalendarInfoBase: FC<ICalendarInfoProps> = ({ tourId, fixedDates }) => {
	const [addFixedDate] = useAddFixedDateMutation();
	const [removeFixedDate] = useRemoveFixedDateMutation();

	const dateArray = useMemo(() => {
		return fixedDates.map((fd) => fd.value);
	}, [fixedDates]);

	const handleSelect = (newDates: Date[] | undefined) => {
		if (!newDates) return;
		const prevTimestamps = dateArray.map((d) => d.getTime());
		const newTimestamps = newDates.map((d) => d.getTime());

		const addedDates = newDates.filter(
			(d) => !prevTimestamps.includes(d.getTime())
		);
		const removedDates = dateArray.filter(
			(d) => !newTimestamps.includes(d.getTime())
		);

		addedDates.forEach((d) => {
			addFixedDate({
				tourId,
				data: { value: d }
			});
		});

		removedDates.forEach((d) => {
			const fd = fixedDates.find(
				(f) => f.value.getTime() === d.getTime()
			);
			if (fd) {
				removeFixedDate({ tourId, dateId: fd.id });
			}
		});
	};

	return (
		<div>
			<Calendar
				mode="multiple"
				selected={dateArray}
				onSelect={handleSelect}
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
