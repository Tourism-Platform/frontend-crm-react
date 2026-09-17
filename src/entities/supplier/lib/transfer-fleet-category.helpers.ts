import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD,
	ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD,
	type ITransferCarPrice,
	type ITransferFleetCategory,
	type ITransferProductCategoryPriceRow,
	type ITransferProductPerCarByClassPriceRow
} from "../types";

const emptyCategoryPriceRow = (): ITransferProductCategoryPriceRow => ({
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.CATEGORY_ID]: "",
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.PRICE_ID]: undefined,
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.NAME]: "",
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.COST]: null,
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.FEES]: [],
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.MARKUP]: null
});

export const fleetCategoryNameById = (
	fleetCategories: readonly ITransferFleetCategory[],
	categoryId: string
): string | null =>
	fleetCategories.find((category) => category.id === categoryId)?.name ??
	null;

export const mapPriceToCategoryRow = (
	price: ITransferCarPrice,
	fleetCategories: readonly ITransferFleetCategory[]
): ITransferProductCategoryPriceRow => ({
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.CATEGORY_ID]: price.categoryId,
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.PRICE_ID]: price.id || undefined,
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.NAME]:
		fleetCategoryNameById(fleetCategories, price.categoryId) ?? "",
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.COST]:
		price.expenses.cost.val ?? null,
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.FEES]: price.expenses.fees ?? [],
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.CURRENCY]:
		price.expenses.cost.currency ?? DEFAULT_EVENT_CURRENCY,
	[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.MARKUP]: null
});

export const alignCarCategoryPriceRows = (
	fleetCategories: readonly ITransferFleetCategory[],
	existing: ITransferProductCategoryPriceRow[] = []
): ITransferProductCategoryPriceRow[] =>
	fleetCategories.map((fleetCategory) => {
		const matched = existing.find(
			(row) =>
				row[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.CATEGORY_ID] ===
				fleetCategory.id
		);
		if (matched) {
			return {
				...matched,
				[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.NAME]:
					fleetCategory.name ?? "",
				[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.CATEGORY_ID]:
					fleetCategory.id
			};
		}
		return {
			...emptyCategoryPriceRow(),
			[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.CATEGORY_ID]:
				fleetCategory.id,
			[ENUM_TRANSFER_PRODUCT_CATEGORY_ROW_FIELD.NAME]:
				fleetCategory.name ?? ""
		};
	});

export const alignPerCarMatrixToFleet = (
	carsListLength: number,
	fleetCategories: readonly ITransferFleetCategory[],
	existing: ITransferProductPerCarByClassPriceRow[] = []
): ITransferProductPerCarByClassPriceRow[] =>
	Array.from({ length: carsListLength }, (_, index) => ({
		[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CATEGORIES]:
			alignCarCategoryPriceRows(
				fleetCategories,
				existing[index]?.[
					ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CATEGORIES
				] ?? []
			)
	}));
