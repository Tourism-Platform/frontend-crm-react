import type { TFunction } from "i18next";

import { type IOperatorOrderDetail } from "@/entities/booking";
import { type IInvoiceDetail, INVOICE_NO_DATA } from "@/entities/finance";

import { type IInfoItem } from "./types";

const firstNonEmpty = (...values: Array<string | null | undefined>): string => {
	for (const value of values) {
		const trimmed = value?.trim() ?? "";

		if (trimmed.length > 0) {
			return trimmed;
		}
	}

	return INVOICE_NO_DATA;
};

const formatAddress = (agency: IOperatorOrderDetail["agency"]): string => {
	if (!agency) {
		return INVOICE_NO_DATA;
	}

	const parts = [agency.addressLine, agency.city, agency.country]
		.map((value) => value?.trim() ?? "")
		.filter((value) => value.length > 0);

	return parts.length > 0 ? parts.join(", ") : INVOICE_NO_DATA;
};

export const getBillingItems = (
	invoice: IInvoiceDetail,
	t: TFunction<"invoice_id_page">,
	booking?: IOperatorOrderDetail
): IInfoItem[] => {
	const agency = booking?.agency;

	return [
		{
			label: t("billing.fields.company"),
			value: firstNonEmpty(
				agency?.businessName,
				agency?.legalName,
				agency?.name,
				invoice.billingInfo.company
			)
		},
		{
			label: t("billing.fields.address"),
			value: agency ? formatAddress(agency) : invoice.billingInfo.address
		},
		{
			label: t("billing.fields.contact"),
			value: firstNonEmpty(
				agency?.contactPerson,
				invoice.billingInfo.contact
			)
		},
		{
			label: t("billing.fields.email"),
			value: firstNonEmpty(
				agency?.contactEmail,
				invoice.billingInfo.email
			)
		},
		{
			label: t("billing.fields.phone"),
			value: firstNonEmpty(
				agency?.contactPhone,
				invoice.billingInfo.phone
			)
		}
	];
};

export const getBookingItems = (
	invoice: IInvoiceDetail,
	t: TFunction<"invoice_id_page">,
	booking?: IOperatorOrderDetail
): IInfoItem[] => {
	const dates = booking
		? `${booking.dates.from} - ${booking.dates.to}`
		: invoice.bookingInfo.dates;
	const duration = booking
		? t("booking.fields.duration_value", {
				days: booking.tour.days,
				nights: booking.tour.nights
			})
		: invoice.bookingInfo.duration;

	return [
		{ label: t("booking.fields.order"), value: invoice.orderId },
		{
			label: t("booking.fields.tour"),
			value: firstNonEmpty(booking?.tourName, invoice.bookingInfo.tour)
		},
		{
			label: t("booking.fields.pax"),
			value: booking ? booking.pax : invoice.bookingInfo.pax
		},
		{ label: t("booking.fields.dates"), value: dates },
		{ label: t("booking.fields.duration"), value: duration }
	];
};
