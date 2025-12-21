import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { InfoCircleIcon } from "@/shared/assets";
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

import { INFORMATION_EDIT_TABS_LIST } from "./model";

export const InformationEdit: FC = () => {
	const { t } = useTranslation("information_edit_page");
	return (
		<section className="flex flex-col gap-6">
			<EventTitleInput
				icon={InfoCircleIcon}
				placeholder={t("input.title.placeholder")}
				className="bg-amber-600"
			/>
			<Card>
				<CardContent>
					<CustomOptionTabs
						defaultValue={INFORMATION_EDIT_TABS_LIST[0]?.type}
					>
						<CustomOptionTabsList className="grid-cols-3">
							{INFORMATION_EDIT_TABS_LIST.map((item) => (
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
						{INFORMATION_EDIT_TABS_LIST.map((item) => (
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
