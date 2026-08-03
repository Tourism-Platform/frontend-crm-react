import { type FC } from "react";

import { Skeleton } from "@/shared/ui";

export const ReconciliationIdSkeleton: FC = () => {
	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col gap-4">
				<Skeleton className="h-6 w-24" />
				<div className="grid grid-flow-col justify-between">
					<Skeleton className="h-10 w-82" />
					<Skeleton className="h-10 w-38" />
				</div>
			</div>
			<div className="grid grid-cols-3 gap-6">
				<Skeleton className="h-32 w-full" />
				<Skeleton className="h-32 w-full" />
				<Skeleton className="h-32 w-full" />
				<Skeleton className="h-32 w-full" />
				<Skeleton className="h-32 w-full" />
				<Skeleton className="h-32 w-full" />
			</div>
			<Skeleton className="h-96 w-full" />
		</div>
	);
};
