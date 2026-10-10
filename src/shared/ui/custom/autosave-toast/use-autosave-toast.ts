import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import type { TAutosaveStatus } from "@/shared/lib";

const AUTOSAVE_TOAST_ID = "autosave";
const SAVED_DURATION_MS = 1500;

/**
 * One autosave toast, updated in place (fixed id): it never stacks and never
 * shifts the layout, and is seen anywhere on a long page. Typing shows
 * nothing; a request shows "Saving…", then "Saved" briefly, or the problem.
 */
export const useAutosaveToast = (
	status: TAutosaveStatus,
	/** Overrides the generic "Not saved" text. */
	errorMessage?: string
) => {
	const { t } = useTranslation("common");
	const previous = useRef<TAutosaveStatus>(status);

	useEffect(() => {
		const from = previous.current;
		previous.current = status;
		if (from === status) return;

		const options = { id: AUTOSAVE_TOAST_ID };

		switch (status) {
			case "saving":
				toast.loading(t("autosave.saving"), options);
				break;
			case "saved":
				toast.success(t("autosave.saved"), {
					...options,
					duration: SAVED_DURATION_MS
				});
				break;
			case "invalid":
				toast.warning(t("autosave.invalid"), options);
				break;
			case "error":
				toast.error(errorMessage ?? t("autosave.error"), options);
				break;
			default:
				// A loading toast must not outlive the save it reported.
				if (from === "saving") toast.dismiss(AUTOSAVE_TOAST_ID);
		}
	}, [status, errorMessage, t]);

	// Leaving the page: no stale "Saving…" over the next one.
	useEffect(
		() => () => {
			toast.dismiss(AUTOSAVE_TOAST_ID);
		},
		[]
	);
};
