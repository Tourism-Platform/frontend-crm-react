import { type FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useEventPolicyCheck } from "../model";

import { EventPolicyWarningItem } from "./event-policy-warning-item";

export const EventPolicyWarnings: FC = () => {
	const { t } = useTranslation("common_events");
	const { data, isError, isLoading } = useEventPolicyCheck();

	useEffect(() => {
		if (isError) {
			toast.error(t("policy_check.toasts.error"));
		}
	}, [isError, t]);

	if (isLoading || !data?.length) {
		return null;
	}

	return (
		<div className="grid gap-2">
			{data.map((warning) => (
				<EventPolicyWarningItem
					key={`${warning.eventId}-${warning.code}-${warning.path.join(".")}`}
					warning={warning}
				/>
			))}
		</div>
	);
};
