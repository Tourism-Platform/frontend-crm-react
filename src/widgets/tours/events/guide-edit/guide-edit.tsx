import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { UsersIcon } from "@/shared/assets";
import { Card, CardContent, CustomQuerySections, Form } from "@/shared/ui";

import type { TGuideEditSchema } from "@/entities/tour";

import type { TEventPoolUiProps } from "@/features/tours/manage-event-pool";

import { EventTitleInput } from "../ui";

import { GUIDE_EDIT_TABS_LIST } from "./model";

export interface IGuideEditProps extends TEventPoolUiProps {
	form: UseFormReturn<TGuideEditSchema>;
	/** Manual save; autosaved pages omit it and the section buttons hide. */
	createSectionSubmit?: () => Promise<void>;
	isLoading: boolean;
	/** Blur of any field inside: saves pending text right away. */
	onBlur?: () => void;
	tabs?: typeof GUIDE_EDIT_TABS_LIST;
}

export const GuideEdit: FC<IGuideEditProps> = ({
	form,
	createSectionSubmit,
	onBlur,
	isLoading,
	poolVariant,
	onPoolSelect,
	tabs = GUIDE_EDIT_TABS_LIST
}) => {
	const { t } = useTranslation("guide_edit_page");

	return (
		<Form {...form}>
			<section className="flex flex-col gap-6" onBlur={onBlur}>
				<EventTitleInput
					control={form.control}
					icon={UsersIcon}
					placeholder={t("input.title.placeholder")}
					className="bg-orange-600"
				/>
				<Card>
					<CardContent>
						<CustomQuerySections
							ns="guide_edit_page"
							tabs={tabs}
							form={form}
							createSectionSubmit={createSectionSubmit}
							isLoading={isLoading}
							slotContext={{ poolVariant, onPoolSelect }}
						/>
					</CardContent>
				</Card>
			</section>
		</Form>
	);
};
