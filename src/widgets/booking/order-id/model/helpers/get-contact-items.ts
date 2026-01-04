import type { TFunction } from "i18next";

import {
	BOOKING_CLIENT_TYPE_LABELS,
	type IOrderDetail
} from "@/entities/booking";

import { type IInfoItem } from "../types";

export const getContactItems = (
	order: IOrderDetail,
	t: TFunction<"order_id_page" | "options">
): IInfoItem[] => [
	{
		label: t("contact_info.fields.client", { ns: "order_id_page" }),
		value: order.client
	},
	{
		label: t("contact_info.fields.type", { ns: "order_id_page" }),
		value: t(BOOKING_CLIENT_TYPE_LABELS[order.clientType], {
			ns: "options"
		})
	},
	{
		label: t("contact_info.fields.email", { ns: "order_id_page" }),
		value: order.email
	},
	{
		label: t("contact_info.fields.phone", { ns: "order_id_page" }),
		value: order.phone
	}
];
