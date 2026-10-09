import { type FC } from "react";

import {
	Card,
	CardContent,
	CardHeader,
	Separator,
	Skeleton
} from "@/shared/ui";

import { DayItemsSkeleton } from "../droppable-day-container/draggable-day-item-skeleton";

/** Mirrors a board day column: "Day N" title + DroppableDayContainer card with events. */
export const DayColumnSkeleton: FC<{ itemsCount?: number }> = ({
	itemsCount = 3
}) => (
	<div className="flex h-full min-h-0 w-100 flex-shrink-0 flex-col">
		<div className="mb-3 flex h-6 shrink-0 items-center justify-center">
			<Skeleton className="h-4 w-16" />
		</div>
		<Card className="h-full min-h-0 gap-0 overflow-hidden rounded-lg pt-2 pb-0">
			<CardHeader className="flex shrink-0 justify-end pr-2 pb-3">
				<Skeleton className="size-9" />
			</CardHeader>
			<Separator />
			<CardContent className="min-h-0 flex-1 overflow-hidden px-3">
				<DayItemsSkeleton count={itemsCount} />
			</CardContent>
		</Card>
	</div>
);
