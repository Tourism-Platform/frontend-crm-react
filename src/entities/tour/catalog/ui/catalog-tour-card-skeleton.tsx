import type { FC } from "react";

import { Card, CardContent, Skeleton } from "@/shared/ui";

export const CatalogTourCardSkeleton: FC = () => {
	return (
		<Card className="overflow-hidden pt-0">
			<Skeleton className="h-48 w-full" />
			<CardContent>
				<Skeleton className="h-7 w-3/4 mb-10" />
				<div className="grid gap-1 mb-5">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
				</div>
				<div className="flex justify-between items-center mt-auto">
					<Skeleton className="h-6 w-24 rounded-md" />
					<Skeleton className="h-7 w-28" />
				</div>
			</CardContent>
		</Card>
	);
};
