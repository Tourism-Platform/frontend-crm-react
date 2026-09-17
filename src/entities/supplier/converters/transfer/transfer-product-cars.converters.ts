import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_FORM_TRANSFER_CARS,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_VEHICLE_BODY_TYPE,
	type ISupplierFixedCharge,
	type ITransferCarPriceWrite,
	type ITransferProduct,
	type ITransferProductCategoryPriceRow,
	type ITransferVariant,
	type ITransferVariantWrite,
	type TTransferCarRow
} from "../../types";

import { mapTransferCategoryRowsToPriceWrites } from "./transfer-product-pricing.converters";

const EMPTY_FIXED_CHARGE = (): ISupplierFixedCharge => ({
	typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
	cost: { val: 0, currency: DEFAULT_EVENT_CURRENCY },
	fees: null,
	markup: null
});

export const mapCarRowFromVariant = (
	variant: ITransferVariant
): TTransferCarRow => ({
	[ENUM_FORM_TRANSFER_CARS.VARIANT_ID]: variant.id,
	[ENUM_FORM_TRANSFER_CARS.NAME]: variant.name,
	[ENUM_FORM_TRANSFER_CARS.CAR_NAME]:
		variant.bodyType ?? ENUM_VEHICLE_BODY_TYPE.SEDAN,
	[ENUM_FORM_TRANSFER_CARS.PAX]: variant.pax,
	[ENUM_FORM_TRANSFER_CARS.DESCRIPTION]: variant.description ?? undefined
});

const mapPriceToWrite = (
	price: ITransferVariant["prices"][number]
): ITransferCarPriceWrite => ({
	id: price.id,
	categoryId: price.categoryId,
	expenses: price.expenses
});

export const mapTransferCarRowToVariantWrite = (
	row: TTransferCarRow,
	product: ITransferProduct,
	options?: {
		categoryRows?: ITransferProductCategoryPriceRow[];
		addMarginSeparately?: boolean;
	}
): ITransferVariantWrite => {
	const existing = product.variants.find(
		(variant) => variant.id === row[ENUM_FORM_TRANSFER_CARS.VARIANT_ID]
	);

	const pricesFromMatrix =
		options?.categoryRows && options.addMarginSeparately !== undefined
			? mapTransferCategoryRowsToPriceWrites(
					options.categoryRows,
					options.addMarginSeparately
				)
			: null;

	return {
		name: row[ENUM_FORM_TRANSFER_CARS.NAME],
		bodyType: row[ENUM_FORM_TRANSFER_CARS.CAR_NAME],
		pax: row[ENUM_FORM_TRANSFER_CARS.PAX] ?? 1,
		description: row[ENUM_FORM_TRANSFER_CARS.DESCRIPTION]?.trim() || null,
		expenses: existing?.expenses ?? EMPTY_FIXED_CHARGE(),
		prices: pricesFromMatrix ?? existing?.prices.map(mapPriceToWrite) ?? []
	};
};
