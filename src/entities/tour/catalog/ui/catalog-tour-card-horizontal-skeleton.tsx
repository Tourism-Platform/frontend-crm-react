import type { FC } from "react";

import { Card, Skeleton } from "@/shared/ui";

/** Скелетон длинной карточки — форма как у `CatalogTourCardHorizontal`: обложка слева, цена, название, маршрут, описание, метрики */
export const CatalogTourCardHorizontalSkeleton: FC = () => {
	return (
		<Card
			variant="glass"
			className="min-w-0 flex-row gap-0 overflow-hidden p-1.5"
		>
			<Skeleton className="min-h-44 w-2/5 shrink-0 self-stretch rounded-md sm:w-1/3" />
			<div className="flex min-w-0 flex-1 flex-col gap-2 px-3 py-1.5 sm:px-4">
				<Skeleton className="h-5 w-1/4" />
				<Skeleton className="h-4 w-3/4" />
				<Skeleton className="h-3 w-1/2" />
				<Skeleton className="h-3 w-full" />
				<div className="mt-auto grid grid-cols-2 gap-x-3 gap-y-1.5 pt-2.5 md:grid-cols-4">
					<Skeleton className="h-3 w-4/5" />
					<Skeleton className="h-3 w-3/5" />
					<Skeleton className="h-3 w-3/5" />
					<Skeleton className="h-3 w-4/5" />
				</div>
			</div>
		</Card>
	);
};
