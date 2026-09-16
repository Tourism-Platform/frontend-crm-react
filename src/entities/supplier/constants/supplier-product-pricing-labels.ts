import type { TOptionsKeys } from "@/shared/config";

import {
	ENUM_SUPPLIER_TYPE,
	type IBusProduct,
	type IFlightProduct,
	type IHotelProduct,
	type ITrainProduct,
	type ITransferProduct,
	type TSupplierProduct
} from "../types";

import { BUS_PRICING_LABELS } from "./bus-pricing-labels";
import { FLIGHT_PRICING_LABELS } from "./flight-pricing-labels";
import { HOTEL_PRICING_LABELS } from "./hotel-pricing-labels";
import { TRAIN_PRICING_LABELS } from "./train-pricing-labels";
import { TRANSFER_PRICING_LABELS } from "./transfer-pricing-labels";

/**
 * options-key for product card pricing badge.
 * `typ` on products is a wide enum (not a literal discriminant), so narrow via cast.
 */
export const getSupplierProductPricingLabelKey = (
	product: TSupplierProduct
): TOptionsKeys | undefined => {
	switch (product.typ) {
		case ENUM_SUPPLIER_TYPE.HOTEL:
			return HOTEL_PRICING_LABELS[(product as IHotelProduct).pricing];
		case ENUM_SUPPLIER_TYPE.TRANSFER:
			return TRANSFER_PRICING_LABELS[
				(product as ITransferProduct).pricing
			];
		case ENUM_SUPPLIER_TYPE.FLIGHT:
			return FLIGHT_PRICING_LABELS[(product as IFlightProduct).pricing];
		case ENUM_SUPPLIER_TYPE.TRAIN:
			return TRAIN_PRICING_LABELS[(product as ITrainProduct).pricing];
		case ENUM_SUPPLIER_TYPE.BUS:
			return BUS_PRICING_LABELS[(product as IBusProduct).pricing];
		default:
			return undefined;
	}
};
