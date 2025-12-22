import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { RECONCILIATIONS_MOCK } from "@/shared/config";
import { Card, CardContent, CustomTable } from "@/shared/ui";

import { type IReconciliation } from "@/entities/finance";

import { COLUMNS } from "../model";

export const Reconciliation: FC = () => {
	const { t } = useTranslation("reconciliation_page");
	const [reconciliations] = useState<IReconciliation[]>(RECONCILIATIONS_MOCK);

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent>
					<CustomTable data={reconciliations} columns={COLUMNS()} />
				</CardContent>
			</Card>
		</section>
	);
};
