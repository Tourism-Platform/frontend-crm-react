import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";

export const PreviewTourButton: FC = () => {
	const { t } = useTranslation("tour_overview_page");

	return <Button variant="outline">{t("actions.preview")}</Button>;
};
