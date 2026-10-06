import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useCopyRevisionEventMutation } from "@/entities/booking";

import { resolveCopyEventErrorMessage } from "@/features/tours/copy-event";

/**
 * Duplicates an event of the booking's revised snapshot — the copy lands
 * right after its source and the edit log gets a `create` entry.
 */
export const useRevisionEventCopy = (bookingId: string) => {
	const { t } = useTranslation("common_events");
	const [copyRevisionEvent, { isLoading }] = useCopyRevisionEventMutation();

	const duplicate = (eventId: string) => {
		const promise = copyRevisionEvent({
			bookingId,
			source: { kind: "revision", eventId }
		}).unwrap();

		toast.promise(promise, {
			loading: t("copy.toasts.revision_duplicate.loading"),
			success: t("copy.toasts.revision_duplicate.success"),
			error: (error: unknown) =>
				t(
					resolveCopyEventErrorMessage(
						error,
						"copy.toasts.revision_duplicate.error"
					)
				)
		});

		return promise;
	};

	return { duplicate, isLoading };
};
