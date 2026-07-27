import { Check, X } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";

import { type IPreviewTourData } from "@/entities/tour";

interface IPreviewTourAmenitiesProps {
	data?: IPreviewTourData;
}

const PreviewTourAmenitiesBase: FC<IPreviewTourAmenitiesProps> = ({ data }) => {
	const { t } = useTranslation("preview_tour_page");

	if (!data) return null;

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
								<span className="text-sm">{item}</span>
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
								<span className="text-sm">{item}</span>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export const PreviewTourAmenities = withErrorBoundary(PreviewTourAmenitiesBase);
