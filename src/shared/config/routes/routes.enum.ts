export const ENUM_AUTH = {
	ONLY_PUBLIC: "onlyPublic",
	PUBLIC: "public",
	PRIVATE: "private"
} as const;

export type ENUM_AUTH_TYPE = (typeof ENUM_AUTH)[keyof typeof ENUM_AUTH];

export const ENUM_LAYOUT = {
	ROOT: "root",
	ADMIN: "admin"
} as const;

export type ENUM_LAYOUT_TYPE = (typeof ENUM_LAYOUT)[keyof typeof ENUM_LAYOUT];
