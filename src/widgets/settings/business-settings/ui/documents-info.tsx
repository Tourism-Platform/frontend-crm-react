import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { CustomUploadFiles } from "@/shared/ui";

export const DocumentsInfo: FC = () => {
	const { t } = useTranslation("business_settings_page");
	return (
		<div className="flex gap-5 flex-col">
			<h2 className="text-xl">{t("form.documents.title")}</h2>
			<CustomUploadFiles />
		</div>
	);
};
