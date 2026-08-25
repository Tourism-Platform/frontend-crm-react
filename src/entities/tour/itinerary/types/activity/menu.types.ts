export const ENUM_FORM_ACTIVITY_MENU = {
	ID: "id",
	NAME: "name",
	DESCRIPTION: "description"
} as const;

export type ENUM_FORM_ACTIVITY_MENU_TYPE =
	(typeof ENUM_FORM_ACTIVITY_MENU)[keyof typeof ENUM_FORM_ACTIVITY_MENU];

export interface IActivityMenuItem {
	[ENUM_FORM_ACTIVITY_MENU.ID]?: string;
	[ENUM_FORM_ACTIVITY_MENU.NAME]: string;
	[ENUM_FORM_ACTIVITY_MENU.DESCRIPTION]?: string | null;
}
