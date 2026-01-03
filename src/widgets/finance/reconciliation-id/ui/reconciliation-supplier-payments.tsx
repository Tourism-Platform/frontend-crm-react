import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	SmartTable
} from "@/shared/ui";

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
		<Card>
			<CardHeader className="block">
				<CardTitle className="text-lg font-semibold">
					{t("table.title")}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<SmartTable
					data={data}
					columns={COLUMNS()}
					showPagination={false}
					showTopFilters={false}
				/>
			</CardContent>
		</Card>
	);
};
