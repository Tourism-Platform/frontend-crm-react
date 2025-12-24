import { type FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { ORDERS_MOCK } from "@/shared/config";
import { Card, CardContent, SmartTable } from "@/shared/ui";

import {
	ENUM_ORDER_STATUS,
	type ENUM_ORDER_STATUS_TYPE,
	type IOrder
} from "@/entities/booking";

import { COLUMNS, ORDER_TABS_LIST } from "../model";

export const Orders: FC = () => {
	const { t } = useTranslation("orders_page");
	const [orders, setOrders] = useState<IOrder[]>(ORDERS_MOCK);

	// Status tabs state
	const [activeTab, setActiveTab] = useState<ENUM_ORDER_STATUS_TYPE>(
		ENUM_ORDER_STATUS.NEW
	); // Default to 'all' or first status

	const handleEditOrder = (id: string, updatedOrder: Partial<IOrder>) => {
		setOrders(
			orders.map((order) =>
				order.orderId === id ? { ...order, ...updatedOrder } : order
			)
		);
	};

	const handleDeleteOrder = (id: string) => {
		setOrders(orders.filter((order) => order.orderId !== id));
	};

	const filteredData = orders.filter((order) => order.status === activeTab);
	const translatedStatusTabs = useMemo(
		() =>
			ORDER_TABS_LIST.map((tab) => ({
				label: t(tab.label),
				value: tab.value
			})),
		[t]
	);

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent>
					<SmartTable
						data={filteredData}
						columns={COLUMNS(handleEditOrder, handleDeleteOrder)}
						statusTabs={translatedStatusTabs}
						activeStatusTab={activeTab}
						onStatusTabChange={(val) =>
							setActiveTab(val as ENUM_ORDER_STATUS_TYPE)
						}
						showStatusTabsFilter={true}
					/>
				</CardContent>
			</Card>
		</section>
	);
};
