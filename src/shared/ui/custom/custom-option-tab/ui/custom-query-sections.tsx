import type { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { TResources } from "@/shared/config";
import { Separator } from "@/shared/ui";

import type { ICustomQueryTabsProps } from "./custom-query-tabs.types";

/** Same config as `CustomQueryTabs`, rendered as stacked sections with `id={type}`. */
export const CustomQuerySections = <
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

	return (
		<div className="flex flex-col gap-10">
			{tabs.map((item, index) => (
				<div key={item.type} id={item.type} className="scroll-mt-20">
					{index > 0 && <Separator className="mb-10" />}
					<h2 className="mb-6 text-lg font-semibold">
						{t(item.label as never)}
					</h2>
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
				</div>
			))}
		</div>
	);
};
