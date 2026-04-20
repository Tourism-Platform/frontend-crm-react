import { type FC, useMemo, useState } from "react";
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

import { DATES_TYPE_LIST, type ENUM_DATES_TYPE_TYPE } from "../model";

import { CalendarInfo } from "./calendar-info";
import { SeasonalityInfo } from "./seasonality-info";
import { SelectedDates } from "./selected-dates";
import { Switcher } from "./switcher";

const ScheduleBase: FC = () => {
	const { t } = useTranslation("tour_schedule_page");
	const { tourId = "" } = useParams<{ tourId: string }>();

	const { data: scheduleData } = useGetScheduleQuery(tourId, {
		skip: !tourId
	});

	const [activeTab, setActiveTab] = useState(DATES_TYPE_LIST[0].value);

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
	const isSeasonal = scheduleData?.schedule.isSeasonal ?? false;

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
					<div className="flex items-center justify-center">
						<CalendarInfo tourId={tourId} fixedDates={fixedDates} />
					</div>
					<SelectedDates tourId={tourId} fixedDates={fixedDates} />
					{isSeasonal && <SeasonalityInfo tourId={tourId} />}
				</CardContent>
			</Card>
		</section>
	);
};

export const Schedule = withErrorBoundary(ScheduleBase);
