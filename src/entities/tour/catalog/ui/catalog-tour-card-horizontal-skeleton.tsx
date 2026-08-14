import type { FC } from "react";

import { Card, Skeleton } from "@/shared/ui";

export const CatalogTourCardHorizontalSkeleton: FC = () => (
	<Card className="relative flex min-w-0 flex-row items-stretch gap-0 overflow-hidden py-0">
		<div className="relative min-h-40 w-1/2 shrink-0 self-stretch overflow-hidden bg-muted md:w-1/3">
			<Skeleton className="absolute inset-0 size-full rounded-none" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col gap-2 px-3 py-3 sm:gap-2.5 sm:px-4 sm:py-4">
			<div className="flex min-w-0 flex-col gap-1.5">
				<Skeleton className="h-4 w-2/5" />
				<Skeleton className="h-4 w-3/5" />
				<div className="flex gap-1">
					<Skeleton className="h-5 max-w-32 w-full rounded-full" />
					<Skeleton className="h-5 max-w-32 w-full rounded-full" />
				</div>
				<div className="grid gap-1">
					<Skeleton className="h-3 w-full" />
					<Skeleton className="h-3 w-5/6" />
				</div>
			</div>
			<div className="grid grid-cols-2 gap-1.5 sm:gap-2">
				{Array.from({ length: 4 }).map((_, index) => (
					<Skeleton
						key={index}
						className="h-[30px] w-full rounded-md"
					/>
				))}
			</div>
			<div className="mt-auto border-t pt-2.5">
				<Skeleton className="h-4 w-28 sm:h-5" />
			</div>
		</div>
	</Card>
);
