import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";

export const PublishTourButton: FC = () => {
	const { t } = useTranslation("tour_overview_page");

	return <Button>{t("actions.publish")}</Button>;
};
