import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { HouseIcon } from "@/shared/assets";
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

import { EventTitleInput } from "../ui";

import {
	ACCOMMODATION_EDIT_TABS_LIST,
	type IAccommodationEditTabs
} from "./model";

export interface IAccommodationEditProps {
	form: UseFormReturn<TAccommodationEditSchema>;
	createSectionSubmit: () => Promise<void>;
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

	return (
		<Form {...form}>
			<section className="flex flex-col gap-6">
				<EventTitleInput
					control={form.control}
					icon={HouseIcon}
					placeholder={t("input.title.placeholder")}
					className="bg-cyan-700"
				/>
				<Card>
					<CardContent>
						<CustomOptionTabs defaultValue={tabs[0]?.type}>
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
											onSubmit: createSectionSubmit
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
