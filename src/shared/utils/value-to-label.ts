import type { SelectPickerOption } from "@/shared/ui";

export const valueToLabel = <T extends Record<string, string>>(
	labels: T
): SelectPickerOption[] =>
	Object.entries(labels).map(([value, label]) => ({
		label,
		value
	}));
