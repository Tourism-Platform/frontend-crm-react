import { UploadIcon } from "lucide-react";
import { type ChangeEvent, type FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { LoaderButton } from "@/shared/ui";

import { useUploadInvoicePdfMutation } from "@/entities/finance";

interface IUploadInvoicePdfButtonProps {
	invoiceId: string;
}

export const UploadInvoicePdfButton: FC<IUploadInvoicePdfButtonProps> = ({
	invoiceId
}) => {
	const { t } = useTranslation("invoice_id_page");
	const inputRef = useRef<HTMLInputElement>(null);
	const [uploadPdf, { isLoading }] = useUploadInvoicePdfMutation();

	const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		// Сброс, чтобы повторный выбор того же файла снова вызвал onChange
		event.target.value = "";
		if (!file) return;

		try {
			await uploadPdf({ invoiceId, file }).unwrap();
			toast.success(t("buttons.upload_pdf_success"));
		} catch {
			toast.error(t("buttons.upload_pdf_error"));
		}
	};

	return (
		<>
			<input
				ref={inputRef}
				type="file"
				accept="application/pdf"
				className="hidden"
				onChange={handleChange}
			/>
			<LoaderButton
				type="button"
				variant="outline"
				onClick={() => inputRef.current?.click()}
				isLoading={isLoading}
				icon={<UploadIcon className="h-4 w-4" />}
				label={t("buttons.upload_pdf")}
				loadingLabel={t("buttons.uploading_pdf")}
			/>
		</>
	);
};
