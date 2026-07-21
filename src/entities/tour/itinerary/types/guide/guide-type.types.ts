export const ENUM_GUIDE_TYPE = {
	LOCAL: "local",
	ACCOMPANYING: "accompanying"
} as const;

export type ENUM_GUIDE_TYPE_TYPE =
	(typeof ENUM_GUIDE_TYPE)[keyof typeof ENUM_GUIDE_TYPE];
