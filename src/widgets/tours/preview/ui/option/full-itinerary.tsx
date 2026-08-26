import { type FC } from "react";
import { useParams } from "react-router";

import { usePreviewOptionPageData } from "@/entities/tour/preview-tour";
import type { IOptionDetail } from "@/entities/tour/preview-tour";

import { useIsDraftPreview } from "../../model/hooks";

import { OptionDaySection } from "./option-day-section";

interface IFullItineraryProps {
	optionData?: IOptionDetail;
}

export const FullItinerary: FC<IFullItineraryProps> = ({
	optionData: optionDataProp
}) => {
	const { tourId = "", optionId = "" } = useParams<{
		tourId: string;
		optionId: string;
	}>();
	const isDraftPreview = useIsDraftPreview();
	const { optionDetail } = usePreviewOptionPageData({
		tourId,
		optionId,
		isDraft: isDraftPreview
	});
	const optionData = optionDataProp ?? optionDetail;
	let currentGlobalEventIndex = 0;

	return (
		<div className="flex flex-col w-full">
			{optionData?.days?.map((day) => {
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
