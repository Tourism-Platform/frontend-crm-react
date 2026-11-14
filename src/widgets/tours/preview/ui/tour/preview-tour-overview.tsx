import { DocumentTextIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Card, Previewer, withErrorBoundary } from "@/shared/ui";

import type { IPreviewTourData } from "@/entities/tour";

interface IPreviewTourOverviewProps {
	data?: IPreviewTourData;
}

const PreviewTourOverviewBase: FC<IPreviewTourOverviewProps> = ({ data }) => {
	const { t } = useTranslation("preview_tour_page");

	if (!data) return null;

	return (
		<Card variant="glass" className="gap-4 px-6">
			<h2 className="flex items-center gap-2.5 text-lg font-semibold">
				<span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
					<DocumentTextIcon className="size-5" />
				</span>
				{t("sections.overview.title")}
			</h2>
			<Previewer text={data.description} />
			<Previewer text={data.overview_description} />
		</Card>
	);
};

export const PreviewTourOverview = withErrorBoundary(PreviewTourOverviewBase);
