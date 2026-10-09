import { useEffect, useRef } from "react";
import type { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

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
	const { state, key } = useLocation();
	// Section comes via navigation state, not a URL hash: ScrollRestoration
	// jumps to a hash instantly, which would kill the smooth scroll.
	const section = (state as { section?: string } | null)?.section;
	// One scroll per navigation: a later isLoading flip (e.g. saving a section)
	// must not pull the page back to the requested section.
	const scrolledKeyRef = useRef<string | null>(null);

	useEffect(() => {
		if (isLoading || !section || scrolledKeyRef.current === key) return;
		scrolledKeyRef.current = key;
		document
			.getElementById(section)
			?.scrollIntoView({ behavior: "smooth", block: "start" });
	}, [section, key, isLoading]);

	return (
		<div className="flex flex-col gap-10">
			{tabs.map((item, index) => (
				<div key={item.type} id={item.type} className="scroll-mt-36">
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
