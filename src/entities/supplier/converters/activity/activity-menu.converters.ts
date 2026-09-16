import type { MenuItem } from "@/shared/api/generated/Api";

import { ENUM_FORM_ACTIVITY_MENU, type IActivityMenuItem } from "../../types";

export const mapActivityMenuItemFromBackend = (
	item: MenuItem
): IActivityMenuItem => ({
	...(item.id ? { [ENUM_FORM_ACTIVITY_MENU.ID]: item.id } : {}),
	[ENUM_FORM_ACTIVITY_MENU.NAME]: item.name ?? "",
	[ENUM_FORM_ACTIVITY_MENU.DESCRIPTION]: item.description ?? null
});

export const mapActivityMenuFromBackend = (
	menu?: MenuItem[] | null
): IActivityMenuItem[] => (menu ?? []).map(mapActivityMenuItemFromBackend);

export const mapActivityMenuItemToBackend = (
	item: IActivityMenuItem
): MenuItem => ({
	...(item[ENUM_FORM_ACTIVITY_MENU.ID]
		? { id: item[ENUM_FORM_ACTIVITY_MENU.ID] }
		: {}),
	name: item[ENUM_FORM_ACTIVITY_MENU.NAME] || null,
	description: item[ENUM_FORM_ACTIVITY_MENU.DESCRIPTION] || null
});

export const mapActivityMenuToBackend = (
	menu?: IActivityMenuItem[] | null
): MenuItem[] | undefined => {
	if (!menu) {
		return undefined;
	}

	return menu
		.filter((item) => item[ENUM_FORM_ACTIVITY_MENU.NAME]?.trim())
		.map(mapActivityMenuItemToBackend);
};
