import { type FC } from "react";

import type { IPreviewTourData } from "@/entities/tour/preview-tour";

import { PreviewTourAdditionalInfo } from "./preview-tour-additional-info";
import { PreviewTourAmenities } from "./preview-tour-amenities";
import { PreviewTourCancellation } from "./preview-tour-cancellation";
import { PreviewTourOverview } from "./preview-tour-overview";
import { PreviewTourPickup } from "./preview-tour-pickup";

interface IPreviewTourInformationSectionsProps {
	data?: IPreviewTourData;
}

/**
 * Разделы тура карточками; отмена и доп. информация — парой.
 * Фото — галереей под шапкой страницы (`PreviewTourPhotos` в `PreviewTour` / `PreviewOption`)
 */
export const PreviewTourInformationSections: FC<
	IPreviewTourInformationSectionsProps
> = ({ data }) => {
	if (!data) return null;

	return (
		<div className="flex flex-col gap-6">
			<PreviewTourOverview data={data} />
			<PreviewTourAmenities data={data} />
			<PreviewTourPickup data={data} />
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<PreviewTourCancellation data={data} />
				<PreviewTourAdditionalInfo data={data} />
			</div>
		</div>
	);
};
