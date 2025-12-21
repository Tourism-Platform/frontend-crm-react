import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { PAYMENTS_MOCK } from "@/shared/config/mocks";
import { Card, CardContent, CustomTable } from "@/shared/ui";

import { type IPayment } from "@/entities/finance";

import { COLUMNS } from "../model";

export const ClientPayments: FC = () => {
	const { t } = useTranslation("client_payments_page");
	const [payments] = useState<IPayment[]>(PAYMENTS_MOCK);

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent>
					<CustomTable data={payments} columns={COLUMNS()} />
				</CardContent>
			</Card>
		</section>
	);
};
