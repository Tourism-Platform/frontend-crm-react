import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { TaskSquareIcon } from "@/shared/assets";
import { Card, CardContent, CustomQueryTabs, Form } from "@/shared/ui";

import type { TMultiplyOptionEditSchema } from "@/entities/tour";

import { EventTitleInput } from "../ui";

import { MULTIPLY_OPTION_EDIT_TABS_LIST } from "./model";

export interface IMultiplyOptionEditProps {
	form: UseFormReturn<TMultiplyOptionEditSchema>;
	createSectionSubmit: () => Promise<void>;
	isLoading: boolean;
}

export const MultiplyOptionEdit: FC<IMultiplyOptionEditProps> = ({
	form,
	createSectionSubmit,
	isLoading
}) => {
	const { t } = useTranslation("multiply_option_edit_page");

	return (
		<Form {...form}>
			<section className="flex flex-col gap-6">
				<EventTitleInput
					control={form.control}
					icon={TaskSquareIcon}
					placeholder={t("general.form.fields.title.placeholder")}
					className="bg-zinc-700"
				/>
				<Card>
					<CardContent>
						<CustomQueryTabs
							ns="multiply_option_edit_page"
							tabs={MULTIPLY_OPTION_EDIT_TABS_LIST}
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
