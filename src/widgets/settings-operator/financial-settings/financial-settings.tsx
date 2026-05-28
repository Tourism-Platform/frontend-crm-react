import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Separator,
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
					<CustomOptionTabs
						defaultValue={FINANCIAL_SETTINGS_OPERATOR_TABS[0]?.type}
					>
						<CustomOptionTabsList className="grid-cols-4">
							{FINANCIAL_SETTINGS_OPERATOR_TABS.map((item) => (
								<CustomOptionTabsTrigger
									key={item.type}
									value={item.type}
									variant={"tongue"}
								>
									{t(item.label)}
								</CustomOptionTabsTrigger>
							))}
						</CustomOptionTabsList>
						<Separator className="mb-6" />
						{FINANCIAL_SETTINGS_OPERATOR_TABS.map((item) => (
							<CustomOptionTabsContent
								key={item.type}
								value={item.type}
							>
								<item.slot />
							</CustomOptionTabsContent>
						))}
					</CustomOptionTabs>
				</CardContent>
			</Card>
		</section>
	);
};

export const FinancialSettings = withErrorBoundary(FinancialSettingsBase);
