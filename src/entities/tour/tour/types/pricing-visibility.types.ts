export const ENUM_PRICING_VISIBILITY = {
	SHOW_FROM: "show_from",
	SHOW_EXACT: "show_exact",
	HIDE: "hide"
} as const;

export type ENUM_PRICING_VISIBILITY_TYPE =
	(typeof ENUM_PRICING_VISIBILITY)[keyof typeof ENUM_PRICING_VISIBILITY];
