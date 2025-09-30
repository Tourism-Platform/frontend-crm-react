import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, Separator } from "@/shared/ui";

import { CommissionRate } from "./commission-rate";
import { CommissionType } from "./commission-type";

export const FinancialSettings: FC = () => {
	const { t } = useTranslation("financial_settings_page");
	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent className="flex gap-8 flex-col">
					<CommissionType />
					<Separator />
					<CommissionRate />
				</CardContent>
			</Card>
		</section>
	);
};
