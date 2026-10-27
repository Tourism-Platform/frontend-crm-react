import { CalendarMarkIcon, GalleryIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/shared/ui";

import { TOUR_TYPE_LABELS } from "../config";
import { TOUR_STATUS_LABELS, TOUR_STATUS_VARIANTS } from "../constants";
import type { TTourSelectOption } from "../types";

type TTourOptionCardProps = {
	option: TTourSelectOption;
};

export const TourOptionCard: FC<TTourOptionCardProps> = ({ option }) => {
	const { t } = useTranslation(["options", "tours_page"]);

	const durationLabel = t("card.duration", {
		ns: "tours_page",
		days: option.days ?? 0,
		nights: option.nights ?? 0,
		daysUnit: t("tour.duration.days", { ns: "options" }),
		nightsUnit: t("tour.duration.nights", { ns: "options" })
	});

	return (
		<div className="flex items-start gap-2.5 text-left">
			<div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
				{option.imageUrl ? (
					<img
						src={option.imageUrl}
						alt={option.title}
						className="size-full object-cover"
					/>
				) : (
					<GalleryIcon className="size-5 text-muted-foreground/50" />
				)}
			</div>
			<div className="min-w-0 flex flex-1 flex-col gap-1">
				<div className="flex items-center justify-between gap-2">
					<p className="truncate text-sm font-medium leading-tight text-foreground">
						{option.title}
					</p>
					<Badge
						size="sm"
						variant={TOUR_STATUS_VARIANTS[option.status]}
					>
						{t(TOUR_STATUS_LABELS[option.status], {
							ns: "options"
						})}
					</Badge>
				</div>
				<p className="flex items-center gap-1.5 truncate text-xs leading-tight text-muted-foreground">
					<CalendarMarkIcon className="size-3.5 shrink-0" />
					<span className="truncate">
						{durationLabel} ·{" "}
						{t(TOUR_TYPE_LABELS[option.type], { ns: "options" })}
					</span>
				</p>
				{!!option.route.length && (
					<p className="truncate text-xs leading-tight text-muted-foreground">
						{option.route.join(" → ")}
					</p>
				)}
			</div>
		</div>
	);
};
