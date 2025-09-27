import type { FC } from "react";

import { Sidebar, SidebarContent, SidebarRail } from "@/shared/ui";

import { type ISidebarMenu, SIDEBAR_LIST } from "../model";

import { NavMain } from "./nav-main";

export interface ICustomSidebarProps {
	items?: ISidebarMenu[];
}

export const CustomSidebar: FC<ICustomSidebarProps> = ({
	items = SIDEBAR_LIST
}) => {
	return (
		<Sidebar collapsible="icon">
			<SidebarContent>
				<NavMain items={items} />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
};
