import { type FC } from "react";

import { Card, CardContent, Skeleton } from "@/shared/ui";

const TITLE_WIDTHS = ["70%", "55%", "80%", "60%", "75%"];

/** Mirrors DraggableLibraryItem: type icon + title + grip button. */
export const DraggableLibraryItemSkeleton: FC<{ width?: string }> = ({
	width = "70%"
}) => (
	<Card className="bg-background py-2">
		<CardContent className="grid grid-cols-[auto_1fr_auto] items-center gap-3 pr-1">
			<Skeleton className="size-4 rounded-md" />
			<Skeleton className="h-4" style={{ width }} />
			<Skeleton className="size-9" />
		</CardContent>
	</Card>
);

/** List of library item skeletons (initial load and infinite scroll). */
export const DraggableLibraryItemsSkeleton: FC<{ count?: number }> = ({
	count = 5
}) =>
	Array.from({ length: count }, (_, i) => (
		<DraggableLibraryItemSkeleton
			key={i}
			width={TITLE_WIDTHS[i % TITLE_WIDTHS.length]}
		/>
	));
