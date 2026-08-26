import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useDownloadFile } from "@/shared/hooks";
import { LoaderButton } from "@/shared/ui";

import {
	useGenerateInvoiceDocumentMutation,
	useLazyGetInvoicePdfQuery
} from "@/entities/finance";

interface IExportInvoiceButtonProps {
	invoiceId: string;
	fileName?: string;
}

export const ExportInvoiceButton: FC<IExportInvoiceButtonProps> = ({
	invoiceId,
	fileName
}) => {
	const { t } = useTranslation("invoice_id_page");
	const [{ isDownloading }, { download }] = useDownloadFile();
	const [generateInvoiceDocument, { isLoading: isGenerating }] =
		useGenerateInvoiceDocumentMutation();
	const [fetchPdf, { isFetching }] = useLazyGetInvoicePdfQuery();

	const isBusy = isDownloading || isGenerating || isFetching;

	const handleExport = async () => {
		try {
			await generateInvoiceDocument(invoiceId).unwrap();
			const { url } = await fetchPdf(invoiceId).unwrap();
			await download({
				url,
				fileName: fileName ? `${fileName}.pdf` : "invoice.pdf"
			});
		} catch {
			toast.error(t("buttons.export_error"));
		}
	};

	return (
		<LoaderButton
			type="button"
			onClick={handleExport}
			isLoading={isBusy}
			label={t("buttons.export")}
			loadingLabel={t("buttons.exporting")}
		/>
	);
};
