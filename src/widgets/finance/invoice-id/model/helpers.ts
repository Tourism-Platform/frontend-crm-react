import type { TFunction } from "i18next";

import { type IInvoiceDetail } from "@/entities/finance";

import { type IInfoItem } from "./types";

export const getBillingItems = (
	invoice: IInvoiceDetail,
	t: TFunction<"invoice_id_page">
): IInfoItem[] => [
	{ label: t("billing.fields.company"), value: invoice.billingInfo.company },
	{ label: t("billing.fields.address"), value: invoice.billingInfo.address },
	{ label: t("billing.fields.contact"), value: invoice.billingInfo.contact },
	{ label: t("billing.fields.email"), value: invoice.billingInfo.email },
	{ label: t("billing.fields.phone"), value: invoice.billingInfo.phone }
];

export const getBookingItems = (
	invoice: IInvoiceDetail,
	t: TFunction<"invoice_id_page">
): IInfoItem[] => [
	{ label: t("booking.fields.order"), value: invoice.orderId },
	{ label: t("booking.fields.tour"), value: invoice.bookingInfo.tour },
	{ label: t("booking.fields.pax"), value: invoice.bookingInfo.pax },
	{ label: t("booking.fields.dates"), value: invoice.bookingInfo.dates },
	{ label: t("booking.fields.duration"), value: invoice.bookingInfo.duration }
];
