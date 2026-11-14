import { ClockCircleIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Card, PreviewerSimple, withErrorBoundary } from "@/shared/ui";

import type { IOptionEvent } from "@/entities/tour/preview-tour";

import { OPTION_EVENT_ICONS } from "../../model/config/option-event-icons.config";

import { OptionEventDetailSheet } from "./option-event-detail-sheet";

interface IOptionEventCardProps {
	event: IOptionEvent;
}

/**
 * Событие в ленте дня: узел с иконкой вида и компактная карточка — содержимое `<li>`
 * из `OptionDaySection` (там же линия ленты; запасной блок `ErrorBoundary` остаётся внутри `<li>`).
 * Фото — миниатюрой справа (на узком экране — сверху), только если оно есть
 */
const OptionEventCardBase: FC<IOptionEventCardProps> = ({ event }) => {
	const { t } = useTranslation("preview_option_page");

	const Icon = OPTION_EVENT_ICONS[event.type];
	const isMultiply = Boolean(event.sub_options?.length);
	const cardImage = event.sheet.images[0];
	const infoTimes =
		event.sheet.extra.kind === "info" ? event.sheet.extra : null;
	const timeRange = infoTimes
		? [infoTimes.startTime, infoTimes.endTime].filter(Boolean).join(" – ")
		: "";

	return (
		<>
			<span className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-card text-primary shadow-xs">
				<Icon className="size-5" />
			</span>

			<Card
				variant="glass"
				className="min-w-0 flex-1 gap-4 p-4 sm:flex-row"
			>
				{cardImage?.imagePath ? (
					<div className="relative aspect-video shrink-0 overflow-hidden rounded-lg bg-muted sm:order-last sm:aspect-[4/3] sm:w-44 sm:self-start">
						<img
							src={cardImage.imagePath}
							alt={event.title}
							className="absolute inset-0 size-full object-cover"
						/>
					</div>
				) : null}

				<div className="flex min-w-0 flex-1 flex-col gap-2">
					<div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
						<h4 className="leading-snug font-semibold">
							{event.title}
							{isMultiply &&
								` ${t("sections.option.one_of_them")}`}
						</h4>
						{timeRange ? (
							<span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground tabular-nums">
								<ClockCircleIcon className="size-3.5" />
								{timeRange}
							</span>
						) : null}
					</div>

					<PreviewerSimple
						text={event.description}
						lines={3}
						className="text-sm leading-relaxed text-muted-foreground"
					/>

					{isMultiply ? (
						<div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
							{event.sub_options?.map((subOption) => (
								<div
									key={subOption.id}
									className="flex min-w-0 flex-col gap-1.5 rounded-lg bg-muted/40 p-3"
								>
									<h5 className="text-sm font-semibold">
										{subOption.title}
									</h5>
									<PreviewerSimple
										text={subOption.description}
										lines={2}
										className="text-xs leading-relaxed text-muted-foreground"
									/>
									<OptionEventDetailSheet
										source={subOption}
										variant="xs"
									/>
								</div>
							))}
						</div>
					) : (
						<OptionEventDetailSheet source={event} />
					)}
				</div>
			</Card>
		</>
	);
};

export const OptionEventCard = withErrorBoundary(OptionEventCardBase);
