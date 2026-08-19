import { formatToDollars } from "@/shared/utils";

import type {
	TTourMinMaxCostBackend,
	TTourOptionBackend
} from "@/entities/tour/itinerary";

import type { IPreviewOptionCard } from "../types";

import { toPublicImageUrl } from "./preview-option-media.utils";

export const mapDraftOptionPriceToFrontend = (
	total?: TTourMinMaxCostBackend
): string => {
	if (!total) return "";

	const min = total.min.val;
	const max = total.max.val;

	if (min === max) {
		return formatToDollars(min);
	}

	return `${formatToDollars(min)} - ${formatToDollars(max)}`;
};

export const mapDraftOptionCardToFrontend = (
	option: TTourOptionBackend,
	total?: TTourMinMaxCostBackend
): IPreviewOptionCard => ({
	id: option.id,
	title: option.name ?? "",
	description: option.description ?? "",
	price: mapDraftOptionPriceToFrontend(total),
	image: option.cover_image_path
		? toPublicImageUrl(option.cover_image_path)
		: ""
});
