import { ENUM_TRANSFER_PRODUCT_FLEET_CATEGORY_FIELD } from "@/entities/supplier";

export const createEmptyFleetCategoryRow = () => ({
	[ENUM_TRANSFER_PRODUCT_FLEET_CATEGORY_FIELD.ID]: undefined,
	[ENUM_TRANSFER_PRODUCT_FLEET_CATEGORY_FIELD.NAME]: ""
});
