import { type FC, useMemo } from "react";

import { Skeleton } from "@/shared/ui";

interface ICustomAccordionRangeSkeletonProps {
	count?: number;
}

export const CustomAccordionRangeSkeleton: FC<
	ICustomAccordionRangeSkeletonProps
> = ({ count = 20 }) => {
	const heights = useMemo(() => {
		return Array.from({ length: count }).map(() => Math.random() * 70 + 10);
	}, [count]);

	return (
		<div className="flex h-[100px] w-full items-end gap-1 px-2">
			{Array.from({ length: count }).map((_, i) => (
				<Skeleton
					key={i}
					className="flex-1"
					style={{
						height: `${heights[i]}%`
					}}
				/>
			))}
		</div>
	);
};
