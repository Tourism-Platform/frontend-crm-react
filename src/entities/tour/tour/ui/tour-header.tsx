import { type FC, type ReactNode } from "react";

import { BoxOutlineIcon, ClockOutlineIcon } from "@/shared/assets";
import { Badge, type BadgeVariant, Skeleton } from "@/shared/ui";

interface ITourHeaderProps {
	pageName: string;
	tourTitle?: string;
	badgeText?: string;
	badgeVariant?: BadgeVariant;
	duration?: string;
	type?: string;
	actions?: ReactNode;
	isLoading?: boolean;
}

export const TourHeader: FC<ITourHeaderProps> = ({
	pageName,
	tourTitle = "—",
	badgeText,
	badgeVariant = "cyan",
	duration,
	type,
	actions,
	isLoading
}) => {
	return (
		<div className="flex justify-between items-start w-full">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl flex items-center gap-2">
					{pageName}:{" "}
					{isLoading ? <Skeleton className="h-7 w-64" /> : tourTitle}
				</h1>
				<div className="flex items-center gap-4">
					{isLoading ? (
						<Skeleton className="h-5 w-15" />
					) : (
						badgeText && (
							<Badge variant={badgeVariant}>{badgeText}</Badge>
						)
					)}
					<div className="flex gap-4 items-center text-muted-foreground">
						{(duration || isLoading) && (
							<div className="flex gap-2 items-center">
								<ClockOutlineIcon className="h-4" />
								{isLoading ? (
									<Skeleton className="h-4 w-16" />
								) : (
									<p className="text-sm">{duration}</p>
								)}
							</div>
						)}
						{(type || isLoading) && (
							<div className="flex gap-2 items-center">
								<BoxOutlineIcon className="h-4" />
								{isLoading ? (
									<Skeleton className="h-4 w-16" />
								) : (
									<p className="text-sm">{type}</p>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
			{actions && !isLoading && (
				<div className="flex gap-2">{actions}</div>
			)}
		</div>
	);
};
