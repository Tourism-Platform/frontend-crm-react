import { ShieldWarningIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle
} from "@/shared/ui";

import type { ISupplierPolicyWarning } from "@/entities/tour";

import {
	POLICY_WARNING_TITLE_KEYS,
	formatPolicySurchargeLabel
} from "../model";

interface IEventPolicyWarningItemProps {
	warning: ISupplierPolicyWarning;
}

export const EventPolicyWarningItem: FC<IEventPolicyWarningItemProps> = ({
	warning
}) => {
	const { t } = useTranslation("common_events");
	const hasSurcharge = warning.expectedSurcharge != null;
	const surchargeLabel = warning.expectedSurcharge
		? formatPolicySurchargeLabel(warning.expectedSurcharge)
		: null;

	const surchargeText = (() => {
		if (!surchargeLabel) {
			return null;
		}
		if (surchargeLabel.kind === "fixed") {
			return t("policy_check.surcharge.fixed", {
				val: surchargeLabel.val,
				currency: surchargeLabel.currency
			});
		}
		return t("policy_check.surcharge.percentage", {
			percentage: Math.round(surchargeLabel.percentage * 100)
		});
	})();

	return (
		<Alert
			variant={hasSurcharge ? "warning" : "secondary"}
			appearance="light"
			size="sm"
			role="status"
		>
			<AlertIcon>
				<ShieldWarningIcon />
			</AlertIcon>
			<AlertContent className="space-y-0.5">
				<AlertTitle className="mb-0 text-sm font-medium">
					{t(POLICY_WARNING_TITLE_KEYS[warning.code])}
				</AlertTitle>
				<AlertDescription className="text-muted-foreground">
					{warning.detail}
					{hasSurcharge && surchargeText ? (
						<span className="mt-1 block">{surchargeText}</span>
					) : (
						<span className="mt-1 block">
							{t("policy_check.warn_only")}
						</span>
					)}
				</AlertDescription>
			</AlertContent>
		</Alert>
	);
};
