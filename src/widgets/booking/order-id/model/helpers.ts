import type { TFunction } from "i18next";

import { type IOrder } from "@/entities/booking";

import { type IInfoItem } from "./types";

export const getOrderItems = (
	order: IOrder,
	t: TFunction<"order_id_page", undefined>
): IInfoItem[] => [
	{ label: t("order_info.fields.tour_name"), value: order.tourName },
	{ label: t("order_info.fields.type"), value: order.orderType },
	{ label: t("order_info.fields.pax"), value: order.pax },
	{ label: t("order_info.fields.route"), value: order.route },
	{
		label: t("order_info.fields.duration"),
		value: order.duration
	},
	{
		label: t("order_info.fields.dates"),
		value: `${order.dates.from} - ${order.dates.to}`
	},
	{ label: t("order_info.fields.comment"), value: order.comment || "-" }
];

export const getContactItems = (
	order: IOrder,
	t: TFunction<"order_id_page", undefined>
): IInfoItem[] => [
	{ label: t("contact_info.fields.client"), value: order.client },
	{ label: t("contact_info.fields.type"), value: order.clientType },
	{ label: t("contact_info.fields.email"), value: order.email },
	{ label: t("contact_info.fields.phone"), value: order.phone }
];

export const getOptionItems = (
	order: IOrder,
	t: TFunction<"order_id_page", undefined>
): IInfoItem[] => [
	{
		label: t("selected_options.fields.room_type"),
		value: order.roomType || "-"
	},
	{
		label: t("selected_options.fields.car_class"),
		value: order.carClass || "-"
	}
];
