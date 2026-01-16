import { type FC } from "react";

import { MapPinIcon } from "@/shared/assets";
import { useFormatDateRange } from "@/shared/hooks";
import { Card, CardContent } from "@/shared/ui";

import { type IRecentSearch } from "../types";

interface IRecentSearchCardProps {
	data: IRecentSearch;
	onClick?: () => void;
}

export const RecentSearchCard: FC<IRecentSearchCardProps> = ({
	data,
	onClick
}) => {
	const { formatDateRange } = useFormatDateRange();
	return (
		<Card
			className="cursor-pointer hover:shadow-md transition-shadow min-w-[200px]"
			onClick={onClick}
		>
			<CardContent className="gap-5 grid grid-cols-[min-content_1fr]">
				<div className="flex items-center">
					<MapPinIcon className="size-5" />
				</div>
				<div className="flex flex-col gap-1 min-w-0">
					<span className="font-medium truncate">{data.label}</span>
					<span className="text-sm text-muted-foreground truncate">
						{formatDateRange({
							from: new Date(data.dates.from),
							to: new Date(data.dates.to)
						})}
					</span>
				</div>
			</CardContent>
		</Card>
	);
};
