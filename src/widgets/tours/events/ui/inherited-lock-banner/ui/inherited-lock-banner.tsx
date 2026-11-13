import {
	LockKeyholeMinimalisticIcon,
	ShieldWarningIcon
} from "@solar-icons/react/outline";
import { type FC } from "react";

import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle
} from "@/shared/ui";

export type TInheritedLockBannerVariant = "lock" | "override";

export interface IInheritedLockBannerProps {
	title: string;
	description?: string;
	variant?: TInheritedLockBannerVariant;
}

export const InheritedLockBanner: FC<IInheritedLockBannerProps> = ({
	title,
	description,
	variant = "lock"
}) => {
	const isOverride = variant === "override";

	return (
		<Alert
			variant={isOverride ? "warning" : "primary"}
			appearance="light"
			role="status"
		>
			<AlertIcon>
				{isOverride ? (
					<ShieldWarningIcon />
				) : (
					<LockKeyholeMinimalisticIcon />
				)}
			</AlertIcon>
			<AlertContent className="space-y-1">
				<AlertTitle>{title}</AlertTitle>
				{description ? (
					<AlertDescription className="text-muted-foreground">
						{description}
					</AlertDescription>
				) : null}
			</AlertContent>
		</Alert>
	);
};
