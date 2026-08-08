import type { TFunction } from "i18next";

import {
	BOOKING_ORDER_TYPE_LABELS,
	type IAgencyOrderDetail
} from "@/entities/booking";

import { type IInfoItem } from "../types";

export const getOrderItems = (
	order: IAgencyOrderDetail,
	t: TFunction<"order_id_page" | "options">
): IInfoItem[] => [
	{
		label: t("order_info.fields.tour_name", { ns: "order_id_page" }),
		value: order.tourName
	},
	{
		label: t("order_info.fields.type", { ns: "order_id_page" }),
		value: t(BOOKING_ORDER_TYPE_LABELS[order.orderType], { ns: "options" })
	},
	{
		label: t("order_info.fields.pax", { ns: "order_id_page" }),
		value: order.pax
	},
	{
		label: t("order_info.fields.route", { ns: "order_id_page" }),
		value: order.route
	},
	{
		label: t("order_info.fields.duration", { ns: "order_id_page" }),
		value: t("order_info.fields.duration_value", {
			ns: "order_id_page",
			days: order.tour.days,
			nights: order.tour.nights
		})
	},
	{
		label: t("order_info.fields.dates", { ns: "order_id_page" }),
		value: `${order.dates.from} - ${order.dates.to}`
	},
	{
		label: t("order_info.fields.comment", { ns: "order_id_page" }),
		value: order.comment || "-"
	}
];
