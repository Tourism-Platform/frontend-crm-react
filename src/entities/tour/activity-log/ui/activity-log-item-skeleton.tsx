import { type FC } from "react";

import { Skeleton } from "@/shared/ui";

export const ActivityLogItemSkeleton: FC = () => {
	return (
		<div className="flex gap-4 relative">
			<Skeleton className="w-6 h-6 rounded-full" />
			<div className="flex flex-1 justify-between items-start gap-4 pt-1">
				<Skeleton className="h-4 w-1/3" />
				<Skeleton className="h-4 w-42" />
			</div>
		</div>
	);
};
