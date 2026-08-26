import type { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { TResources } from "@/shared/config";
import { useQueryTab } from "@/shared/hooks";
import { Separator } from "@/shared/ui";

import {
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger
} from "./custom-option-tab";
import type { ICustomQueryTabsProps } from "./custom-query-tabs.types";

export const CustomQueryTabs = <
	TType extends string,
	TNs extends keyof TResources,
	TSection extends string = string,
	TFormValues extends FieldValues = FieldValues,
	TSlotContext = unknown
>({
	tabs,
	ns,
	form,
	createSectionSubmit,
	isLoading,
	slotContext
}: ICustomQueryTabsProps<TType, TNs, TSection, TFormValues, TSlotContext>) => {
	const { t } = useTranslation(ns);
	const allowedTabs = tabs.map((item) => item.type);
	const [tab, setTab] = useQueryTab(allowedTabs[0], allowedTabs);

	return (
		<CustomOptionTabs value={tab} onValueChange={setTab}>
			<CustomOptionTabsList
				style={{
					gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`
				}}
			>
				{tabs.map((item) => (
					<CustomOptionTabsTrigger
						key={item.type}
						value={item.type}
						variant="tongue"
					>
						{t(item.label as never)}
					</CustomOptionTabsTrigger>
				))}
			</CustomOptionTabsList>
			<Separator className="mb-6" />
			{tabs.map((item) => (
				<CustomOptionTabsContent key={item.type} value={item.type}>
					<item.slot
						{...(form && { form })}
						{...(item.section &&
							createSectionSubmit && {
								onSubmit: () =>
									createSectionSubmit(item.section)
							})}
						{...(item.ns && { ns: item.ns })}
						{...(isLoading !== undefined && { isLoading })}
						{...(slotContext !== undefined &&
							item.getSlotProps?.(slotContext))}
					/>
				</CustomOptionTabsContent>
			))}
		</CustomOptionTabs>
	);
};
