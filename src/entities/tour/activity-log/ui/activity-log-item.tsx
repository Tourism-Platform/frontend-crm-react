import { CircleCheckBig } from "lucide-react";
import { type FC } from "react";

import type { IActivityLogItem } from "../types";

interface IActivityLogItemProps {
	item: IActivityLogItem;
	isLast?: boolean;
}

export const ActivityLogItem: FC<IActivityLogItemProps> = ({
	item,
	isLast
}) => {
	return (
		<div className="flex gap-4 relative pb-6 last:pb-0">
			{/* Line */}
			{!isLast && (
				<div className="absolute left-[11px] top-6 bottom-0 w-[1px] bg-border" />
			)}

			{/* Icon */}
			<div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 border border-blue-100 text-blue-500 dark:bg-blue-900/20 dark:border-blue-900/30">
				<CircleCheckBig className="w-3 h-3" />
			</div>

			{/* Content */}
			<div className="flex flex-1 justify-between items-start gap-4">
				<p className="text-sm text-foreground">
					{item.title}{" "}
					<span className="text-muted-foreground">
						by {item.user}
					</span>
				</p>
				<span className="text-sm text-muted-foreground whitespace-nowrap">
					{item.date}
				</span>
			</div>
		</div>
	);
};
