import type { IPreviewOptionCard } from "@/entities/tour/preview-tour";

/**
 * Цена «от» для шапки превью тура — цена самого дешёвого варианта по `priceValue`.
 * Нет ни одной цены — пустая строка (шапка цену не показывает)
 */
export const getCheapestOptionPrice = (
	options: IPreviewOptionCard[]
): string => {
	const cheapest = options.reduce<IPreviewOptionCard | undefined>(
		(min, option) =>
			option.priceValue != null &&
			(min?.priceValue == null || option.priceValue < min.priceValue)
				? option
				: min,
		undefined
	);

	return cheapest?.price ?? "";
};
