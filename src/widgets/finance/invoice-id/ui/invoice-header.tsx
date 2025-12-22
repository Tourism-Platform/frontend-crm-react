import { ChevronLeft } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Badge, type BadgeVariant, Button } from "@/shared/ui";

import {
	ENUM_INVOICE_STATUS,
	type ENUM_INVOICE_STATUS_TYPE,
	INVOICE_ID_STATUS_LABELS
} from "@/entities/finance";

interface IInvoiceHeaderProps {
	paymentId: string;
	status: ENUM_INVOICE_STATUS_TYPE;
	issueDate: string;
	dueDate: string;
}

export const InvoiceHeader: FC<IInvoiceHeaderProps> = ({
	paymentId,
	status,
	issueDate,
	dueDate
}) => {
	const { t } = useTranslation("invoice_id_page");

	const getStatusClasses = (
		status: ENUM_INVOICE_STATUS_TYPE
	): BadgeVariant => {
		switch (status) {
			case ENUM_INVOICE_STATUS.PAID:
				return "green";
			case ENUM_INVOICE_STATUS.UNPAID:
				return "red";
			case ENUM_INVOICE_STATUS.PARTIALLY_PAID:
				return "yellow";
			default:
				return "default";
		}
	};

	return (
		<div className="grid gap-5">
			<div>
				<Button
					variant="ghost"
					size="sm"
					asChild
					className="text-primary"
				>
					<Link to={ENUM_PATH.FINANCE.INVOICES}>
						<ChevronLeft className="mr-2 h-4 w-4" />
						{t("buttons.back")}
					</Link>
				</Button>
			</div>
			<div className="grid gap-2">
				<div className="flex items-center justify-between">
					<div className="flex gap-3">
						<h1 className="text-3xl">{paymentId}</h1>
						<Badge
							variant={getStatusClasses(status)}
							className={cn(
								"px-3 py-2 text-xs font-bold uppercase rounded-md"
							)}
						>
							{t(INVOICE_ID_STATUS_LABELS[status])}
						</Badge>
					</div>
					<Button>{t("buttons.export")}</Button>
				</div>
				<div className="flex gap-4 text-sm text-muted-foreground font-medium">
					<span>
						{t("header.issue_date")}: {issueDate}
					</span>
					<span>
						{t("header.due_date")}: {dueDate}
					</span>
				</div>
			</div>
		</div>
	);
};
