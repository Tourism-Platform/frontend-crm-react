import type { TFunction } from "i18next";

import { type IOrderAgencyInfo } from "@/entities/booking";
import { AGENCY_BUSINESS_TYPE_LABELS, ENUM_ROLE } from "@/entities/user";

import { type IInfoItem } from "../types";

const empty = "-";

export const getContactItems = (
	agency: IOrderAgencyInfo | null | undefined,
	t: TFunction<"order_id_page" | "options">
): IInfoItem[] => {
	if (!agency) {
		return [
			{
				label: t("contact_info.fields.client", { ns: "order_id_page" }),
				value: empty
			},
			{
				label: t("contact_info.fields.type", { ns: "order_id_page" }),
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
		agency.businessName?.trim() ||
		agency.contactPerson?.trim() ||
		agency.name?.trim() ||
		empty;

	return [
		{
			label: t("contact_info.fields.client", { ns: "order_id_page" }),
			value: clientName
		},
		{
			label: t("contact_info.fields.type", { ns: "order_id_page" }),
			value: t(AGENCY_BUSINESS_TYPE_LABELS[ENUM_ROLE.AGENCY], {
				ns: "options"
			})
		},
		{
			label: t("contact_info.fields.email", { ns: "order_id_page" }),
			value: agency.contactEmail || empty
		},
		{
			label: t("contact_info.fields.phone", { ns: "order_id_page" }),
			value: agency.contactPhone || empty
		}
	];
};
