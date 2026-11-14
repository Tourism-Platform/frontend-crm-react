import { MapPointIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Badge, withErrorBoundary } from "@/shared/ui";

import type { IOptionDay } from "@/entities/tour/preview-tour";

import { OptionEventCard } from "./option-event-card";

interface IOptionDaySectionProps {
	day: IOptionDay;
}

/**
 * День маршрута: метка дня и город, ниже — лента событий. Линия ленты рисуется у каждого
 * события, кроме последнего: от низа его узла до узла следующего (через зазор `gap-4`)
 */
const OptionDaySectionBase: FC<IOptionDaySectionProps> = ({ day }) => {
	const { t } = useTranslation("preview_option_page");

	return (
		<section className="flex flex-col gap-4">
			<div className="flex items-center gap-3">
				<Badge size="md" className="font-semibold">
					{t("day.title", { n: day.day_number })}
				</Badge>
				{day.location ? (
					<span className="flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground">
						<MapPointIcon className="size-4" />
						{day.location}
					</span>
				) : null}
				<span className="h-px min-w-0 flex-1 bg-border" />
			</div>

			<ol className="flex flex-col gap-4">
				{day.events.map((event) => (
					<li
						key={event.id}
						className="relative flex gap-3 not-last:before:absolute not-last:before:top-10 not-last:before:-bottom-4 not-last:before:left-5 not-last:before:w-px not-last:before:-translate-x-1/2 not-last:before:bg-border sm:gap-4"
					>
						<OptionEventCard event={event} />
					</li>
				))}
			</ol>
		</section>
	);
};

export const OptionDaySection = withErrorBoundary(OptionDaySectionBase);
