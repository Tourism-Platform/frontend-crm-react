import { ChevronLeft, Loader2 } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { ENUM_PATH } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Badge, Button } from "@/shared/ui";

import {
	BOOKING_ORDER_STATUS_LABELS,
	BOOKING_ORDER_STATUS_VARIANTS,
	type ENUM_INVOICE_STATUS_TYPE,
	ENUM_ORDER_STATUS,
	type ENUM_ORDER_STATUS_TYPE,
	INVOICE_STATUS_LABELS,
	INVOICE_STATUS_VARIANTS,
	useUpdateBookingStatusMutation
} from "@/entities/booking";

import { SendInvoice } from "@/features/booking";

interface IOrderHeaderProps {
	orderId: string;
	orderNumber: string;
	status: ENUM_ORDER_STATUS_TYPE;
	invoiceStatus?: ENUM_INVOICE_STATUS_TYPE;
}

const NEXT_ORDER_STATUS: Partial<
	Record<ENUM_ORDER_STATUS_TYPE, ENUM_ORDER_STATUS_TYPE>
> = {
	[ENUM_ORDER_STATUS.NEW]: ENUM_ORDER_STATUS.IN_PROCESSING,
	[ENUM_ORDER_STATUS.IN_PROCESSING]: ENUM_ORDER_STATUS.BOOKING,
	[ENUM_ORDER_STATUS.BOOKING]: ENUM_ORDER_STATUS.IN_PROGRESS,
	[ENUM_ORDER_STATUS.IN_PROGRESS]: ENUM_ORDER_STATUS.COMPLETED
};

const NEXT_STATUS_BUTTON_KEY: Partial<Record<ENUM_ORDER_STATUS_TYPE, string>> =
	{
		[ENUM_ORDER_STATUS.NEW]: "buttons.accept",
		[ENUM_ORDER_STATUS.IN_PROCESSING]: "buttons.confirm",
		[ENUM_ORDER_STATUS.BOOKING]: "buttons.start",
		[ENUM_ORDER_STATUS.IN_PROGRESS]: "buttons.complete"
	};

export const OrderHeader: FC<IOrderHeaderProps> = ({
	orderId,
	orderNumber,
	status,
	invoiceStatus
}) => {
	const { t } = useTranslation(["order_id_page", "options"]);
	const [updateBookingStatus, { isLoading: isUpdatingStatus }] =
		useUpdateBookingStatusMutation();

	const nextStatus = NEXT_ORDER_STATUS[status];
	const nextButtonKey = NEXT_STATUS_BUTTON_KEY[status];

	const handleNextStatus = async () => {
		if (!nextStatus) return;

		try {
			await updateBookingStatus({
				id: orderId,
				status: nextStatus
			}).unwrap();
		} catch {
			toast.error(
				t("buttons.status_error", {
					defaultValue: "Failed to update order status"
				})
			);
		}
	};

	const showInvoiceStatus =
		status === ENUM_ORDER_STATUS.BOOKING ||
		status === ENUM_ORDER_STATUS.COMPLETED ||
		status === ENUM_ORDER_STATUS.IN_PROGRESS;

	const nextStatusButton = nextStatus && nextButtonKey && (
		<Button onClick={handleNextStatus} disabled={isUpdatingStatus}>
			{isUpdatingStatus && (
				<Loader2 className="mr-2 h-4 w-4 animate-spin" />
			)}
			{t(nextButtonKey, {
				defaultValue:
					status === ENUM_ORDER_STATUS.NEW
						? "Accept"
						: status === ENUM_ORDER_STATUS.IN_PROCESSING
							? "Confirm"
							: status === ENUM_ORDER_STATUS.BOOKING
								? "Start"
								: "Complete"
			})}
		</Button>
	);

	return (
		<div className="grid gap-5">
			<div>
				<Button
					variant="ghost"
					size="sm"
					asChild
					className="text-primary"
				>
					<Link to={ENUM_PATH.OPERATOR.BOOKING.ORDERS}>
						<ChevronLeft className="mr-2 h-4 w-4" />
						{t("buttons.back")}
					</Link>
				</Button>
			</div>
			<div className="grid gap-2">
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-3">
						<h1 className="text-3xl">{orderNumber}</h1>
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<span className="text-sm font-medium">
									{t("header.order_status")}:
								</span>
								<Badge
									variant={
										BOOKING_ORDER_STATUS_VARIANTS[status]
									}
									className={cn(
										"px-3 py-1 text-xs font-bold"
									)}
								>
									{t(BOOKING_ORDER_STATUS_LABELS[status], {
										ns: "options"
									})}
								</Badge>
							</div>

							{invoiceStatus && showInvoiceStatus && (
								<div className="flex items-center gap-2">
									<span className="text-sm font-medium">
										{t("header.invoice_status")}:
									</span>
									<Badge
										variant={
											INVOICE_STATUS_VARIANTS[
												invoiceStatus
											]
										}
										className={cn(
											"px-3 py-1 text-xs font-bold"
										)}
									>
										{t(
											INVOICE_STATUS_LABELS[
												invoiceStatus
											],
											{
												ns: "options"
											}
										)}
									</Badge>
								</div>
							)}
						</div>
					</div>
					{status === ENUM_ORDER_STATUS.NEW && nextStatusButton}
					{status === ENUM_ORDER_STATUS.IN_PROCESSING && (
						<div className="flex gap-3">
							<Button variant="slate">
								{t("buttons.export")}
							</Button>
							<SendInvoice
								orderId={orderId}
								orderStatus={status}
							/>
							{nextStatusButton}
						</div>
					)}
					{status === ENUM_ORDER_STATUS.BOOKING && (
						<div className="flex gap-3">
							<Button variant="slate">
								{t("buttons.export")}
							</Button>
							<Button>{t("buttons.send")}</Button>
							{nextStatusButton}
						</div>
					)}
					{status === ENUM_ORDER_STATUS.IN_PROGRESS && (
						<div className="flex gap-3">
							<Button variant="slate">
								{t("buttons.export")}
							</Button>
							{nextStatusButton}
						</div>
					)}
					{status === ENUM_ORDER_STATUS.COMPLETED && (
						<Button variant="slate">{t("buttons.export")}</Button>
					)}
				</div>
			</div>
		</div>
	);
};
