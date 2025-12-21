export const ENUM_FORM_MULTIPLY_OPTION = {
	DESCRIPTION: "description",
	OPTIONS: "options"
} as const;

export type ENUM_FORM_MULTIPLY_OPTION_TYPE =
	(typeof ENUM_FORM_MULTIPLY_OPTION)[keyof typeof ENUM_FORM_MULTIPLY_OPTION];
