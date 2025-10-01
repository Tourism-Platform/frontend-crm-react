import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { TOUR_CARDS } from "@/shared/config";
import {
	Card,
	CardContent,
	CustomTabs,
	CustomTabsList,
	CustomTabsTrigger
} from "@/shared/ui";

import { TourCard } from "@/entities/tour";

import {
	ENUM_TOUR_STATUS,
	type ENUM_TOUR_STATUS_TYPE,
	TOUR_TABS_LIST
} from "../model";

export const Tours: FC = () => {
	const { t } = useTranslation("tours_page");

	const [activeTab, setActiveTab] = useState(TOUR_TABS_LIST[0].value);

	const filteredData =
		activeTab === ENUM_TOUR_STATUS.ALL
			? TOUR_CARDS
			: TOUR_CARDS.filter((card) => card.status === activeTab);

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent className="grid gap-6">
					<CustomTabs
						defaultValue={TOUR_TABS_LIST[0].value}
						value={activeTab}
						onValueChange={(val) =>
							setActiveTab(val as ENUM_TOUR_STATUS_TYPE)
						}
					>
						<CustomTabsList>
							{TOUR_TABS_LIST.map((tab) => (
								<CustomTabsTrigger
									key={tab.value}
									value={tab.value}
								>
									{t(tab.label)}
								</CustomTabsTrigger>
							))}
						</CustomTabsList>
					</CustomTabs>
					<div className="grid grid-cols-3 gap-5">
						{filteredData.map((card) => (
							<TourCard key={card.title} card={card} />
						))}
					</div>
				</CardContent>
			</Card>
		</section>
	);
};
