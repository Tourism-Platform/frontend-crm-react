import type { TFunction } from "i18next";

import { type IOrderOperatorInfo } from "@/entities/booking";

import { type IInfoItem } from "../types";

const empty = "-";

export const getContactItems = (
	operator: IOrderOperatorInfo | null | undefined,
	t: TFunction<"order_id_page" | "options">
): IInfoItem[] => {
	if (!operator) {
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
		operator.businessName?.trim() ||
		operator.contactPerson?.trim() ||
		operator.name?.trim() ||
		empty;

	return [
		{
			label: t("contact_info.fields.client", { ns: "order_id_page" }),
			value: clientName
		},
		{
			label: t("contact_info.fields.email", { ns: "order_id_page" }),
			value: operator.contactEmail || empty
		},
		{
			label: t("contact_info.fields.phone", { ns: "order_id_page" }),
			value: operator.contactPhone || empty
		}
	];
};
