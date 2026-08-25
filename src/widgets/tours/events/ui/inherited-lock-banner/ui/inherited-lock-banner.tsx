import { LockIcon, ShieldWarningIcon } from "@solar-icons/react/outline";
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
			variant={isOverride ? "warning" : "secondary"}
			appearance="light"
			size="sm"
			role="status"
		>
			<AlertIcon>
				{isOverride ? <ShieldWarningIcon /> : <LockIcon />}
			</AlertIcon>
			<AlertContent className="space-y-0.5">
				<AlertTitle className="mb-0 text-sm font-medium">
					{title}
				</AlertTitle>
				{description ? (
					<AlertDescription className="text-muted-foreground">
						{description}
					</AlertDescription>
				) : null}
			</AlertContent>
		</Alert>
	);
};
