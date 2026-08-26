import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CustomQueryTabs,
	withErrorBoundary
} from "@/shared/ui";

import { FINANCIAL_SETTINGS_OPERATOR_TABS } from "./model";

const FinancialSettingsBase: FC = () => {
	const { t } = useTranslation("financial_settings_page_operator");

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent className="flex gap-5 flex-col max-w-5xl">
					<CustomQueryTabs
						ns="financial_settings_page_operator"
						tabs={FINANCIAL_SETTINGS_OPERATOR_TABS}
					/>
				</CardContent>
			</Card>
		</section>
	);
};

export const FinancialSettings = withErrorBoundary(FinancialSettingsBase);
