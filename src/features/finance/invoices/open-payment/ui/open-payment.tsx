import { type FC } from "react";
import { useTranslation } from "react-i18next";

import type { IDownloadFile } from "@/shared/hooks";
import { useDownloadFile } from "@/shared/hooks";
import { Button } from "@/shared/ui";

interface IOpenPaymentProps {
	file?: IDownloadFile;
}

export const OpenPayment: FC<IOpenPaymentProps> = ({ file }) => {
	const { t } = useTranslation("invoice_id_page");
	const [{ isDownloading }, { download }] = useDownloadFile();

	const handleOpen = () => {
		if (!file) return;

		download({
			url: file.url,
			fileName: file.fileName || "payment_document"
		});
	};

	if (!file) return null;

	return (
		<div className="text-right">
			<Button
				variant="outline"
				size="sm"
				className="h-8 py-0 rounded px-4 text-xs font-medium border-gray-200"
				onClick={handleOpen}
				disabled={isDownloading}
			>
				{t("payment_table.table.fields.open")}
			</Button>
		</div>
	);
};
