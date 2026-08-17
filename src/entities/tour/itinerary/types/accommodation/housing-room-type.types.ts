export const ENUM_HOUSING_ROOM_TYPE = {
	SINGLE: "single",
	DOUBLE: "double",
	TWIN: "twin",
	TRIPLE: "triple",
	QUADRUPLE: "quadruple",
	SUITE: "suite",
	FAMILY: "family"
} as const;

export type ENUM_HOUSING_ROOM_TYPE_TYPE =
	(typeof ENUM_HOUSING_ROOM_TYPE)[keyof typeof ENUM_HOUSING_ROOM_TYPE];
