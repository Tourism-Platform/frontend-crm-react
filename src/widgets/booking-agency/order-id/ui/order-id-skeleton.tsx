import { type FC } from "react";

import { Skeleton } from "@/shared/ui";

export const OrderHeaderSkeleton: FC = () => (
	<div className="flex flex-1 flex-col gap-5">
		<Skeleton className="h-9 w-32" />
		<div className="flex flex-wrap items-center justify-between gap-3">
			<div className="space-y-3">
				<Skeleton className="h-9 w-[220px]" />
				<div className="flex flex-wrap gap-2">
					<Skeleton className="h-6 w-[200px]" />
					<Skeleton className="h-6 w-[240px]" />
				</div>
			</div>
		</div>
	</div>
);

export const OrderInfoCardsSkeleton: FC = () => (
	<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
		<Skeleton className="h-[280px] w-full rounded-xl" />
		<Skeleton className="h-[280px] w-full rounded-xl" />
	</div>
);

export const OrderSectionCardSkeleton: FC<{ height?: string }> = ({
	height = "h-[400px]"
}) => <Skeleton className={`${height} w-full rounded-xl`} />;
