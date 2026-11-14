import { type FC } from "react";
import { useParams } from "react-router";

import { usePreviewOptionPageData } from "@/entities/tour/preview-tour";
import type { IOptionDetail } from "@/entities/tour/preview-tour";

import { useIsDraftPreview, usePreviewCurrency } from "../../model/hooks";

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
	const { currency } = usePreviewCurrency();
	const { optionDetail } = usePreviewOptionPageData({
		tourId,
		optionId,
		isDraft: isDraftPreview,
		currency
	});
	const optionData = optionDataProp ?? optionDetail;

	return (
		<div className="flex w-full flex-col gap-8">
			{optionData?.days?.map((day) => (
				<OptionDaySection key={day.id} day={day} />
			))}
		</div>
	);
};
