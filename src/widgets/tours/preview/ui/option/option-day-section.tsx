import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";
import { Badge } from "@/shared/ui/shadcn-ui/badge";

import type { IOptionDay } from "@/entities/tour/preview-tour";

import { OptionEventCard } from "./option-event-card";

interface IOptionDaySectionProps {
	day: IOptionDay;
	globalEventIndex: number;
}

const OptionDaySectionBase: FC<IOptionDaySectionProps> = ({
	day,
	globalEventIndex
}) => {
	const { t } = useTranslation("preview_option_page");

	return (
		<div className="pb-12 w-full min-w-0">
			<div className="flex items-center gap-2 mb-8">
				<Badge size="md" className="text-base shrink-0" variant="black">
					{t("day.title", { n: day.day_number })}
				</Badge>
				{day.location ? (
					<>
						<span className="w-1 h-1 rounded-full bg-primary shrink-0" />
						<span className="text-muted-foreground shrink-0">
							{day.location}
						</span>
					</>
				) : null}
				<div className="flex-1 border-t border-dashed ml-2 min-w-0" />
			</div>

			<div className="flex flex-col gap-8 w-full">
				{day.events.map((event, index) => (
					<OptionEventCard
						key={event.id}
						event={event}
						index={globalEventIndex + index}
					/>
				))}
			</div>
		</div>
	);
};

export const OptionDaySection = withErrorBoundary(OptionDaySectionBase);
