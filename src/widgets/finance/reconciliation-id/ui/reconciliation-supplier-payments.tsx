import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	withErrorBoundary
} from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import { type IReconciliationSupplierPayment } from "@/entities/finance";

import { COLUMNS } from "../model";

interface IReconciliationSupplierPaymentsProps {
	data: IReconciliationSupplierPayment[];
}

const ReconciliationSupplierPaymentsBase: FC<
	IReconciliationSupplierPaymentsProps
> = ({ data }) => {
	const { t } = useTranslation("reconciliation_id_page");
	const columns = useMemo(() => COLUMNS(t), [t]);

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
					columns={columns}
					showPagination={false}
					showTopFilters={false}
				/>
			</CardContent>
		</Card>
	);
};

export const ReconciliationSupplierPayments = withErrorBoundary(
	ReconciliationSupplierPaymentsBase
);
