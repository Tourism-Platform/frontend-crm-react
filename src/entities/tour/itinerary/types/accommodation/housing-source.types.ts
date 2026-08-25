export const ENUM_HOUSING_SOURCE = {
	CUSTOM: "custom",
	INHERITED: "inherited"
} as const;

export type ENUM_HOUSING_SOURCE_TYPE =
	(typeof ENUM_HOUSING_SOURCE)[keyof typeof ENUM_HOUSING_SOURCE];

export type THousingSourceBackend = ENUM_HOUSING_SOURCE_TYPE;
