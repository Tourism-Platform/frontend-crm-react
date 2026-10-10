import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { TicketStarIcon } from "@/shared/assets";
import {
	Card,
	CardContent,
	CustomQuerySections,
	Form,
	withErrorBoundary
} from "@/shared/ui";

import type { TActivityEditSchema } from "@/entities/tour";

import type { TEventPoolUiProps } from "@/features/tours/manage-event-pool";

import {
	useHasProductOverride,
	useIsInheritedProduct
} from "../model/use-is-inherited-product";
import { EventTitleInput, InheritedLockBanner } from "../ui";

import { type ENUM_FORM_SECTION_TYPE, EVENT_EDIT_TABS_LIST } from "./model";

export interface IActivityEditProps extends TEventPoolUiProps {
	form: UseFormReturn<TActivityEditSchema>;
	/** Manual save; autosaved pages omit it and the section buttons hide. */
	createSectionSubmit?: (section?: ENUM_FORM_SECTION_TYPE) => Promise<void>;
	isLoading: boolean;
	/** Blur of any field inside: saves pending text right away. */
	onBlur?: () => void;
	tabs?: typeof EVENT_EDIT_TABS_LIST;
}

const ActivityEditBase: FC<IActivityEditProps> = ({
	form,
	createSectionSubmit,
	onBlur,
	isLoading,
	poolVariant,
	onPoolSelect,
	tabs = EVENT_EDIT_TABS_LIST
}) => {
	const { t } = useTranslation("activity_edit_page");
	const isInherited = useIsInheritedProduct(form);
	const hasOverride = useHasProductOverride(form);

	return (
		<Form {...form}>
			<section className="flex flex-col gap-6" onBlur={onBlur}>
				<div className="flex flex-col gap-2">
					<EventTitleInput
						control={form.control}
						icon={TicketStarIcon}
						placeholder={t("input.title.placeholder")}
						className="bg-sky-500"
					/>
					{isInherited && hasOverride ? (
						<InheritedLockBanner
							variant="override"
							title={t("form.inherited.override_title")}
							description={t(
								"form.inherited.override_description"
							)}
						/>
					) : null}
				</div>
				<Card>
					<CardContent>
						<CustomQuerySections
							ns="activity_edit_page"
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

export const ActivityEdit = withErrorBoundary(ActivityEditBase);
