import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { PlaneIcon } from "@/shared/assets";
import { Card, CardContent, CustomQueryTabs, Form } from "@/shared/ui";

import type { TFlightEditSchema } from "@/entities/tour";

import {
	useHasProductOverride,
	useIsInheritedProduct
} from "../model/use-is-inherited-product";
import { EventTitleInput, InheritedLockBanner } from "../ui";

import { type ENUM_FORM_SECTION_TYPE, FLIGHT_EDIT_TABS_LIST } from "./model";

export interface IFlightEditProps {
	form: UseFormReturn<TFlightEditSchema>;
	createSectionSubmit: (section?: ENUM_FORM_SECTION_TYPE) => Promise<void>;
	isLoading: boolean;
	tabs?: typeof FLIGHT_EDIT_TABS_LIST;
}

export const FlightEdit: FC<IFlightEditProps> = ({
	form,
	createSectionSubmit,
	isLoading,
	tabs = FLIGHT_EDIT_TABS_LIST
}) => {
	const { t } = useTranslation("flight_edit_page");
	const isInherited = useIsInheritedProduct(form);
	const hasOverride = useHasProductOverride(form);

	return (
		<Form {...form}>
			<section className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<EventTitleInput
						control={form.control}
						icon={PlaneIcon}
						placeholder={t("input.title.placeholder")}
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
							ns="flight_edit_page"
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
