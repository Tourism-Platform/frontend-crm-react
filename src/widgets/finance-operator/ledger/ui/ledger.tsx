import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CustomQueryTabs,
	withErrorBoundary
} from "@/shared/ui";

import { LEDGER_TABS } from "../model";

const LedgerBase: FC = () => {
	const { t } = useTranslation("ledger_page");

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="md:text-3xl text-2xl">{t("page_name")}</h1>
			<Card>
				<CardContent className="flex gap-5 flex-col">
					<CustomQueryTabs ns="ledger_page" tabs={LEDGER_TABS} />
				</CardContent>
			</Card>
		</section>
	);
};

export const Ledger = withErrorBoundary(LedgerBase);
