import { type FC } from "react";

import { Skeleton } from "@/shared/ui";

type TBookingOrderOptionCardSkeletonProps = {
	count?: number;
};

export const BookingOrderOptionCardSkeleton: FC<
	TBookingOrderOptionCardSkeletonProps
> = ({ count = 4 }) => (
	<div className="flex flex-col gap-1 p-1">
		{Array.from({ length: count }).map((_, index) => (
			<div key={index} className="flex flex-col gap-1.5 px-2 py-1.5">
				<Skeleton className="h-3.5 w-1/2" />
				<Skeleton className="h-3 w-3/4" />
				<Skeleton className="h-3 w-2/3" />
				<Skeleton className="h-3 w-4/5" />
				<div className="flex items-center gap-2 pt-0.5">
					<Skeleton className="h-5 w-16 rounded-md" />
					<Skeleton className="h-3 w-24" />
				</div>
			</div>
		))}
	</div>
);
