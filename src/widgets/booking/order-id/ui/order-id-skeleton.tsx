import { type FC } from "react";

import { Skeleton } from "@/shared/ui";

export const OrderIdSkeleton: FC = () => {
	return (
		<div className="flex flex-col gap-8">
			{/* Header Skeleton */}
			<div className="flex justify-between items-center">
				<div className="space-y-2">
					<Skeleton className="h-9 w-[220px]" />
					<div className="flex gap-2">
						<Skeleton className="h-6 w-[200px]" />
						<Skeleton className="h-6 w-[240px]" />
					</div>
				</div>
				<Skeleton className="h-9 w-[150px]" />
			</div>

			{/* Info Cards Skeleton */}
			<div className="grid grid-cols-2 gap-6">
				<Skeleton className="h-[280px] w-full rounded-xl" />
				<Skeleton className="h-[280px] w-full rounded-xl" />
			</div>

			{/* Detailed Info Skeleton */}
			<Skeleton className="h-[126px] w-full rounded-xl" />
			<Skeleton className="h-[400px] w-full rounded-xl" />
		</div>
	);
};
