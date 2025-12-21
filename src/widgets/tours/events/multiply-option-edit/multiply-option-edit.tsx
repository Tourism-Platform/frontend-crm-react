import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { TaskSquareIcon } from "@/shared/assets";
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

import { MULTIPLY_OPTION_EDIT_TABS_LIST } from "./model";

export const MultiplyOptionEdit: FC = () => {
	const { t } = useTranslation("multiply_option_edit_page");

	return (
		<section className="flex flex-col gap-6">
			<EventTitleInput
				icon={TaskSquareIcon}
				placeholder={t("general.form.fields.title.placeholder")}
			/>
			<Card>
				<CardContent>
					<CustomOptionTabs
						defaultValue={MULTIPLY_OPTION_EDIT_TABS_LIST[0]?.type}
					>
						<CustomOptionTabsList className="grid-cols-2">
							{MULTIPLY_OPTION_EDIT_TABS_LIST.map((item) => (
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
						{MULTIPLY_OPTION_EDIT_TABS_LIST.map((item) => (
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
