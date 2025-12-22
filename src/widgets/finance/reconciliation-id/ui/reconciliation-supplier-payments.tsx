import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CustomTable } from "@/shared/ui";

import { type IReconciliationSupplierPayment } from "@/entities/finance";

import { COLUMNS } from "../model";

interface IReconciliationSupplierPaymentsProps {
	data: IReconciliationSupplierPayment[];
}

export const ReconciliationSupplierPayments: FC<
	IReconciliationSupplierPaymentsProps
> = ({ data }) => {
	const { t } = useTranslation("reconciliation_id_page");

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-lg font-semibold">{t("table.title")}</h2>
			<Card>
				<CardContent>
					<CustomTable data={data} columns={COLUMNS()} />
				</CardContent>
			</Card>
		</div>
	);
};
