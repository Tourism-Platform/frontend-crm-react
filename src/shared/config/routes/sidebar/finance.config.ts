import {
	DollarSquareIcon,
	MoneysIcon,
	ReceiptIcon,
	ReceiptIcon2
} from "@/shared/assets";
import { ENUM_PATH } from "@/shared/config";
import type { ISidebarMenu } from "@/shared/ui";

export const FINANCE_SIDEBAR_LIST: ISidebarMenu[] = [
	{
		title: "operator.finance.general.title",
		menu: [
			{
				label: "operator.finance.general.menu.invoices",
				path: ENUM_PATH.FINANCE.INVOICES,
				icon: ReceiptIcon2
			},
			{
				label: "operator.finance.general.menu.client_payments",
				path: ENUM_PATH.FINANCE.CLIENT_PAYMENTS,
				icon: DollarSquareIcon
			},
			{
				label: "operator.finance.general.menu.supplier_payments",
				path: ENUM_PATH.FINANCE.SUPPLIER_PAYMENTS,
				icon: ReceiptIcon
			},
			{
				label: "operator.finance.general.menu.reconciliation",
				path: ENUM_PATH.FINANCE.RECONCILIATION,
				icon: MoneysIcon
			}
		]
	}
];
