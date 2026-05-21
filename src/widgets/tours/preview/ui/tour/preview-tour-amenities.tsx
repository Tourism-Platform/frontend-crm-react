import { Check, X } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	AMENITIES_INCLUDED_LABELS,
	AMENITIES_NOT_INCLUDED_LABELS,
	type IPreviewTourData
} from "@/entities/tour";

interface IPreviewTourAmenitiesProps {
	data: IPreviewTourData;
}

const PreviewTourAmenitiesBase: FC<IPreviewTourAmenitiesProps> = ({ data }) => {
	const { t } = useTranslation("preview_tour_page");

	const allAmenitiesMap = {
		...AMENITIES_NOT_INCLUDED_LABELS,
		...AMENITIES_INCLUDED_LABELS
	};

	const allLabels = useValueToTranslateLabel(allAmenitiesMap);

	const getLabel = (
		value: string,
		labels: { value: string; label: string }[]
	) => labels.find((l) => l.value === value)?.label ?? value;

	return (
		<div className="grid grid-cols-2 gap-6">
			<div>
				<h3 className="text-xl font-semibold mb-4">
					{t("sections.included.title")}
				</h3>
				<ul className="flex flex-col gap-2">
					{data.included.map((item) => {
						return (
							<li key={item} className="flex items-center gap-2">
								<Check className="text-green-500 w-5 h-5 shrink-0" />
								<span className="text-sm">
									{getLabel(item, allLabels)}
								</span>
							</li>
						);
					})}
				</ul>
			</div>
			<div>
				<h3 className="text-xl font-semibold mb-4">
					{t("sections.not_included.title")}
				</h3>
				<ul className="flex flex-col gap-2">
					{data.not_included.map((item) => {
						return (
							<li key={item} className="flex items-center gap-2">
								<X className="text-red-500 w-5 h-5 shrink-0" />
								<span className="text-sm">
									{getLabel(item, allLabels)}
								</span>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export const PreviewTourAmenities = withErrorBoundary(PreviewTourAmenitiesBase);
