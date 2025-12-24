import { type FC, type ReactNode } from "react";

import { BoxOutlineIcon, ClockOutlineIcon } from "@/shared/assets";
import { Badge, type BadgeVariant } from "@/shared/ui";

interface ITourHeaderProps {
	title: string;
	badgeText?: string;
	badgeVariant?: BadgeVariant;
	duration?: string;
	type?: string;
	actions?: ReactNode;
}

export const TourHeader: FC<ITourHeaderProps> = ({
	title,
	badgeText,
	badgeVariant = "cyan",
	duration,
	type,
	actions
}) => {
	return (
		<div className="flex justify-between items-start w-full">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl">{title}</h1>
				<div className="flex items-center gap-4">
					{badgeText && (
						<Badge variant={badgeVariant}>{badgeText}</Badge>
					)}
					<div className="flex gap-4 items-center text-muted-foreground">
						{duration && (
							<div className="flex gap-2 items-center">
								<ClockOutlineIcon className="h-4" />
								<p className="text-sm">{duration}</p>
							</div>
						)}
						{type && (
							<div className="flex gap-2 items-center">
								<BoxOutlineIcon className="h-4" />
								<p className="text-sm">{type}</p>
							</div>
						)}
					</div>
				</div>
			</div>
			{actions && <div className="flex gap-2">{actions}</div>}
		</div>
	);
};
