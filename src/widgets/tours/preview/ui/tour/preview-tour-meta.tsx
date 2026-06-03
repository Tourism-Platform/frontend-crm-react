import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import { type IPreviewTourData, LANGUAGES_LABELS } from "@/entities/tour";

import { META_INFO } from "../../model/config";

interface IPreviewTourMetaProps {
	data?: IPreviewTourData;
}

const PreviewTourMetaBase: FC<IPreviewTourMetaProps> = ({ data }) => {
	const { t } = useTranslation("preview_tour_page");
	const languagesLabels = useValueToTranslateLabel(LANGUAGES_LABELS);

	if (!data) return null;

	const getLabel = (
		value: string,
		labels: { value: string; label: string }[]
	) => labels.find((l) => l.value === value)?.label ?? value;

	const citiesStr = data.cities?.join(", ") || "";
	const languagesStr =
		data.languages?.map((l) => getLabel(l, languagesLabels)).join(", ") ||
		"";

	const metaData = META_INFO(
		citiesStr,
		languagesStr,
		t("sections.cities.label"),
		t("sections.languages.label")
	);

	if (metaData.length === 0) return null;

	return (
		<div className="flex flex-wrap items-center gap-x-12 gap-y-4 text-sm">
			{metaData.map((item, idx) => (
				<div key={idx} className="flex items-center gap-2">
					<item.icon className="w-5 h-5 text-muted-foreground shrink-0" />
					<span className="font-medium">{item.label}:</span>
					<span className="text-muted-foreground">{item.value}</span>
				</div>
			))}
		</div>
	);
};

export const PreviewTourMeta = withErrorBoundary(PreviewTourMetaBase);
