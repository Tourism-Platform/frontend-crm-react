import { Loader } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useDownloadFile } from "@/shared/hooks";
import { Button } from "@/shared/ui";

import { useLazyGetInvoicePdfQuery } from "@/entities/finance";

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
	const [fetchPdf, { isFetching }] = useLazyGetInvoicePdfQuery();

	const handleExport = async () => {
		try {
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
		<Button onClick={handleExport} disabled={isDownloading || isFetching}>
			{(isDownloading || isFetching) && (
				<Loader className="mr-2 h-4 w-4 animate-spin" />
			)}
			{t("buttons.export")}
		</Button>
	);
};
