import type { THeaderKeys } from "@/shared/config";

export interface INavItemBase {
	label: THeaderKeys;
	href?: string;
	submenu?: boolean;
	type?: string;
	items?: INavSubItem[];
}

export interface INavSubItem {
	label: THeaderKeys;
	href: string;
	description?: THeaderKeys;
	icon?: string;
}
