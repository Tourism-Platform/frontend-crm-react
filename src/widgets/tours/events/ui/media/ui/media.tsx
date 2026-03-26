import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { CustomUploadImages, withErrorBoundary } from "@/shared/ui";

const MediaBase: FC = () => {
	const { t } = useTranslation("flight_edit_page");
	return (
		<div className="grid gap-6">
			<h2 className="text-xl">{t("media.title")}</h2>
			<CustomUploadImages />
		</div>
	);
};

export const Media = withErrorBoundary(MediaBase);
