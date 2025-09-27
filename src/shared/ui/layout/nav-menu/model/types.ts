export interface INavItemBase {
	label: string;
	href?: string;
	submenu?: boolean;
	//   type?: "description" | "simple" | "icon"
	type?: string;
	items?: INavSubItem[];
}

export interface INavSubItem {
	label: string;
	href: string;
	description?: string;
	icon?: string;
}
