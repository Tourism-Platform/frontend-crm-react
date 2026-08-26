import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { UsersIcon } from "@/shared/assets";
import { Card, CardContent, CustomQueryTabs, Form } from "@/shared/ui";

import type { TGuideEditSchema } from "@/entities/tour";

import { EventTitleInput } from "../ui";

import { GUIDE_EDIT_TABS_LIST } from "./model";

export interface IGuideEditProps {
	form: UseFormReturn<TGuideEditSchema>;
	createSectionSubmit: () => Promise<void>;
	isLoading: boolean;
	tabs?: typeof GUIDE_EDIT_TABS_LIST;
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
						<CustomQueryTabs
							ns="guide_edit_page"
							tabs={tabs}
							form={form}
							createSectionSubmit={createSectionSubmit}
							isLoading={isLoading}
						/>
					</CardContent>
				</Card>
			</section>
		</Form>
	);
};
