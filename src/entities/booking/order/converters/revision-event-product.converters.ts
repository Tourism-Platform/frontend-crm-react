import {
	type IEventProductLink,
	mapEventProductScopeToBackend
} from "@/entities/tour";

import type {
	TRevisionEventProductLinkBackend,
	TRevisionEventProductQueryBackend
} from "../types/revision-event-product.types";

/** Contract 3.1: product link write body is `{ source, product_id, scope? }`. */
export const mapRevisionEventProductLinkToBackend = (
	data: IEventProductLink
): TRevisionEventProductLinkBackend => ({
	source: "product",
	product_id: data.productId,
	...(data.scope ? { scope: mapEventProductScopeToBackend(data.scope) } : {})
});

export const mapRevisionEventProductQueryToBackend = (
	optionIndex?: number | null
): TRevisionEventProductQueryBackend => {
	if (optionIndex === undefined) {
		return {};
	}

	return { option_index: optionIndex };
};
