import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { CustomTable } from "@/shared/ui";

import { COLUMNS, MARKUPS } from "../model";

export const CommissionType: FC = () => {
	const { t } = useTranslation("financial_settings_page");
	return (
		<div className="flex gap-5 flex-col">
			<div className="flex flex-col gap-2">
				<h2 className="text-xl">{t("commission_type.title")}</h2>
				<p className="text-sm text-muted-foreground">
					{t("commission_type.description")}
				</p>
			</div>
			<CustomTable data={MARKUPS} columns={COLUMNS()} />
		</div>
	);
};
