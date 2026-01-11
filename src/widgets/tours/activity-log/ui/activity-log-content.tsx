import type { FC } from "react";

import { ActivityLogItem, type IActivityLogItem } from "@/entities/tour";

interface IActivityLogContentProps {
	items: IActivityLogItem[];
}

export const ActivityLogContent: FC<IActivityLogContentProps> = ({ items }) => {
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
