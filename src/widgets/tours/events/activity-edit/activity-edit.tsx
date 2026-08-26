import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { TicketStarIcon } from "@/shared/assets";
import {
	Card,
	CardContent,
	CustomQueryTabs,
	Form,
	withErrorBoundary
} from "@/shared/ui";

import type { TActivityEditSchema } from "@/entities/tour";

import { EventTitleInput } from "../ui";

import { type ENUM_FORM_SECTION_TYPE, EVENT_EDIT_TABS_LIST } from "./model";

export interface IActivityEditProps {
	form: UseFormReturn<TActivityEditSchema>;
	createSectionSubmit: (section?: ENUM_FORM_SECTION_TYPE) => Promise<void>;
	isLoading: boolean;
	tabs?: typeof EVENT_EDIT_TABS_LIST;
}

const ActivityEditBase: FC<IActivityEditProps> = ({
	form,
	createSectionSubmit,
	isLoading,
	tabs = EVENT_EDIT_TABS_LIST
}) => {
	const { t } = useTranslation("activity_edit_page");

	return (
		<Form {...form}>
			<section className="flex flex-col gap-6">
				<EventTitleInput
					control={form.control}
					icon={TicketStarIcon}
					placeholder={t("input.title.placeholder")}
					className="bg-sky-500"
				/>
				<Card>
					<CardContent>
						<CustomQueryTabs
							ns="activity_edit_page"
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

export const ActivityEdit = withErrorBoundary(ActivityEditBase);
