import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { TicketStarIcon } from "@/shared/assets";
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

import { EVENT_EDIT_TABS_LIST } from "./model";

export const EventEdit: FC = () => {
	const { t } = useTranslation("event_edit_page");
	return (
		<section className="flex flex-col gap-6 max-w-5xl mx-auto">
			<EventTitleInput
				icon={TicketStarIcon}
				placeholder={t("input.title.placeholder")}
				className="bg-sky-500"
			/>
			<Card>
				<CardContent>
					<CustomOptionTabs
						defaultValue={EVENT_EDIT_TABS_LIST[0]?.type}
					>
						<CustomOptionTabsList className="grid-cols-3">
							{EVENT_EDIT_TABS_LIST.map((item) => (
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
						{EVENT_EDIT_TABS_LIST.map((item) => (
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
