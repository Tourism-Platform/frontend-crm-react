import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";

import type { IOptionDay } from "@/entities/tour/preview-tour/types";
import { ENUM_EVENT } from "@/entities/tour/tour/types/event.types";

import { OptionEventCard } from "./option-event-card";
import { OptionEventOptionsCard } from "./option-event-options-card";

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
		<div className="flex gap-4">
			<div className="flex flex-col items-center gap-2">
				<div className="w-12 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-medium z-10 shrink-0">
					{t("sections.option.day")} {day.day_number}
				</div>
				<div className="w-[1px] h-full bg-border border-dashed border-l last:hidden" />
			</div>

			<div className="flex-1 pb-12 w-full min-w-0">
				<div className="flex items-center gap-2 mb-8">
					<span className="w-1 h-1 rounded-full bg-primary" />
					<span className="text-muted-foreground">
						{day.location}
					</span>
					<div className="flex-1 border-t border-dashed ml-4" />
				</div>

				<div className="flex flex-col gap-8 w-full">
					{day.events.map((event, index) => {
						const currentIndex = globalEventIndex + index;

						if (
							event.type === ENUM_EVENT.ACCOMMODATION ||
							event.type === ENUM_EVENT.MULTIPLY_OPTION
						) {
							return (
								<OptionEventOptionsCard
									key={event.id}
									event={event}
									index={currentIndex}
								/>
							);
						}

						return (
							<OptionEventCard
								key={event.id}
								event={event}
								index={currentIndex}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export const OptionDaySection = withErrorBoundary(OptionDaySectionBase);
