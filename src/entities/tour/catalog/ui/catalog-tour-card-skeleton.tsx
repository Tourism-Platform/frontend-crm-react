import type { FC } from "react";

import { Card, CardContent, Skeleton } from "@/shared/ui";

export const CatalogTourCardSkeleton: FC = () => {
	return (
		<Card className="overflow-hidden">
			<Skeleton className="h-48 w-full" />
			<CardContent className="p-4">
				<Skeleton className="h-6 w-3/4 mb-2" />
				<Skeleton className="h-4 w-full mb-4" />
				<div className="flex justify-between items-center mt-auto">
					<div className="flex flex-col gap-1">
						<Skeleton className="h-3 w-16" />
						<Skeleton className="h-5 w-24" />
					</div>
					<Skeleton className="h-8 w-20 rounded-md" />
				</div>
			</CardContent>
		</Card>
	);
};
