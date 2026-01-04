import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	SmartTable
} from "@/shared/ui";

import type {
	ENUM_ORDER_STATUS_TYPE,
	ISupplierPaymentItem
} from "@/entities/booking";

import { SUPPLIER_PAYMENTS_COLUMNS } from "../model";

interface IOrderSupplierPaymentsProps {
	items: ISupplierPaymentItem[];
	orderStatus?: ENUM_ORDER_STATUS_TYPE;
}

export const OrderSupplierPayments = ({
	items,
	orderStatus
}: IOrderSupplierPaymentsProps) => {
	const { t } = useTranslation("order_id_page");

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
					columns={SUPPLIER_PAYMENTS_COLUMNS(orderStatus)}
					getSubRows={(row) => row.subRows}
					showTopFilters={false}
					tableLayout={{
						rowBorder: true,
						headerBackground: false
					}}
				/>
			</CardContent>
		</Card>
	);
};
