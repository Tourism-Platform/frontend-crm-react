import { type FC } from "react";

import { Calendar } from "@/shared/ui";

interface ICalendarInfoProps {
	date: Date[] | undefined;
	setDate: (date: Date[] | undefined) => void;
}

export const CalendarInfo: FC<ICalendarInfoProps> = ({ date, setDate }) => {
	return (
		<div>
			<Calendar
				mode="multiple"
				selected={date}
				onSelect={setDate}
				numberOfMonths={3}
				pagedNavigation
				showOutsideDays={false}
				// className="rounded-md border p-2"
				classNames={{
					months: "sm:flex-col md:flex-row gap-20",
					month: "relative first-of-type:before:hidden before:absolute max-md:before:inset-x-2 max-md:before:h-px max-md:before:-top-4 md:before:inset-y-2 md:before:w-px  md:before:-left-4"
				}}
			/>
		</div>
	);
};
