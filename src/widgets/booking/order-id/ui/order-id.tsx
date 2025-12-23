import { ChevronLeft } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import { ENUM_PATH, ORDERS_MOCK } from "@/shared/config";
import { Button } from "@/shared/ui";

import {
	getContactItems,
	getOptionItems,
	getOrderItems
} from "../model/helpers";

import {
	OrderHeader,
	OrderInfoCard,
	PaxInformation,
	TourReview
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
			<OrderHeader orderId={order.orderId} status={order.status} />

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<OrderInfoCard
					title={t("order_info.title")}
					items={getOrderItems(order, t)}
				/>

				<OrderInfoCard
					title={t("contact_info.title")}
					items={getContactItems(order, t)}
				/>
			</div>

			<OrderInfoCard
				title={t("selected_options.title")}
				items={getOptionItems(order, t)}
			/>

			<TourReview />

			<PaxInformation />
		</div>
	);
};
