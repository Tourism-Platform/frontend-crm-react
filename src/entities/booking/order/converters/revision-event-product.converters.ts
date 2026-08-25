import type { IEventProductLink } from "@/entities/tour";

import type {
	TRevisionEventProductLinkBackend,
	TRevisionEventProductQueryBackend
} from "../types/revision-event-product.types";

export const mapRevisionEventProductLinkToBackend = (
	data: IEventProductLink
): TRevisionEventProductLinkBackend => ({
	product_id: data.productId,
	variant_id: data.variantId ?? null
});

export const mapRevisionEventProductQueryToBackend = (
	optionIndex?: number | null
): TRevisionEventProductQueryBackend => {
	if (optionIndex === undefined) {
		return {};
	}

	return { option_index: optionIndex };
};
