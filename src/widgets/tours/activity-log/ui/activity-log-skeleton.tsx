import { type FC } from "react";

import { ActivityLogItemSkeleton } from "@/entities/tour";

export const ActivityLogSkeleton: FC = () => {
	return (
		<div className="flex flex-col gap-6">
			{Array.from({ length: 5 }).map((_, index) => (
				<ActivityLogItemSkeleton key={index} />
			))}
		</div>
	);
};
