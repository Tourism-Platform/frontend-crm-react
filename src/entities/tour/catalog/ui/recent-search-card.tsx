import { type FC } from "react";

import { MapPinIcon } from "@/shared/assets";
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
	const formatDate = (dateStr?: string) => {
		if (!dateStr) return "";
		return new Intl.DateTimeFormat("ru-RU", {
			weekday: "short",
			day: "numeric",
			month: "long"
		}).format(new Date(dateStr));
	};

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
					<span className="font-medium truncate">
						{data.destination}
					</span>
					<span className="text-sm text-muted-foreground truncate">
						{data.dates?.from ? formatDate(data.dates.from) : ""} -{" "}
						{data.dates?.to ? formatDate(data.dates.to) : ""}
					</span>
				</div>
			</CardContent>
		</Card>
	);
};
