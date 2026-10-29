import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Badge, CopyableValue, useSetBreadcrumbLabels } from "@/shared/ui";

import {
	ENUM_INVOICE_STATUS,
	type ENUM_INVOICE_STATUS_TYPE,
	INVOICE_STATUS_LABELS,
	INVOICE_STATUS_VARIANTS
} from "@/entities/finance";

import {
	ExportInvoiceButton,
	RecordPayment,
	UploadInvoicePdfButton
} from "@/features/finance";

interface IInvoiceHeaderProps {
	invoiceId: string;
	paymentId: string;
	status: ENUM_INVOICE_STATUS_TYPE;
	issueDate: string;
	dueDate: string;
	remainingAmount: number;
}

export const InvoiceHeader: FC<IInvoiceHeaderProps> = ({
	invoiceId,
	paymentId,
	status,
	issueDate,
	dueDate,
	remainingAmount
}) => {
	const { t } = useTranslation(["invoice_id_page", "options"]);
	useSetBreadcrumbLabels([paymentId]);

	const canRecordPayment =
		remainingAmount > 0 &&
		status !== ENUM_INVOICE_STATUS.PAID &&
		status !== ENUM_INVOICE_STATUS.CANCELLED;

	return (
		<div className="grid gap-5">
			<div className="grid gap-2">
				<div className="flex flex-wrap items-center justify-between gap-3">
					<div className="flex items-center gap-3">
						<h1 className="md:text-3xl text-2xl">
							<CopyableValue value={paymentId} kind="number" />
						</h1>
						<Badge
							variant={INVOICE_STATUS_VARIANTS[status]}
							size="md"
						>
							{t(INVOICE_STATUS_LABELS[status], {
								ns: "options"
							})}
						</Badge>
					</div>
					<div className="flex flex-wrap gap-2">
						<UploadInvoicePdfButton invoiceId={invoiceId} />
						<ExportInvoiceButton
							invoiceId={invoiceId}
							fileName={paymentId}
						/>
						{canRecordPayment && (
							<RecordPayment
								invoiceId={invoiceId}
								remainingAmount={remainingAmount}
							/>
						)}
					</div>
				</div>
				<div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-medium">
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
