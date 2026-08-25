import type {
	IActivityMenuItem,
	TActivityMenuItemBackend,
	TActivityMenuItemInputBackend
} from "../../types";
import { ENUM_FORM_ACTIVITY_MENU } from "../../types";

export const mapMenuItemFromBackend = (
	item: TActivityMenuItemBackend
): IActivityMenuItem => ({
	...(item.id ? { [ENUM_FORM_ACTIVITY_MENU.ID]: item.id } : {}),
	[ENUM_FORM_ACTIVITY_MENU.NAME]: item.name ?? "",
	[ENUM_FORM_ACTIVITY_MENU.DESCRIPTION]: item.description ?? null
});

export const mapMenuFromBackend = (
	menu?: TActivityMenuItemBackend[] | null
): IActivityMenuItem[] => (menu ?? []).map(mapMenuItemFromBackend);

export const mapMenuItemToBackend = (
	item: IActivityMenuItem
): TActivityMenuItemInputBackend => ({
	...(item[ENUM_FORM_ACTIVITY_MENU.ID]
		? { id: item[ENUM_FORM_ACTIVITY_MENU.ID] }
		: {}),
	name: item[ENUM_FORM_ACTIVITY_MENU.NAME] || null,
	description: item[ENUM_FORM_ACTIVITY_MENU.DESCRIPTION] || null
});

export const mapMenuToBackend = (
	menu?: IActivityMenuItem[] | null
): TActivityMenuItemInputBackend[] | null => {
	if (!menu?.length) {
		return null;
	}

	return menu
		.filter((item) => item[ENUM_FORM_ACTIVITY_MENU.NAME]?.trim())
		.map(mapMenuItemToBackend);
};
