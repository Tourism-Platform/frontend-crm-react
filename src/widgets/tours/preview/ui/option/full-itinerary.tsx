import { type FC } from "react";

import { OptionDaySection } from "./option-day-section";

interface IFullItineraryProps {
	optionData: any;
}

export const FullItinerary: FC<IFullItineraryProps> = ({ optionData }) => {
	let currentGlobalEventIndex = 0;

	return (
		<div className="flex flex-col w-full">
			{optionData?.days?.map((day: any) => {
				const sectionIndex = currentGlobalEventIndex;
				currentGlobalEventIndex += day.events.length;

				return (
					<OptionDaySection
						key={day.id}
						day={day}
						globalEventIndex={sectionIndex}
					/>
				);
			})}
		</div>
	);
};
