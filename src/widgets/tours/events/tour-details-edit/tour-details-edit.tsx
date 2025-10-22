import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { MapIcon } from "@/shared/assets";
import {
	Card,
	CardContent,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Separator
} from "@/shared/ui";

import { EventTitleInput } from "../ui";

import { TOUR_DETAILS_EDIT_TABS_LIST } from "./model";

export const TourDetailsEdit: FC = () => {
	const { t } = useTranslation("tour_details_edit_page");
	return (
		<section className="flex flex-col gap-6">
			<EventTitleInput
				icon={MapIcon}
				placeholder={t("input.title.placeholder")}
				className="bg-rose-500"
			/>
			<Card>
				<CardContent>
					<CustomOptionTabs
						defaultValue={TOUR_DETAILS_EDIT_TABS_LIST[0]?.type}
					>
						<CustomOptionTabsList className="grid-cols-3">
							{TOUR_DETAILS_EDIT_TABS_LIST.map((item) => (
								<CustomOptionTabsTrigger
									key={item.type}
									value={item.type}
									variant={"tongue"}
								>
									{t(item?.label)}
								</CustomOptionTabsTrigger>
							))}
						</CustomOptionTabsList>
						<Separator className="mb-6" />
						{TOUR_DETAILS_EDIT_TABS_LIST.map((item) => (
							<CustomOptionTabsContent
								key={item.type}
								value={item.type}
							>
								<item.slot />
							</CustomOptionTabsContent>
						))}
					</CustomOptionTabs>
				</CardContent>
			</Card>
		</section>
	);
};
