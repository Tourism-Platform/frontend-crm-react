import type { FC } from "react";

import { Separator, Skeleton } from "@/shared/ui";

import { DayColumnSkeleton } from "./board/day-column-skeleton";

export const ItineraryLoadingSkeleton: FC = () => {
	return (
		<div className="flex min-h-0 flex-1 flex-col">
			<div className="flex gap-2 px-2 py-3">
				<Skeleton className="h-10 w-28" />
				<Skeleton className="h-10 w-28" />
				<Skeleton className="h-10 w-28" />
			</div>

			<Separator />

			<div className="flex min-h-0 flex-1 overflow-hidden">
				<div className="flex min-w-0 flex-1 gap-4 overflow-hidden p-4">
					<DayColumnSkeleton />
					<DayColumnSkeleton itemsCount={2} />
					<DayColumnSkeleton itemsCount={4} />
				</div>
				<Skeleton className="m-4 ml-0 h-auto w-64 shrink-0" />
			</div>
		</div>
	);
};
