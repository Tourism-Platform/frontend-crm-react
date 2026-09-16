import {
	ENUM_FORM_HOTEL_PRODUCT_ROOMS,
	ENUM_FORM_HOTEL_SECTION,
	type IHotelProduct,
	type THotelProductEditSchema
} from "../../types";

import { mapHotelPricingFromProduct } from "./hotel-product-pricing.converters";
import { mapRoomRowFromVariant } from "./hotel-product-rooms.converters";
import { mapHotelProductToGeneralForm } from "./product-form.converters";

export const mapHotelProductToEditForm = (
	product?: IHotelProduct | null
): THotelProductEditSchema => {
	const rooms = (product?.variants ?? []).map(mapRoomRowFromVariant);

	return {
		[ENUM_FORM_HOTEL_SECTION.GENERAL]:
			mapHotelProductToGeneralForm(product),
		[ENUM_FORM_HOTEL_SECTION.ROOMS]: {
			[ENUM_FORM_HOTEL_PRODUCT_ROOMS.ROOMS_LIST]: rooms
		},
		[ENUM_FORM_HOTEL_SECTION.PRICING]: mapHotelPricingFromProduct(
			product,
			rooms.length
		)
	};
};
