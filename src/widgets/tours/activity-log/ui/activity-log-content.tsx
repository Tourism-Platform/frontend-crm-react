import type { FC } from "react";

import { withErrorBoundary } from "@/shared/ui";

import { ActivityLogItem, type IActivityLogItem } from "@/entities/tour";

interface IActivityLogContentProps {
	items: IActivityLogItem[];
}

const ActivityLogContentBase: FC<IActivityLogContentProps> = ({ items }) => {
	return (
		<div className="flex flex-col">
			{items.map((item, index) => (
				<ActivityLogItem
					key={item.id}
					item={item}
					isLast={index === items.length - 1}
				/>
			))}
		</div>
	);
};

export const ActivityLogContent = withErrorBoundary(ActivityLogContentBase);
