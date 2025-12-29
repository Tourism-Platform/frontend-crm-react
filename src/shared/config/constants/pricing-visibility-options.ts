import type { SelectPickerOption } from "@/shared/ui";

export const PRICING_VISIBILITY_OPTIONS: SelectPickerOption[] = [
	{ label: "Show price 'from'", value: "show_from" },
	{ label: "Show exact price", value: "show_exact" },
	{ label: "Hide price", value: "hide" }
];
