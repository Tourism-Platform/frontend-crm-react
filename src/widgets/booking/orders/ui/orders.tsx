import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { ORDERS_MOCK } from "@/shared/config";
import { Card, CardContent, CustomTable } from "@/shared/ui";

import { type IOrder } from "@/entities/booking";

import { COLUMNS } from "../model";

export const Orders: FC = () => {
	const { t } = useTranslation("orders_page");
	const [orders, setOrders] = useState<IOrder[]>(ORDERS_MOCK);

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

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent>
					<CustomTable
						data={orders}
						columns={COLUMNS(handleEditOrder, handleDeleteOrder)}
					/>
				</CardContent>
			</Card>
		</section>
	);
};
