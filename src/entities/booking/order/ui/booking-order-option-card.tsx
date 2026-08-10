import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/shared/ui";

import {
	BOOKING_CLIENT_TYPE_LABELS,
	BOOKING_ORDER_STATUS_LABELS,
	BOOKING_ORDER_STATUS_VARIANTS,
	BOOKING_ORDER_TYPE_LABELS
} from "../constants";
import type { TBookingOrderSelectOption } from "../types";

type TBookingOrderOptionCardProps = {
	option: TBookingOrderSelectOption;
};

export const BookingOrderOptionCard: FC<TBookingOrderOptionCardProps> = ({
	option
}) => {
	const { t } = useTranslation(["client_payments_page", "options"]);

	const orderLabel = option.orderNumber || option.label;
	const clientTypeLabel = t(BOOKING_CLIENT_TYPE_LABELS[option.clientType], {
		ns: "options"
	});
	const tourTypeLabel = t(BOOKING_ORDER_TYPE_LABELS[option.orderType], {
		ns: "options"
	});
	const statusLabel = t(BOOKING_ORDER_STATUS_LABELS[option.status], {
		ns: "options"
	});

	return (
		<div className="flex flex-col gap-1 text-left">
			<p className="truncate text-sm leading-tight">
				<span className="text-muted-foreground">
					{t("new_payment.form.fields.orderId.option.order")}:{" "}
				</span>
				<span className="font-medium text-foreground">
					{orderLabel}
				</span>
			</p>
			<p className="truncate text-xs leading-tight text-muted-foreground">
				<span>
					{t("new_payment.form.fields.orderId.option.client")}:{" "}
				</span>
				<span className="text-foreground">{option.client}</span>
				{" · "}
				{clientTypeLabel}
			</p>
			{option.tourName ? (
				<p className="truncate text-xs leading-tight text-muted-foreground">
					<span>
						{t("new_payment.form.fields.orderId.option.tour")}:{" "}
					</span>
					<span className="text-foreground">{option.tourName}</span>
					{" · "}
					{tourTypeLabel}
				</p>
			) : null}
			<p className="truncate text-xs leading-tight text-muted-foreground">
				{option.dates.from} — {option.dates.to}
				{" · "}
				{t("new_payment.form.fields.orderId.option.pax")}: {option.pax}
			</p>
			<div className="flex flex-wrap items-center gap-1.5 pt-0.5">
				<Badge
					variant={BOOKING_ORDER_STATUS_VARIANTS[option.status]}
					size="sm"
				>
					{statusLabel}
				</Badge>
				<span className="text-xs text-muted-foreground">
					{t("new_payment.form.fields.orderId.option.created")}:{" "}
					{option.dateCreated}
				</span>
			</div>
		</div>
	);
};
