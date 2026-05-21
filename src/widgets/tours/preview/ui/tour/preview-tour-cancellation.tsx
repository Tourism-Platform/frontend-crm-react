import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Previewer, withErrorBoundary } from "@/shared/ui";

import type { IPreviewTourData } from "@/entities/tour";

interface IPreviewTourCancellationProps {
	data: IPreviewTourData;
}

const PreviewTourCancellationBase: FC<IPreviewTourCancellationProps> = ({
	data
}) => {
	const { t } = useTranslation("preview_tour_page");

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-xl font-semibold">
				{t("sections.cancellation.title")}
			</h2>
			<Previewer text={data.cancellation_policy} />
		</div>
	);
};

export const PreviewTourCancellation = withErrorBoundary(
	PreviewTourCancellationBase
);
