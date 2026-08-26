import type { TSidebarKeys, TToursPath } from "@/shared/config";

export interface ISidebarMenu {
	title: TSidebarKeys;
	menu?: ISidebarMenuItem[];
}

export interface ISidebarMenuItem {
	icon?: React.ReactNode;
	label: TSidebarKeys;
	description?: TSidebarKeys;
	path: string | TToursPath;
}
