import { type FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { TOUR_CARDS } from "@/shared/config";
import { Card, CardContent, CustomTable } from "@/shared/ui";

import { TourCard } from "@/entities/tour";

import { CreateTour } from "@/features/tours/create-tour";

import {
	COLUMNS,
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

	// Переводим тексты табов
	const translatedStatusTabs = useMemo(
		() =>
			TOUR_TABS_LIST.map((tab) => ({
				label: t(tab.label),
				value: tab.value
			})),
		[t]
	);

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent className="grid gap-6">
					<CustomTable
						columns={COLUMNS()}
						data={filteredData}
						useViewMode={true}
						defaultViewMode="cards"
						card={TourCard}
						showTopFilters={true}
						statusTabs={translatedStatusTabs}
						activeStatusTab={activeTab}
						onStatusTabChange={(val) =>
							setActiveTab(val as ENUM_TOUR_STATUS_TYPE)
						}
						actions={<CreateTour />}
					/>
				</CardContent>
			</Card>
		</section>
	);
};
