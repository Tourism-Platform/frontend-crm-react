import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { INVOICES_MOCK } from "@/shared/config";
import { Card, CardContent, CustomTable } from "@/shared/ui";

import { type IInvoice } from "@/entities/finance";

import { COLUMNS } from "../model";

export const Invoices: FC = () => {
	const { t } = useTranslation("invoices_page");
	const [invoices] = useState<IInvoice[]>(INVOICES_MOCK);

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent>
					<CustomTable data={invoices} columns={COLUMNS()} />
				</CardContent>
			</Card>
		</section>
	);
};
