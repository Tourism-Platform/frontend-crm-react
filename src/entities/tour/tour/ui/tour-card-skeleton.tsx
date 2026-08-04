import type { FC } from "react";

import { Card, CardContent, CardHeader, Skeleton } from "@/shared/ui";

export const TourCardSkeleton: FC = () => {
	return (
		<Card className="relative h-full gap-0 overflow-hidden pt-0 pb-4">
			<Skeleton className="h-48 w-full shrink-0 rounded-none" />
			<CardHeader className="grid gap-2.5 pb-3 pt-4">
				<Skeleton className="h-6 w-4/5" />
				<div className="flex gap-1">
					<Skeleton className="h-5 w-24 rounded-full" />
					<Skeleton className="h-5 w-20 rounded-full" />
				</div>
			</CardHeader>
			<CardContent className="mt-auto grid grid-cols-2 gap-2">
				{[1, 2, 3, 4].map((i) => (
					<Skeleton key={i} className="h-8 w-full rounded-md" />
				))}
			</CardContent>
		</Card>
	);
};
