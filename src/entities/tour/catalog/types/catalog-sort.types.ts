export const ENUM_CATALOG_SORT = {
	PRICE_ASC: "price_asc",
	PRICE_DESC: "price_desc",
	DURATION_ASC: "duration_asc",
	DURATION_DESC: "duration_desc"
} as const;

export type ENUM_CATALOG_SORT_TYPE =
	(typeof ENUM_CATALOG_SORT)[keyof typeof ENUM_CATALOG_SORT];
