import type { FC } from "react";

import { Separator, Skeleton } from "@/shared/ui";

export const ItineraryLoadingSkeleton: FC = () => {
	return (
		<div className="flex h-full flex-col">
			<div className="flex gap-2 px-2 py-3">
				<Skeleton className="h-10 w-28" />
				<Skeleton className="h-10 w-28" />
				<Skeleton className="h-10 w-28" />
			</div>

			<Separator />

			<div className="flex flex-1 overflow-hidden p-4">
				<div className="flex flex-1 gap-4">
					<Skeleton className="h-full min-h-[320px] flex-1" />
					<Skeleton className="h-full min-h-[320px] flex-1" />
					<Skeleton className="h-full min-h-[320px] flex-1" />
				</div>
				<Skeleton className="ml-4 h-full min-h-[320px] w-64 shrink-0" />
			</div>
		</div>
	);
};
