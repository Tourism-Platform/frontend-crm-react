import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	SmartTable
} from "@/shared/ui";

import { type IOrderSupplierPaymentItem } from "@/entities/finance";

import { SUPPLIER_PAYMENTS_COLUMNS } from "../model";

interface IOrderSupplierPaymentsProps {
	items: IOrderSupplierPaymentItem[];
}

export const OrderSupplierPayments = ({
	items
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
					columns={SUPPLIER_PAYMENTS_COLUMNS()}
					getSubRows={(row) => row.subRows}
					showPagination={true}
					showStatusFilter={false}
					tableLayout={{
						rowBorder: true,
						headerBackground: false
					}}
				/>
			</CardContent>
		</Card>
	);
};
