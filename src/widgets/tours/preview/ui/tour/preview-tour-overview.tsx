import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Previewer, withErrorBoundary } from "@/shared/ui";

import type { IPreviewTourData } from "@/entities/tour";

interface IPreviewTourOverviewProps {
	data?: IPreviewTourData;
}

const PreviewTourOverviewBase: FC<IPreviewTourOverviewProps> = ({ data }) => {
	const { t } = useTranslation("preview_tour_page");

	if (!data) return null;

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-xl font-semibold">
				{t("sections.overview.title")}
			</h2>
			<Previewer text={data.description} />
		</div>
	);
};

export const PreviewTourOverview = withErrorBoundary(PreviewTourOverviewBase);
