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

import { type IEventVarianceLine } from "@/entities/finance";

import { COLUMNS } from "../model";

interface IReconciliationSupplierPaymentsProps {
	data: IEventVarianceLine[];
	isLoading?: boolean;
}

const ReconciliationSupplierPaymentsBase: FC<
	IReconciliationSupplierPaymentsProps
> = ({ data, isLoading }) => {
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
					isLoading={isLoading}
					loadingMode="skeleton"
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
