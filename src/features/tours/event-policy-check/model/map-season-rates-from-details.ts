import type { IHotelRoomRate } from "@/entities/supplier";
import { mapHotelVariantFromBackend } from "@/entities/supplier";
import {
	type THousingDetailsBackend,
	isInheritedHousingDetails
} from "@/entities/tour";

export interface IProductSeasonRateRow {
	roomLabel: string;
	rates: IHotelRoomRate[];
}

export const mapSeasonRatesFromHousingDetails = (
	details: THousingDetailsBackend | undefined
): IProductSeasonRateRow[] => {
	if (!isInheritedHousingDetails(details)) {
		return [];
	}

	const product = details.product;
	if (!product) {
		return [];
	}

	const variants = product.variants ?? [];
	const selected = details.variant_id
		? variants.filter((variant) => variant.id === details.variant_id)
		: variants;

	return selected.flatMap((variant) => {
		const mapped = mapHotelVariantFromBackend(variant);
		return mapped.rooms
			.filter((room) => Boolean(room.rates?.length))
			.map((room) => ({
				roomLabel: room.typ ?? mapped.name,
				rates: room.rates ?? []
			}));
	});
};
