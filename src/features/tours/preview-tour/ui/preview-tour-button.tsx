import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";

export const PreviewTourButton: FC = () => {
	const { t } = useTranslation("common_tours");

	return <Button variant="outline">{t("actions.preview")}</Button>;
};
