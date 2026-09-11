import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export type TUseCopyToClipboardOptions = {
	successMessage?: string;
	errorMessage?: string;
};

export const useCopyToClipboard = (options?: TUseCopyToClipboardOptions) => {
	const { t } = useTranslation("common");

	const copyToClipboard = useCallback(
		async (text: string) => {
			if (!text) return false;

			try {
				await navigator.clipboard.writeText(text);
				toast.success(options?.successMessage ?? t("clipboard.copied"));
				return true;
			} catch {
				toast.error(
					options?.errorMessage ?? t("clipboard.copy_failed")
				);
				return false;
			}
		},
		[options?.errorMessage, options?.successMessage, t]
	);

	return copyToClipboard;
};
