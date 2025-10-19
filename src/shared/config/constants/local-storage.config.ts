export const ENUM_LOCAL_STORAGE = {
	IS_AUTH: "isAuth"
} as const;

export type ENUM_LOCAL_STORAGE_TYPES =
	(typeof ENUM_LOCAL_STORAGE)[keyof typeof ENUM_LOCAL_STORAGE];
