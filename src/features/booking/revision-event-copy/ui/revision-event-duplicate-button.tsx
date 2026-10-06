import { CopyIcon } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";

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
		<Button
			type="button"
			variant="outline"
			size="sm"
			disabled={isLoading}
			onClick={() => void duplicate(eventId).catch(() => undefined)}
		>
			<CopyIcon className="size-4" aria-hidden="true" />
			{t("copy.duplicate")}
		</Button>
	);
};
