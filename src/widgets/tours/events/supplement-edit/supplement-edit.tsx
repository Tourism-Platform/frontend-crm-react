import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BoxOutlineIcon } from "@/shared/assets";
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

import type { TSupplementEditSchema } from "@/entities/tour";

import { EventTitleInput } from "../ui";

import { type ISupplementEditTabs, SUPPLEMENT_EDIT_TABS_LIST } from "./model";

export interface ISupplementEditProps {
	form: UseFormReturn<TSupplementEditSchema>;
	createSectionSubmit: () => Promise<void>;
	isLoading: boolean;
	tabs?: ISupplementEditTabs[];
}

export const SupplementEdit: FC<ISupplementEditProps> = ({
	form,
	createSectionSubmit,
	isLoading,
	tabs = SUPPLEMENT_EDIT_TABS_LIST
}) => {
	const { t } = useTranslation("supplement_edit_page");

	return (
		<Form {...form}>
			<section className="flex flex-col gap-6">
				<EventTitleInput
					control={form.control}
					icon={BoxOutlineIcon}
					placeholder={t("input.title.placeholder")}
					className="bg-violet-600"
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
