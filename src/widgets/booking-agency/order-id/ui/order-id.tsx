import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { ENUM_ORDER_STATUS } from "@/entities/booking";

import { useOrderDetails } from "../model/hooks/use-order-details";

import { OrderHeader } from "./order-header";
import { OrderIdSkeleton } from "./order-id-skeleton";
import { OrderInfoCard } from "./order-info-card";
import { OrderNotFound } from "./order-not-found";
import { OrderPaxReview } from "./order-pax-review";
import { OrderReport } from "./order-report";
import { OrderSupplierPayments } from "./order-supplier-payments";
import { OrderTourReview } from "./order-tour-review";

export const OrderId: FC = () => {
	const { orderId } = useParams<{ orderId: string }>();
	const { t } = useTranslation(["order_id_page", "options"]);

	const {
		order,
		orderItems,
		contactItems,
		paxDetails,
		tourReview,
		isLoading
	} = useOrderDetails(orderId || "");

	if (isLoading) {
		return <OrderIdSkeleton />;
	}

	if (!order) {
		return <OrderNotFound />;
	}

	const showSupplierPayments =
		order.status === ENUM_ORDER_STATUS.BOOKING ||
		order.status === ENUM_ORDER_STATUS.IN_PROGRESS ||
		order.status === ENUM_ORDER_STATUS.COMPLETED;

	return (
		<div className="flex flex-col gap-8 text-foreground">
			<OrderHeader
				orderId={order.orderId}
				status={order.status}
				invoiceStatus={order.invoiceStatus}
			/>

			{order.report && <OrderReport report={order.report} />}

			<div className="grid grid-cols-2 gap-6">
				<OrderInfoCard
					title={t("order_info.title")}
					items={orderItems}
				/>

				<OrderInfoCard
					title={t("contact_info.title")}
					items={contactItems}
				/>
			</div>

			{order.status !== ENUM_ORDER_STATUS.CANCELLED && (
				<OrderTourReview
					bookingId={orderId || ""}
					items={tourReview.items}
					summary={tourReview.summary}
					orderStatus={order.status}
				/>
			)}
			{showSupplierPayments && (
				<OrderSupplierPayments
					items={order.supplierPayments || []}
					orderStatus={order.status}
				/>
			)}

			{order.status !== ENUM_ORDER_STATUS.CANCELLED && (
				<OrderPaxReview items={paxDetails} />
			)}
		</div>
	);
};
