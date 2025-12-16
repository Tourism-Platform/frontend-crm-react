import { MoreHorizontal } from "lucide-react";
import { type FC } from "react";
import { Link } from "react-router-dom";

import { FlagIcon, MoneysIcon, UsersOutlineIcon } from "@/shared/assets";
import { ENUM_PATH } from "@/shared/config";
import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Separator
} from "@/shared/ui";

import type { ITourCard } from "../types";

interface ITourCardProps {
	data: ITourCard;
}

export const TourCard: FC<ITourCardProps> = ({ data: card }) => {
	return (
		<Card className="relative pt-10">
			<MoreHorizontal className="absolute top-2 right-4" />
			<img
				src="https://www.atorus.ru/sites/default/files/styles/head_carousel/public/2021-09/ca3023.jpg.webp?itok=Wg-lCwZ0"
				alt=""
				className="max-h-35 object-cover ratio-16/9"
			/>
			<CardHeader className="grid gap-2">
				<Badge>{card.status}</Badge>
				<CardTitle className="truncate">
					<Link
						className="hover:underline hover:text-primary"
						to={ENUM_PATH.TOURS.OVERVIEW.replace(
							":tourId",
							card.id
						)}
					>
						{card.title}
					</Link>
				</CardTitle>
			</CardHeader>
			<div className="px-6">
				<Separator />
			</div>
			<CardContent className="grid gap-3">
				<div className="bg-accent px-3 py-2 rounded-md text-muted-foreground text-xs flex gap-2 items-center">
					<FlagIcon className="h-4" />
					<p>{card?.route?.join("-")}</p>
				</div>
				<div className="bg-accent px-3 py-2 rounded-md text-muted-foreground text-xs flex gap-2 items-center">
					<UsersOutlineIcon className="h-4" />
					<p>{card.type}</p>
				</div>
				<div className="bg-accent px-3 py-2 rounded-md text-muted-foreground text-xs flex gap-2 items-center">
					<MoneysIcon className="h-4" />
					<p>
						{card.price_from} - {card.price_to}
					</p>
				</div>
			</CardContent>
		</Card>
	);
};
