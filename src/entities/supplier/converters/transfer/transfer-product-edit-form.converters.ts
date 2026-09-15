import {
	ENUM_FORM_TRANSFER_CARS,
	ENUM_FORM_TRANSFER_SECTION,
	type ITransferProduct,
	type TTransferProductEditSchema
} from "../../types";

import { mapCarRowFromVariant } from "./transfer-product-cars.converters";
import { mapTransferProductToGeneralForm } from "./transfer-product-form.converters";
import { mapPricingFromProduct } from "./transfer-product-pricing.converters";

export const mapTransferProductToEditForm = (
	product?: ITransferProduct | null
): TTransferProductEditSchema => {
	const cars = (product?.variants ?? []).map(mapCarRowFromVariant);

	return {
		[ENUM_FORM_TRANSFER_SECTION.GENERAL]:
			mapTransferProductToGeneralForm(product),
		[ENUM_FORM_TRANSFER_SECTION.CARS]: {
			[ENUM_FORM_TRANSFER_CARS.CARS_LIST]: cars
		},
		[ENUM_FORM_TRANSFER_SECTION.PRICING]: mapPricingFromProduct(
			product,
			cars.length
		)
	};
};
