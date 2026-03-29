import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	withErrorBoundary
} from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import type {
	ENUM_ORDER_STATUS_TYPE,
	ISupplierPaymentItem
} from "@/entities/booking";

import { SUPPLIER_PAYMENTS_COLUMNS } from "../model";

interface IOrderSupplierPaymentsProps {
	items: ISupplierPaymentItem[];
	orderStatus?: ENUM_ORDER_STATUS_TYPE;
}

const TABLE_LAYOUT = {
	rowBorder: true,
	headerBackground: false
};

const getSubRowsFn = (row: ISupplierPaymentItem) => row.subRows;

const OrderSupplierPaymentsBase = ({
	items,
	orderStatus
}: IOrderSupplierPaymentsProps) => {
	const { t } = useTranslation(["order_id_page", "options"]);
	const columns = useMemo(
		() => SUPPLIER_PAYMENTS_COLUMNS(t, orderStatus),
		[orderStatus, t]
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg font-semibold">
					{t("supplier_payments.title")}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<SmartTable
					data={items}
					columns={columns}
					getSubRows={getSubRowsFn}
					showTopFilters={false}
					tableLayout={TABLE_LAYOUT}
				/>
			</CardContent>
		</Card>
	);
};

export const OrderSupplierPayments = withErrorBoundary(
	OrderSupplierPaymentsBase
);
