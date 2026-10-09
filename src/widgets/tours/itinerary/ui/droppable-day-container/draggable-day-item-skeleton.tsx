import { type FC } from "react";

import { Card, CardContent, Skeleton } from "@/shared/ui";

/** Mirrors DraggableDayItem: round type icon + title/subtitle + grip button. */
export const DraggableDayItemSkeleton: FC = () => (
	<Card className="bg-background p-3">
		<CardContent className="flex items-start justify-between gap-3 p-0">
			<Skeleton className="size-9 shrink-0 rounded-full" />
			<div className="flex flex-1 flex-col gap-1.5 pt-0.5">
				<Skeleton className="h-4 w-3/4" />
				<Skeleton className="h-3 w-1/2" />
			</div>
			<Skeleton className="mr-3 size-9 shrink-0" />
		</CardContent>
	</Card>
);

/** List of event skeletons inside a day container. */
export const DayItemsSkeleton: FC<{ count?: number }> = ({ count = 3 }) =>
	Array.from({ length: count }, (_, i) => (
		<div key={i} className="mt-2 last:mb-2">
			<DraggableDayItemSkeleton />
		</div>
	));
