import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { DrivingIcon } from "@/shared/assets";
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

import type { TTransportationEditSchema } from "@/entities/tour";

import { EventTitleInput } from "../ui";

import {
	type ITransportationEditTabs,
	TRANSPORTATION_EDIT_TABS_LIST
} from "./model";

export interface ITransportationEditProps {
	form: UseFormReturn<TTransportationEditSchema>;
	createSectionSubmit: () => Promise<void>;
	isLoading: boolean;
	tabs?: ITransportationEditTabs[];
}

export const TransportationEdit: FC<ITransportationEditProps> = ({
	form,
	createSectionSubmit,
	isLoading,
	tabs = TRANSPORTATION_EDIT_TABS_LIST
}) => {
	const { t } = useTranslation("transportation_edit_page");

	return (
		<Form {...form}>
			<section className="flex flex-col gap-6">
				<EventTitleInput
					control={form.control}
					icon={DrivingIcon}
					placeholder={t("input.title.placeholder")}
					className="bg-emerald-600"
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
