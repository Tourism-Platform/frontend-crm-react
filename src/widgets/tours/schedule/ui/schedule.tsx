import { addDays, subDays } from "date-fns";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CustomTabs,
	CustomTabsList,
	CustomTabsTrigger
} from "@/shared/ui";

import { DATES_TYPE_LIST, type ENUM_DATES_TYPE_TYPE } from "../model";

import { CalendarInfo } from "./calendar-info";
import { SeasonalityInfo } from "./seasonality-info";
import { SelectedDates } from "./selected-dates";
import { Switcher } from "./switcher";

export const Schedule: FC = () => {
	const { t } = useTranslation("tour_schedule_page");
	const today = new Date();
	const [date, setDate] = useState<Date[] | undefined>([
		subDays(today, 17),
		addDays(today, 2),
		addDays(today, 6),
		addDays(today, 8)
	]);

	const handleDeleteDate = (date: Date) => {
		setDate((prev) => prev?.filter((item) => item !== date));
	};
	const [seasonality, setSeasonality] = useState(false);
	const [activeTab, setActiveTab] = useState(DATES_TYPE_LIST[0].value);

	return (
		<section className="flex flex-col gap-6 container">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl">{t("page_name")}: TOUR NAME</h1>
			</div>
			<Card>
				<CardContent className="grid gap-12">
					<div className="flex justify-between gap-6 items-center">
						<CustomTabs
							defaultValue={DATES_TYPE_LIST[0].value}
							value={activeTab}
							onValueChange={(val) =>
								setActiveTab(val as ENUM_DATES_TYPE_TYPE)
							}
						>
							<CustomTabsList className="grid grid-cols-2">
								{DATES_TYPE_LIST.map((tab) => (
									<CustomTabsTrigger
										key={tab.value}
										value={tab.value}
									>
										{t(tab.label)}
									</CustomTabsTrigger>
								))}
							</CustomTabsList>
						</CustomTabs>
						<Switcher
							checked={seasonality}
							toggleSwitch={() => setSeasonality(!seasonality)}
						/>
					</div>
					<div className="flex items-center justify-center">
						<CalendarInfo date={date} setDate={setDate} />
					</div>
					<SelectedDates date={date} onDelete={handleDeleteDate} />
					{seasonality && <SeasonalityInfo />}
				</CardContent>
			</Card>
		</section>
	);
};
