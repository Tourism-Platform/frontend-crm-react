import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { TicketStarIcon } from "@/shared/assets";
import { useQueryTab } from "@/shared/hooks";
import {
	Card,
	CardContent,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Form,
	Separator,
	withErrorBoundary
} from "@/shared/ui";

import type { TActivityEditSchema } from "@/entities/tour";

import { EventTitleInput } from "../ui";

import {
	type ENUM_FORM_SECTION_TYPE,
	EVENT_EDIT_TABS_LIST,
	type IActivityEditTabs
} from "./model";

export interface IActivityEditProps {
	form: UseFormReturn<TActivityEditSchema>;
	createSectionSubmit: (section?: ENUM_FORM_SECTION_TYPE) => Promise<void>;
	isLoading: boolean;
	tabs?: IActivityEditTabs[];
}

const ActivityEditBase: FC<IActivityEditProps> = ({
	form,
	createSectionSubmit,
	isLoading,
	tabs = EVENT_EDIT_TABS_LIST
}) => {
	const { t } = useTranslation("activity_edit_page");
	const allowedTabs = tabs.map((item) => item.type);
	const [initialTab, setTab] = useQueryTab(allowedTabs[0], allowedTabs);

	return (
		<Form {...form}>
			<section className="flex flex-col gap-6">
				<EventTitleInput
					control={form.control}
					icon={TicketStarIcon}
					placeholder={t("input.title.placeholder")}
					className="bg-sky-500"
				/>
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

export const ActivityEdit = withErrorBoundary(ActivityEditBase);
