import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { InfoCircleIcon } from "@/shared/assets";
import { Card, CardContent, CustomQuerySections, Form } from "@/shared/ui";

import type { TInfoEditSchema } from "@/entities/tour";

import type { TEventPoolUiProps } from "@/features/tours/manage-event-pool";

import { EventTitleInput } from "../ui";

import { INFORMATION_EDIT_TABS_LIST } from "./model";

export interface IInformationEditProps extends TEventPoolUiProps {
	form: UseFormReturn<TInfoEditSchema>;
	/** Manual save; autosaved pages omit it and the section buttons hide. */
	createSectionSubmit?: () => Promise<void>;
	isLoading: boolean;
	/** Blur of any field inside: saves pending text right away. */
	onBlur?: () => void;
	tabs?: typeof INFORMATION_EDIT_TABS_LIST;
}

export const InformationEdit: FC<IInformationEditProps> = ({
	form,
	createSectionSubmit,
	onBlur,
	isLoading,
	poolVariant,
	onPoolSelect,
	tabs = INFORMATION_EDIT_TABS_LIST
}) => {
	const { t } = useTranslation("information_edit_page");

	return (
		<Form {...form}>
			<section className="flex flex-1 flex-col gap-5" onBlur={onBlur}>
				<EventTitleInput
					icon={InfoCircleIcon}
					control={form.control}
					placeholder={t("input.title.placeholder")}
					className="bg-amber-600"
				/>
				<Card>
					<CardContent>
						<CustomQuerySections
							ns="information_edit_page"
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
