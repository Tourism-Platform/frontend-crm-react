import { ChevronLeft } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Badge, Button } from "@/shared/ui";

import {
	type ENUM_INVOICE_STATUS_TYPE,
	ENUM_ORDER_STATUS,
	type ENUM_ORDER_STATUS_TYPE,
	INVOICE_STATUS_LABELS_ID,
	INVOICE_STATUS_VARIANTS,
	ORDER_STATUS_LABELS,
	ORDER_STATUS_VARIANTS
} from "@/entities/booking";

interface IOrderHeaderProps {
	orderId: string;
	status: ENUM_ORDER_STATUS_TYPE;
	invoiceStatus?: ENUM_INVOICE_STATUS_TYPE;
}

export const OrderHeader: FC<IOrderHeaderProps> = ({
	orderId,
	status,
	invoiceStatus
}) => {
	const { t } = useTranslation("order_id_page");

	return (
		<div className="grid gap-5">
			<div>
				<Button
					variant="ghost"
					size="sm"
					asChild
					className="text-primary"
				>
					<Link to={ENUM_PATH.BOOKING.ORDERS}>
						<ChevronLeft className="mr-2 h-4 w-4" />
						{t("buttons.back")}
					</Link>
				</Button>
			</div>
			<div className="grid gap-2">
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-3">
						<h1 className="text-3xl">{orderId}</h1>
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<span className="text-sm font-medium">
									{t("header.order_status")}:
								</span>
								<Badge
									variant={ORDER_STATUS_VARIANTS[status]}
									className={cn(
										"px-3 py-1 text-xs font-bold"
									)}
								>
									{t(ORDER_STATUS_LABELS[status])}
								</Badge>
							</div>

							{invoiceStatus && (
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
											INVOICE_STATUS_LABELS_ID[
												invoiceStatus
											]
										)}
									</Badge>
								</div>
							)}
						</div>
					</div>
					{status === ENUM_ORDER_STATUS.NEW && (
						<Button>{t("buttons.accept")}</Button>
					)}
					{status === ENUM_ORDER_STATUS.IN_PROCESSING && (
						<div className="flex gap-3">
							<Button variant="slate">
								{t("buttons.export")}
							</Button>

							<Button disabled>{t("buttons.generate")}</Button>
						</div>
					)}
					{status === ENUM_ORDER_STATUS.BOOKING && (
						<div className="flex gap-3">
							<Button variant="slate">
								{t("buttons.export")}
							</Button>
							<Button>{t("buttons.send")}</Button>
						</div>
					)}
					{(status === ENUM_ORDER_STATUS.IN_PROGRESS ||
						status === ENUM_ORDER_STATUS.COMPLETED) && (
						<Button variant="slate">{t("buttons.export")}</Button>
					)}
				</div>
			</div>
		</div>
	);
};
