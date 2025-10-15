import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { CustomUploadImages } from "@/shared/ui";

export const Media: FC = () => {
	const { t } = useTranslation("flight_edit_page");
	return (
		<div className="grid gap-6">
			<h2 className="text-xl">{t("media.title")}</h2>
			<CustomUploadImages />
		</div>
	);
};
