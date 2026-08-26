import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BoxOutlineIcon } from "@/shared/assets";
import { Card, CardContent, CustomQueryTabs, Form } from "@/shared/ui";

import type { TSupplementEditSchema } from "@/entities/tour";

import { EventTitleInput } from "../ui";

import {
	type ENUM_FORM_SECTION_TYPE,
	SUPPLEMENT_EDIT_TABS_LIST
} from "./model";

export interface ISupplementEditProps {
	form: UseFormReturn<TSupplementEditSchema>;
	createSectionSubmit: (section?: ENUM_FORM_SECTION_TYPE) => Promise<void>;
	isLoading: boolean;
	tabs?: typeof SUPPLEMENT_EDIT_TABS_LIST;
}

export const SupplementEdit: FC<ISupplementEditProps> = ({
	form,
	createSectionSubmit,
	isLoading,
	tabs = SUPPLEMENT_EDIT_TABS_LIST
}) => {
	const { t } = useTranslation("supplement_edit_page");

	return (
		<Form {...form}>
			<section className="flex flex-col gap-6">
				<EventTitleInput
					control={form.control}
					icon={BoxOutlineIcon}
					placeholder={t("input.title.placeholder")}
					className="bg-violet-600"
				/>
				<Card>
					<CardContent>
						<CustomQueryTabs
							ns="supplement_edit_page"
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
