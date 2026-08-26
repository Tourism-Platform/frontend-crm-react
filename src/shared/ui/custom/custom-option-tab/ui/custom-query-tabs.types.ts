import type { ReactNode } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { TNestedKeyOf, TResources } from "@/shared/config";

export interface IQueryTabSlotProps<
	TFormValues extends FieldValues = FieldValues
> {
	form?: UseFormReturn<TFormValues>;
	onSubmit?: () => void | Promise<void>;
	isLoading?: boolean;
	ns?: keyof TResources;
}

type TQueryTabSlotComponent<
	TFormValues extends FieldValues = FieldValues,
	TSlotExtra extends Record<string, unknown> = Record<string, unknown>
> = {
	bivarianceHack(
		props: IQueryTabSlotProps<TFormValues> & TSlotExtra
	): ReactNode;
}["bivarianceHack"];

export interface IQueryTab<
	TType extends string = string,
	TNs extends keyof TResources = keyof TResources,
	TSection extends string = string,
	TFormValues extends FieldValues = FieldValues,
	TSlotContext = unknown,
	TSlotExtra extends Record<string, unknown> = Record<string, unknown>
> {
	type: TType;
	label: TNestedKeyOf<TResources[TNs] & object>;
	slot: TQueryTabSlotComponent<TFormValues, TSlotExtra>;
	section?: TSection;
	ns?: keyof TResources;
	getSlotProps?: (context: TSlotContext) => TSlotExtra | undefined;
}

export interface ICustomQueryTabsProps<
	TType extends string = string,
	TNs extends keyof TResources = keyof TResources,
	TSection extends string = string,
	TFormValues extends FieldValues = FieldValues,
	TSlotContext = unknown
> extends Pick<IQueryTabSlotProps<TFormValues>, "form" | "isLoading"> {
	tabs: IQueryTab<TType, TNs, TSection, TFormValues, TSlotContext>[];
	ns: TNs;
	createSectionSubmit?: (section?: TSection) => void | Promise<void>;
	slotContext?: TSlotContext;
}
