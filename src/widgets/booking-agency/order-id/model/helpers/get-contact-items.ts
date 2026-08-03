import type { TFunction } from "i18next";

import { type IOrderUserInfo } from "@/entities/booking";

import { type IInfoItem } from "../types";

const empty = "-";

export const getContactItems = (
	user: IOrderUserInfo | null | undefined,
	t: TFunction<"order_id_page" | "options">
): IInfoItem[] => {
	if (!user) {
		return [
			{
				label: t("contact_info.fields.client", { ns: "order_id_page" }),
				value: empty
			},
			{
				label: t("contact_info.fields.email", { ns: "order_id_page" }),
				value: empty
			},
			{
				label: t("contact_info.fields.phone", { ns: "order_id_page" }),
				value: empty
			}
		];
	}

	const clientName =
		[user.firstName, user.lastName]
			.filter((part) => part?.trim())
			.join(" ")
			.trim() || empty;

	return [
		{
			label: t("contact_info.fields.client", { ns: "order_id_page" }),
			value: clientName
		},
		{
			label: t("contact_info.fields.email", { ns: "order_id_page" }),
			value: user.email || empty
		},
		{
			label: t("contact_info.fields.phone", { ns: "order_id_page" }),
			value: user.phoneNumber || empty
		}
	];
};
