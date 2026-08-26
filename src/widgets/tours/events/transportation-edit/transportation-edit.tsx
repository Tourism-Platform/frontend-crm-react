import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { DrivingIcon } from "@/shared/assets";
import { Card, CardContent, CustomQueryTabs, Form } from "@/shared/ui";

import type { TTransportationEditSchema } from "@/entities/tour";

import { EventTitleInput } from "../ui";

import {
	type ENUM_FORM_SECTION_TYPE,
	TRANSPORTATION_EDIT_TABS_LIST
} from "./model";

export interface ITransportationEditProps {
	form: UseFormReturn<TTransportationEditSchema>;
	createSectionSubmit: (section?: ENUM_FORM_SECTION_TYPE) => Promise<void>;
	isLoading: boolean;
	tabs?: typeof TRANSPORTATION_EDIT_TABS_LIST;
}

export const TransportationEdit: FC<ITransportationEditProps> = ({
	form,
	createSectionSubmit,
	isLoading,
	tabs = TRANSPORTATION_EDIT_TABS_LIST
}) => {
	const { t } = useTranslation("transportation_edit_page");

	return (
		<Form {...form}>
			<section className="flex flex-col gap-6">
				<EventTitleInput
					control={form.control}
					icon={DrivingIcon}
					placeholder={t("input.title.placeholder")}
					className="bg-emerald-600"
				/>
				<Card>
					<CardContent>
						<CustomQueryTabs
							ns="transportation_edit_page"
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
