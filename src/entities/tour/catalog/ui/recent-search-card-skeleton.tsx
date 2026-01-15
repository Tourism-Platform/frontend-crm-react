import { type FC } from "react";

import { Card, CardContent, Skeleton } from "@/shared/ui";

export const RecentSearchCardSkeleton: FC = () => {
	return (
		<Card className="min-w-[200px]">
			<CardContent className="grid grid-cols-[min-content_1fr] gap-5">
				<div className="flex items-center">
					<Skeleton className="size-5 shrink-0 rounded-md" />
				</div>
				<div className="flex flex-col gap-3 min-w-0 w-full">
					<Skeleton className="h-5 w-1/2" />
					<Skeleton className="h-4 w-3/4" />
				</div>
			</CardContent>
		</Card>
	);
};
