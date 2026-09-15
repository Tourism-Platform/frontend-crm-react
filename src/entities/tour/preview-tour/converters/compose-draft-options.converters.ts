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
	const min = total?.min?.val;
	const max = total?.max?.val;

	if (min == null && max == null) return "";

	if (max == null || min === max) {
		return formatToDollars(min ?? max ?? 0);
	}

	if (min == null) {
		return formatToDollars(max);
	}

	return `${formatToDollars(min)} - ${formatToDollars(max)}`;
};

export const mapDraftOptionCardToFrontend = (
	option?: TTourOptionBackend | null,
	perPerson?: TTourMinMaxCostBackend,
	groupTotal?: TTourMinMaxCostBackend
): IPreviewOptionCard => ({
	id: option?.id ?? "",
	title: option?.name ?? "",
	description: option?.description ?? "",
	price: mapDraftOptionPriceToFrontend(perPerson),
	totalPrice: mapDraftOptionPriceToFrontend(groupTotal),
	image: option?.cover_image_path
		? toPublicImageUrl(option.cover_image_path)
		: ""
});
