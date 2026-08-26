import type { ReactNode } from "react";

import type { TSidebarKeys } from "@/shared/config";

export interface IUserMenu {
	menu?: IUserMenuItem[];
}

export interface IUserMenuItem {
	icon?: ReactNode;
	label: TSidebarKeys;
	description?: TSidebarKeys;
	path: string;
}
