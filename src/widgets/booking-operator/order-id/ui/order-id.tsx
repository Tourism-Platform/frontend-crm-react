import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { DataState } from "@/shared/ui";

import { ENUM_ORDER_STATUS } from "@/entities/booking";

import { useOrderDetails } from "../model/hooks/use-order-details";

import { OrderHeader } from "./order-header";
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
		tourReviewItems,
		eventOptions,
		availability,
		financials,
		isOrderLoading,
		isPaxLoading,
		isItineraryLoading
	} = useOrderDetails(orderId || "");

	if (!isOrderLoading && !order) {
		return <OrderNotFound />;
	}

	return (
		<div className="flex flex-1 flex-col gap-5">
			<DataState variant="page" data={order} isLoading={isOrderLoading}>
				{(order) => {
					const isCancelled =
						order.status === ENUM_ORDER_STATUS.CANCELLED;
					const showSupplierPayments =
						order.status === ENUM_ORDER_STATUS.BOOKING ||
						order.status === ENUM_ORDER_STATUS.IN_PROGRESS ||
						order.status === ENUM_ORDER_STATUS.COMPLETED;

					return (
						<>
							<OrderHeader
								orderId={order.orderId}
								orderNumber={order.orderNumber}
								status={order.status}
								invoiceStatus={order.invoiceStatus}
								availability={availability}
							/>

							{order.report && (
								<OrderReport report={order.report} />
							)}

							<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
								<OrderInfoCard
									title={t("order_info.title")}
									items={orderItems}
								/>

								<OrderInfoCard
									title={t("contact_info.title")}
									items={contactItems}
								/>
							</div>

							{!isCancelled && (
								<DataState
									data={tourReviewItems}
									isLoading={isItineraryLoading}
									isEmpty={() => false}
								>
									{(items) => (
										<OrderTourReview
											bookingId={orderId || ""}
											items={items}
											financials={financials}
											orderStatus={order.status}
											availability={availability}
										/>
									)}
								</DataState>
							)}

							{showSupplierPayments && (
								<OrderSupplierPayments
									bookingId={orderId || ""}
									eventOptions={eventOptions}
								/>
							)}

							{!isCancelled && (
								<DataState
									data={paxDetails}
									isLoading={isPaxLoading}
									isEmpty={() => false}
								>
									{(items) => (
										<OrderPaxReview items={items} />
									)}
								</DataState>
							)}
						</>
					);
				}}
			</DataState>
		</div>
	);
};
