import {
	BillListIcon,
	CardReceiveIcon,
	CardSearchIcon,
	CardSendIcon
} from "@solar-icons/react/outline";

import type { ISidebarMenu } from "@/shared/ui";

import { ENUM_PATH } from "../routes.config";

export const FINANCE_SIDEBAR_LIST: ISidebarMenu[] = [
	{
		title: "operator.finance.general.title",
		menu: [
			{
				label: "operator.finance.general.menu.invoices",
				description:
					"operator.finance.general.menu.invoices_description",
				path: ENUM_PATH.FINANCE.INVOICES,
				icon: <BillListIcon />
			},
			{
				label: "operator.finance.general.menu.client_payments",
				description:
					"operator.finance.general.menu.client_payments_description",
				path: ENUM_PATH.FINANCE.CLIENT_PAYMENTS,
				icon: <CardReceiveIcon />
			},
			{
				label: "operator.finance.general.menu.supplier_payments",
				description:
					"operator.finance.general.menu.supplier_payments_description",
				path: ENUM_PATH.FINANCE.SUPPLIER_PAYMENTS,
				icon: <CardSendIcon />
			},
			{
				label: "operator.finance.general.menu.reconciliation",
				description:
					"operator.finance.general.menu.reconciliation_description",
				path: ENUM_PATH.FINANCE.RECONCILIATION,
				icon: <CardSearchIcon />
			}
		]
	}
];
