import { CopyIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { LoaderButton } from "@/shared/ui";

import { useRevisionEventCopy } from "../model";

interface IRevisionEventDuplicateButtonProps {
	bookingId: string;
	eventId: string;
}

export const RevisionEventDuplicateButton: FC<
	IRevisionEventDuplicateButtonProps
> = ({ bookingId, eventId }) => {
	const { t } = useTranslation("common_events");
	const { duplicate, isLoading } = useRevisionEventCopy(bookingId);

	if (!eventId) {
		return null;
	}

	return (
		<LoaderButton
			type="button"
			size="sm"
			disabled={isLoading}
			onClick={() => void duplicate(eventId).catch(() => undefined)}
			icon={<CopyIcon />}
			label={t("copy.duplicate")}
		/>
	);
};
