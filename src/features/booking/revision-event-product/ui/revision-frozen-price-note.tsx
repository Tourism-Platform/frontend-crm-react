import { type FC } from "react";
import { useTranslation } from "react-i18next";

export const RevisionFrozenPriceNote: FC = () => {
	const { t } = useTranslation("common_events");

	return (
		<p className="text-muted-foreground text-sm">
			{t("revision.frozen_price")}
		</p>
	);
};
