import { InfoCircleIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Card, Previewer, withErrorBoundary } from "@/shared/ui";

import type { IPreviewTourData } from "@/entities/tour";

interface IPreviewTourAdditionalInfoProps {
	data?: IPreviewTourData;
}

const PreviewTourAdditionalInfoBase: FC<IPreviewTourAdditionalInfoProps> = ({
	data
}) => {
	const { t } = useTranslation("preview_tour_page");

	if (!data) return null;

	return (
		<Card variant="glass" className="gap-4 px-6">
			<h2 className="flex items-center gap-2.5 text-lg font-semibold">
				<span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
					<InfoCircleIcon className="size-5" />
				</span>
				{t("sections.additional_info.title")}
			</h2>
			<Previewer text={data.additional_info} />
		</Card>
	);
};

export const PreviewTourAdditionalInfo = withErrorBoundary(
	PreviewTourAdditionalInfoBase
);
