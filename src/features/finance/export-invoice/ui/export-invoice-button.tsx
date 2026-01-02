import type { FC } from "react";
import { useTranslation } from "react-i18next";

import type { IDownloadFile } from "@/shared/hooks";
import { useDownloadFile } from "@/shared/hooks";
import { Button } from "@/shared/ui";

interface IExportInvoiceButtonProps {
	file?: IDownloadFile;
}

export const ExportInvoiceButton: FC<IExportInvoiceButtonProps> = ({
	file
}) => {
	const { t } = useTranslation("invoice_id_page");
	const [{ isDownloading }, { download }] = useDownloadFile();

	const handleExport = () => {
		if (!file) return;

		download({ url: file.url, fileName: file.fileName || "invoice.pdf" });
	};

	return (
		<Button onClick={handleExport} disabled={isDownloading}>
			{t("buttons.export")}
		</Button>
	);
};
