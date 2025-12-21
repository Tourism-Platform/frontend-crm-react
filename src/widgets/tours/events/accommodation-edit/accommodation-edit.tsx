import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { HouseIcon } from "@/shared/assets";
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

import { ACCOMMODATION_EDIT_TABS_LIST } from "./model";

export const AccommodationEdit: FC = () => {
	const { t } = useTranslation("accommodation_edit_page");
	return (
		<section className="flex flex-col gap-6">
			<EventTitleInput
				icon={HouseIcon}
				placeholder={t("input.title.placeholder")}
				className="bg-cyan-700"
			/>
			<Card>
				<CardContent>
					<CustomOptionTabs
						defaultValue={ACCOMMODATION_EDIT_TABS_LIST[0]?.type}
					>
						<CustomOptionTabsList className="grid-cols-4">
							{ACCOMMODATION_EDIT_TABS_LIST.map((item) => (
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
						{ACCOMMODATION_EDIT_TABS_LIST.map((item) => (
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
