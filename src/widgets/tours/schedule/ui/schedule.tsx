import { type FC, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
	Card,
	CardContent,
	CustomOptionTabs,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	withErrorBoundary
} from "@/shared/ui";

import { useGetScheduleQuery } from "@/entities/tour";

import {
	ConnectedTourHeader,
	PreviewTourButton,
	PublishTourButton
} from "@/features/tours";

import {
	DATES_TYPE_LIST,
	ENUM_DATES_TYPE,
	type ENUM_DATES_TYPE_TYPE
} from "../model";
import {
	type TRecurrencePatternDraft,
	useExcludedDateToggle,
	useFixedDateToggle
} from "../model/hooks";
import {
	type ICalendarRange,
	getCalendarRangeForMonth
} from "../model/lib/calendar-range";
import {
	expandRecurrenceFromRules,
	expandRecurrenceOccurrences
} from "../model/lib/expand-recurrence-occurrences";

import { CalendarInfo } from "./calendar-info";
import { RecurringCalendarInfo } from "./recurring-calendar-info";
import { RecurringPattern } from "./recurring-pattern";
import { SeasonalityInfo } from "./seasonality-info";
import { SelectedDates } from "./selected-dates";
import { Switcher } from "./switcher";

const ScheduleBase: FC = () => {
	const { t } = useTranslation("tour_schedule_page");
	const { tourId = "" } = useParams<{ tourId: string }>();

	const [activeTab, setActiveTab] = useState<ENUM_DATES_TYPE_TYPE>(
		DATES_TYPE_LIST[0].value
	);
	const [calendarRange, setCalendarRange] = useState<ICalendarRange>(() =>
		getCalendarRangeForMonth(new Date())
	);

	const { data: scheduleData } = useGetScheduleQuery(
		{
			tourId,
			from: calendarRange.from,
			to: calendarRange.to
		},
		{ skip: !tourId }
	);

	const actionsJsx = useMemo(
		() => (
			<>
				<PreviewTourButton />
				<PublishTourButton />
			</>
		),
		[]
	);

	const fixedDates = scheduleData?.fixedDates ?? [];
	const excludedDates = scheduleData?.excludedDates ?? [];

	const { displayFixedDates, handleCalendarSelect, removeFixedDate } =
		useFixedDateToggle({ tourId, fixedDates });

	const { displayExcludedDates, excludeDate, restoreDate } =
		useExcludedDateToggle({ tourId, excludedDates });

	const recurrenceRules = scheduleData?.recurrenceRules ?? [];
	const isSeasonal = scheduleData?.schedule.isSeasonal ?? false;
	const isFixedTab = activeTab === ENUM_DATES_TYPE.FIXED_DATES;

	const [patternDraft, setPatternDraft] = useState<TRecurrencePatternDraft>({
		days: [],
		from: undefined,
		to: undefined
	});

	const handlePatternDraftChange = useCallback(
		(draft: TRecurrencePatternDraft) => {
			setPatternDraft(draft);
		},
		[]
	);

	const displayOccurrences = useMemo(() => {
		const { days, from, to } = patternDraft;

		if (days.length > 0) {
			return expandRecurrenceOccurrences(
				days,
				calendarRange.from,
				calendarRange.to,
				from,
				to
			);
		}

		return expandRecurrenceFromRules(
			recurrenceRules,
			calendarRange.from,
			calendarRange.to
		);
	}, [calendarRange.from, calendarRange.to, patternDraft, recurrenceRules]);

	return (
		<section className="flex flex-col gap-6 container">
			<ConnectedTourHeader title={t("page_name")} actions={actionsJsx} />
			<Card>
				<CardContent className="grid gap-12">
					<div className="flex justify-between gap-6 items-center">
						<CustomOptionTabs
							defaultValue={DATES_TYPE_LIST[0].value}
							value={activeTab}
							onValueChange={(val) =>
								setActiveTab(val as ENUM_DATES_TYPE_TYPE)
							}
						>
							<CustomOptionTabsList className="grid grid-cols-2">
								{DATES_TYPE_LIST.map((tab) => (
									<CustomOptionTabsTrigger
										key={tab.value}
										value={tab.value}
									>
										{t(tab.label)}
									</CustomOptionTabsTrigger>
								))}
							</CustomOptionTabsList>
						</CustomOptionTabs>
						<Switcher tourId={tourId} checked={isSeasonal} />
					</div>

					{isFixedTab ? (
						<>
							<div className="flex items-center justify-center">
								<CalendarInfo
									fixedDates={displayFixedDates}
									onSelect={handleCalendarSelect}
								/>
							</div>
							<SelectedDates
								variant="fixed"
								fixedDates={displayFixedDates}
								onRemove={removeFixedDate}
							/>
						</>
					) : (
						<>
							<RecurringPattern
								tourId={tourId}
								recurrenceRules={recurrenceRules}
								onDraftChange={handlePatternDraftChange}
							/>
							<div className="flex items-center justify-center">
								<RecurringCalendarInfo
									occurrences={displayOccurrences}
									excludedDates={displayExcludedDates}
									onExcludeDate={excludeDate}
									onRestoreDate={restoreDate}
									onRangeChange={setCalendarRange}
								/>
							</div>
							<SelectedDates
								variant="recurring"
								excludedDates={displayExcludedDates}
								onRemove={restoreDate}
							/>
						</>
					)}

					{isSeasonal && <SeasonalityInfo tourId={tourId} />}
				</CardContent>
			</Card>
		</section>
	);
};

export const Schedule = withErrorBoundary(ScheduleBase);
