import type { TFunction } from "i18next";

import { type IOrderDetail } from "@/entities/booking";

import { type IInfoItem } from "../types";

export const getOptionItems = (
	order: IOrderDetail,
	t: TFunction<"order_id_page">
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
