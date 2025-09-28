import type { FC } from "react";

import { Sidebar, SidebarContent, SidebarRail } from "@/shared/ui";

import { type ISidebarMenu } from "../model";

import { NavMain } from "./nav-main";

export interface ICustomSidebarProps {
	items: ISidebarMenu[];
}

export const CustomSidebar: FC<ICustomSidebarProps> = ({ items }) => {
	return (
		<Sidebar collapsible="icon">
			<SidebarContent>
				<NavMain items={items} />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
};
