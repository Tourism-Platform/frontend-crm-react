import { EyeIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { LoaderButton } from "@/shared/ui";

export const PreviewTourButton: FC = () => {
	const { t } = useTranslation("common_tours");
	const { tourId = "" } = useParams<{ tourId: string }>();

	const handlePreview = () => {
		if (!tourId) return;

		const url = buildRoute(ENUM_PATH.TOURS.DRAFT_PREVIEW, { tourId });
		window.open(url, "_blank", "noopener,noreferrer");
	};

	return (
		<LoaderButton
			variant="glass"
			onClick={handlePreview}
			disabled={!tourId}
			icon={<EyeIcon />}
			label={t("actions.preview")}
		/>
	);
};
