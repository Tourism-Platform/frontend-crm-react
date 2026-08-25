import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { HouseIcon } from "@/shared/assets";
import { useQueryTab } from "@/shared/hooks";
import {
	Card,
	CardContent,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Form,
	Separator
} from "@/shared/ui";

import type { TAccommodationEditSchema } from "@/entities/tour";

import {
	useHasProductOverride,
	useIsInheritedProduct
} from "../model/use-is-inherited-product";
import { EventTitleInput, InheritedLockBanner } from "../ui";

import {
	ACCOMMODATION_EDIT_TABS_LIST,
	type ENUM_FORM_SECTION_TYPE,
	type IAccommodationEditTabs
} from "./model";

export interface IAccommodationEditProps {
	form: UseFormReturn<TAccommodationEditSchema>;
	createSectionSubmit: (section?: ENUM_FORM_SECTION_TYPE) => Promise<void>;
	isLoading: boolean;
	tabs?: IAccommodationEditTabs[];
}

export const AccommodationEdit: FC<IAccommodationEditProps> = ({
	form,
	createSectionSubmit,
	isLoading,
	tabs = ACCOMMODATION_EDIT_TABS_LIST
}) => {
	const { t } = useTranslation("accommodation_edit_page");
	const allowedTabs = tabs.map((item) => item.type);
	const [initialTab, setTab] = useQueryTab(allowedTabs[0], allowedTabs);
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
						<CustomOptionTabs
							defaultValue={initialTab}
							onValueChange={setTab}
						>
							<CustomOptionTabsList
								style={{
									gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`
								}}
							>
								{tabs.map((item) => (
									<CustomOptionTabsTrigger
										key={item.type}
										value={item.type}
										variant={"tongue"}
									>
										{t(item?.label)}
									</CustomOptionTabsTrigger>
								))}
							</CustomOptionTabsList>
							<Separator className="mb-6" />
							{tabs.map((item) => (
								<CustomOptionTabsContent
									key={item.type}
									value={item.type}
								>
									<item.slot
										form={form}
										{...(item?.section && {
											onSubmit: () =>
												createSectionSubmit(
													item.section
												)
										})}
										{...(item?.ns && { ns: item.ns })}
										isLoading={isLoading}
									/>
								</CustomOptionTabsContent>
							))}
						</CustomOptionTabs>
					</CardContent>
				</Card>
			</section>
		</Form>
	);
};
