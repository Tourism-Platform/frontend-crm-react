import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BoxOutlineIcon } from "@/shared/assets";
import { Card, CardContent, CustomQueryTabs, Form } from "@/shared/ui";

import type { TPackageEditSchema } from "@/entities/tour";

import { EventTitleInput } from "../events/ui";

import { PACKAGE_EDIT_TABS_LIST } from "./model";

export interface IPackageEditProps {
	form: UseFormReturn<TPackageEditSchema>;
	onSubmit: () => Promise<void>;
	isLoading: boolean;
	backToEventHref?: string;
}

export const PackageEdit: FC<IPackageEditProps> = ({
	form,
	onSubmit,
	isLoading,
	backToEventHref
}) => {
	const { t } = useTranslation("tour_package_edit_page");

	return (
		<Form {...form}>
			<section className="flex flex-col gap-6">
				<EventTitleInput
					control={form.control}
					icon={BoxOutlineIcon}
					placeholder={t("input.title.placeholder")}
				/>
				<Card>
					<CardContent>
						<CustomQueryTabs
							ns="tour_package_edit_page"
							tabs={PACKAGE_EDIT_TABS_LIST}
							form={form}
							createSectionSubmit={onSubmit}
							isLoading={isLoading}
							slotContext={{ backToEventHref }}
						/>
					</CardContent>
				</Card>
			</section>
		</Form>
	);
};
