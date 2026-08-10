import { type FC } from "react";

import { Skeleton } from "@/shared/ui";

type TAgencyOptionCardSkeletonProps = {
	count?: number;
};

export const AgencyOptionCardSkeleton: FC<TAgencyOptionCardSkeletonProps> = ({
	count = 5
}) => (
	<div className="flex flex-col gap-1 p-1">
		{Array.from({ length: count }).map((_, index) => (
			<div key={index} className="flex items-start gap-2.5 px-2 py-1.5">
				<Skeleton className="size-8 shrink-0 rounded-full" />
				<div className="flex w-full flex-col gap-1.5 pt-0.5">
					<Skeleton className="h-3.5 w-2/3" />
					<Skeleton className="h-3 w-1/2" />
					<Skeleton className="h-3 w-3/4" />
				</div>
			</div>
		))}
	</div>
);
