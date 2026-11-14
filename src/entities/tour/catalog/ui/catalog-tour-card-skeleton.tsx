import type { FC } from "react";

import { Card, Skeleton } from "@/shared/ui";

/** Скелетон карточки сетки каталога — форма как у `CatalogTourCard`: обложка, цена, название, маршрут, метрики 2 × 2 */
export const CatalogTourCardSkeleton: FC = () => {
	return (
		<Card variant="glass" className="h-full gap-0 overflow-hidden p-1.5">
			<Skeleton className="aspect-[4/3] w-full shrink-0 rounded-md" />
			<div className="flex flex-1 flex-col gap-2 px-1.5 pt-3 pb-1.5">
				<Skeleton className="h-5 w-1/3" />
				<Skeleton className="h-4 w-4/5" />
				<Skeleton className="h-3 w-3/5" />
				<div className="mt-auto grid grid-cols-2 gap-x-3 gap-y-1.5 pt-2.5">
					<Skeleton className="h-3 w-4/5" />
					<Skeleton className="h-3 w-3/5" />
					<Skeleton className="h-3 w-3/5" />
					<Skeleton className="h-3 w-4/5" />
				</div>
			</div>
		</Card>
	);
};
