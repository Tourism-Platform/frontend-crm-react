import type { FC } from "react";

import { Card, CardContent, CardHeader } from "@/shared/ui";
import { Skeleton } from "@/shared/ui";
import { Separator } from "@/shared/ui";

export const TourCardSkeleton: FC = () => {
	return (
		<Card className="relative pt-10">
			<Skeleton className="h-35 ratio-16/9" />
			<CardHeader className="grid gap-2">
				<Skeleton className="h-5 w-20 rounded-full" />
				<Skeleton className="h-6 w-full" />
			</CardHeader>
			<div className="px-6">
				<Separator />
			</div>
			<CardContent className="grid gap-3">
				{[1, 2, 3].map((i) => (
					<Skeleton key={i} className="h-8 w-full rounded-md" />
				))}
			</CardContent>
		</Card>
	);
};
