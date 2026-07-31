import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { Button } from "@/shared/ui";

export const PreviewTourButton: FC = () => {
	const { t } = useTranslation("common_tours");
	const { tourId = "" } = useParams<{ tourId: string }>();

	const handlePreview = () => {
		if (!tourId) return;

		const url = buildRoute(ENUM_PATH.TOURS.DRAFT_PREVIEW, { tourId });
		window.open(url, "_blank", "noopener,noreferrer");
	};

	return (
		<Button variant="outline" onClick={handlePreview} disabled={!tourId}>
			{t("actions.preview")}
		</Button>
	);
};
