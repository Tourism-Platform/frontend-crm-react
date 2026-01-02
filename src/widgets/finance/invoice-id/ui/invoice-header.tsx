import { ChevronLeft } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import type { IDownloadFile } from "@/shared/hooks";
import { cn } from "@/shared/lib";
import { Badge, Button } from "@/shared/ui";

import {
	type ENUM_INVOICE_STATUS_TYPE,
	INVOICE_STATUS_LABELS,
	INVOICE_STATUS_VARIANTS
} from "@/entities/finance";

import { ExportInvoiceButton } from "@/features/finance";

interface IInvoiceHeaderProps {
	paymentId: string;
	status: ENUM_INVOICE_STATUS_TYPE;
	issueDate: string;
	dueDate: string;
	file?: IDownloadFile;
}

export const InvoiceHeader: FC<IInvoiceHeaderProps> = ({
	paymentId,
	status,
	issueDate,
	dueDate,
	file
}) => {
	const { t } = useTranslation(["invoice_id_page", "options"]);

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
						{t("buttons.back", { ns: "invoice_id_page" })}
					</Link>
				</Button>
			</div>
			<div className="grid gap-2">
				<div className="flex items-center justify-between">
					<div className="flex gap-3">
						<h1 className="text-3xl">{paymentId}</h1>
						<Badge
							variant={INVOICE_STATUS_VARIANTS[status]}
							className={cn("px-3 py-2 text-xs font-bold")}
						>
							{t(INVOICE_STATUS_LABELS[status], {
								ns: "options"
							})}
						</Badge>
					</div>
					<ExportInvoiceButton file={file} />
				</div>
				<div className="flex gap-4 text-sm text-muted-foreground font-medium">
					<span>
						{t("header.issue_date", { ns: "invoice_id_page" })}:{" "}
						{issueDate}
					</span>
					<span>
						{t("header.due_date", { ns: "invoice_id_page" })}:{" "}
						{dueDate}
					</span>
				</div>
			</div>
		</div>
	);
};
