import { useCallback } from "react";
import { toast } from "sonner";

interface ICopyMessages {
	success: string;
	error: string;
}

/** Копирует текст в буфер обмена, показывает тост; true — скопировано */
export const useCopyToClipboard = ({ success, error }: ICopyMessages) =>
	useCallback(
		async (text: string): Promise<boolean> => {
			try {
				await navigator.clipboard.writeText(text);
				toast.success(success);
				return true;
			} catch {
				toast.error(error);
				return false;
			}
		},
		[success, error]
	);
