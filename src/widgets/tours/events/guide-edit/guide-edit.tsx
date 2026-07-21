import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { UsersIcon } from "@/shared/assets";
import {
	Card,
	CardContent,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Form,
	Separator
} from "@/shared/ui";

import type { TGuideEditSchema } from "@/entities/tour";

import { EventTitleInput } from "../ui";

import {
	type ENUM_FORM_SECTION_TYPE,
	GUIDE_EDIT_TABS_LIST,
	type IGuideEditTabs
} from "./model";

export interface IGuideEditProps {
	form: UseFormReturn<TGuideEditSchema>;
	createSectionSubmit: (
		section: ENUM_FORM_SECTION_TYPE
	) => () => Promise<void>;
	isLoading: boolean;
	tabs?: IGuideEditTabs[];
}

export const GuideEdit: FC<IGuideEditProps> = ({
	form,
	createSectionSubmit,
	isLoading,
	tabs = GUIDE_EDIT_TABS_LIST
}) => {
	const { t } = useTranslation("guide_edit_page");

	return (
		<Form {...form}>
			<section className="flex flex-col gap-6">
				<EventTitleInput
					control={form.control}
					icon={UsersIcon}
					placeholder={t("input.title.placeholder")}
					className="bg-orange-600"
				/>
				<Card>
					<CardContent>
						<CustomOptionTabs defaultValue={tabs[0]?.type}>
							<CustomOptionTabsList
								style={{
									gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`
								}}
							>
								{tabs.map((item) => (
									<CustomOptionTabsTrigger
										key={item.type}
										value={item.type}
										variant={"tongue"}
									>
										{t(item.label)}
									</CustomOptionTabsTrigger>
								))}
							</CustomOptionTabsList>
							<Separator className="mb-6" />
							{tabs.map((item) => (
								<CustomOptionTabsContent
									key={item.type}
									value={item.type}
								>
									<item.slot
										form={form}
										{...(item?.section && {
											onSubmit: createSectionSubmit(
												item.section
											)
										})}
										{...(item?.ns && { ns: item.ns })}
										isLoading={isLoading}
									/>
								</CustomOptionTabsContent>
							))}
						</CustomOptionTabs>
					</CardContent>
				</Card>
			</section>
		</Form>
	);
};
