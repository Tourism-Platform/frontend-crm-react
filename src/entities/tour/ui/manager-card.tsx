import { type FC } from "react";

import { Avatar, AvatarFallback, AvatarImage, Badge } from "@/shared/ui";

import type { IManager } from "../types";

interface IManagerCardProps {
	card: IManager;
}

export const ManagerCard: FC<IManagerCardProps> = ({ card }) => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex gap-2 items-center">
				<Avatar className="size-8 border-accent border">
					<AvatarImage src={card?.image_url} alt="Profile image" />
					<AvatarFallback className="text-lg">
						{card?.email?.slice(0, 1).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div className="grid">
					<p className="text-sm">
						{card?.first_name} {card?.last_name}
					</p>
					<p className="text-xs">{card?.email}</p>
				</div>
			</div>
			<Badge className="px-3 py-2">{card?.role}</Badge>
		</div>
	);
};
