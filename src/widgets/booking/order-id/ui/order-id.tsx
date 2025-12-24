import { ChevronLeft } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import { ENUM_PATH, ORDERS_MOCK } from "@/shared/config";
import { Button } from "@/shared/ui";

import { ENUM_ORDER_STATUS } from "@/entities/booking";

import { getContactItems, getOptionItems, getOrderItems } from "../model";

import {
	OrderHeader,
	OrderInfoCard,
	OrderPaxReview,
	OrderReport,
	OrderSupplierPayments,
	OrderTourReview
} from "./index";

export const OrderId: FC = () => {
	const { orderId } = useParams<{ orderId: string }>();
	const { t } = useTranslation("order_id_page");

	const order = ORDERS_MOCK.find((o) => o.orderId === orderId);

	if (!order) {
		return (
			<div className="flex flex-col gap-6 font-poppins">
				<Button variant="ghost" size="sm" asChild>
					<Link to={ENUM_PATH.BOOKING.ORDERS}>
						<ChevronLeft className="mr-2 h-4 w-4" />
						{t("buttons.back")}
					</Link>
				</Button>
				<div className="flex flex-col items-center justify-center h-full gap-4">
					<h1 className="text-2xl font-bold">
						{t("order_not_found")}
					</h1>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-8">
			<OrderHeader
				orderId={order.orderId}
				status={order.status}
				invoiceStatus={order.invoiceStatus}
			/>

			{order.status === ENUM_ORDER_STATUS.CANCELLED && (
				<OrderReport report={order.report || ""} />
			)}

			<div className="grid grid-cols-2 gap-6">
				<OrderInfoCard
					title={t("order_info.title")}
					items={getOrderItems(order, t)}
				/>

				<OrderInfoCard
					title={t("contact_info.title")}
					items={getContactItems(order, t)}
				/>
			</div>

			{order.status !== ENUM_ORDER_STATUS.CANCELLED && (
				<>
					<OrderInfoCard
						title={t("selected_options.title")}
						items={getOptionItems(order, t)}
					/>

					<OrderTourReview
						items={order.tourReview}
						summary={order.tourSummary}
						orderStatus={order.status}
					/>

					{(order.status === ENUM_ORDER_STATUS.BOOKING ||
						order.status === ENUM_ORDER_STATUS.IN_PROGRESS ||
						order.status === ENUM_ORDER_STATUS.COMPLETED) && (
						<OrderSupplierPayments
							items={order.supplierPayments || []}
						/>
					)}

					<OrderPaxReview items={order.paxDetails} />
				</>
			)}
		</div>
	);
};
