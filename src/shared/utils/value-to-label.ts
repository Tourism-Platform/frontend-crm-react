import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { SelectPickerOption } from "@/shared/ui";

import type { TOptionsKeys } from "../config";

export const valueToLabel = <T extends Record<string, string>>(
	labels: T
): SelectPickerOption[] =>
	Object.entries(labels).map(([value, label]) => ({
		label,
		value
	}));

export const useValueToTranslateLabel = <
	T extends Record<string, TOptionsKeys>
>(
	labels: T
): SelectPickerOption[] => {
	const { t } = useTranslation("options");

	return useMemo(
		() =>
			Object.entries(labels).map(([value, label]) => ({
				label: t(label),
				value
			})),
		[labels]
	);
};
