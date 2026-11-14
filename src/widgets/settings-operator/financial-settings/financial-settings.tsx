import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CustomPageHeader,
	CustomQueryTabs,
	withErrorBoundary
} from "@/shared/ui";

import { FINANCIAL_SETTINGS_OPERATOR_TABS } from "./model";

const FinancialSettingsBase: FC = () => {
	const { t } = useTranslation("financial_settings_page_operator");

	return (
		<section className="flex gap-5 flex-col">
			<CustomPageHeader title={t("page_name")} />
			<Card variant="glass">
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
