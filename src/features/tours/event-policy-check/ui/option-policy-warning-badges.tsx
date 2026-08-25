import { ShieldWarningIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/shared/ui";

import { useOptionPolicyCheck } from "../model";

interface IOptionPolicyWarningBadgesProps {
	tourId: string;
	optionId: string;
}

export const OptionPolicyWarningBadges: FC<IOptionPolicyWarningBadgesProps> = ({
	tourId,
	optionId
}) => {
	const { t } = useTranslation("common_events");
	const { data, isLoading } = useOptionPolicyCheck({ tourId, optionId });

	if (isLoading || !data?.length) {
		return null;
	}

	return (
		<Badge variant="yellow" size="sm" className="gap-1">
			<ShieldWarningIcon className="h-3.5 w-3.5" />
			{t("policy_check.option_badge", { count: data.length })}
		</Badge>
	);
};
