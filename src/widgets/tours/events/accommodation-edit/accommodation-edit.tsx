import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { HouseIcon } from "@/shared/assets";
import { Card, CardContent, CustomQueryTabs, Form } from "@/shared/ui";

import type { TAccommodationEditSchema } from "@/entities/tour";

import {
	useHasProductOverride,
	useIsInheritedProduct
} from "../model/use-is-inherited-product";
import { EventTitleInput, InheritedLockBanner } from "../ui";

import {
	ACCOMMODATION_EDIT_TABS_LIST,
	type ENUM_FORM_SECTION_TYPE
} from "./model";

export interface IAccommodationEditProps {
	form: UseFormReturn<TAccommodationEditSchema>;
	createSectionSubmit: (section?: ENUM_FORM_SECTION_TYPE) => Promise<void>;
	isLoading: boolean;
	tabs?: typeof ACCOMMODATION_EDIT_TABS_LIST;
}

export const AccommodationEdit: FC<IAccommodationEditProps> = ({
	form,
	createSectionSubmit,
	isLoading,
	tabs = ACCOMMODATION_EDIT_TABS_LIST
}) => {
	const { t } = useTranslation("accommodation_edit_page");
	const isInherited = useIsInheritedProduct(form);
	const hasOverride = useHasProductOverride(form);

	return (
		<Form {...form}>
			<section className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<EventTitleInput
						control={form.control}
						icon={HouseIcon}
						placeholder={t("input.title.placeholder")}
						className="bg-cyan-700"
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
						<CustomQueryTabs
							ns="accommodation_edit_page"
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
