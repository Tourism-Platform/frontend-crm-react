import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { InfoCircleIcon } from "@/shared/assets";
import { Card, CardContent, CustomQueryTabs, Form } from "@/shared/ui";

import type { TInfoEditSchema } from "@/entities/tour";

import { EventTitleInput } from "../ui";

import { INFORMATION_EDIT_TABS_LIST } from "./model";

export interface IInformationEditProps {
	form: UseFormReturn<TInfoEditSchema>;
	createSectionSubmit: () => Promise<void>;
	isLoading: boolean;
	tabs?: typeof INFORMATION_EDIT_TABS_LIST;
}

export const InformationEdit: FC<IInformationEditProps> = ({
	form,
	createSectionSubmit,
	isLoading,
	tabs = INFORMATION_EDIT_TABS_LIST
}) => {
	const { t } = useTranslation("information_edit_page");

	return (
		<Form {...form}>
			<section className="flex flex-col gap-6">
				<EventTitleInput
					icon={InfoCircleIcon}
					control={form.control}
					placeholder={t("input.title.placeholder")}
					className="bg-amber-600"
				/>
				<Card>
					<CardContent>
						<CustomQueryTabs
							ns="information_edit_page"
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
