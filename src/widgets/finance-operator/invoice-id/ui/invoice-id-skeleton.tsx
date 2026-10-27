import { type FC } from "react";

import { Skeleton } from "@/shared/ui";

export const InvoiceIdSkeleton: FC = () => {
	return (
		<div className="flex flex-1 flex-col gap-5">
			<Skeleton className="h-32 w-full" />
			<Skeleton className="h-64 w-full" />
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<Skeleton className="h-48 w-full" />
				<Skeleton className="h-48 w-full" />
			</div>
		</div>
	);
};
