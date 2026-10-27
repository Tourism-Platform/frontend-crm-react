import type { FC } from "react";

import {
	CustomScroll,
	Sidebar,
	SidebarContent,
	SidebarRail
} from "@/shared/ui";

import { type ISidebarMenu } from "../model";

import { NavMain } from "./nav-main";
import { SidebarLogo } from "./sidebar-logo";

export interface ICustomSidebarProps {
	items: ISidebarMenu[];
}

export const CustomSidebar: FC<ICustomSidebarProps> = ({ items }) => {
	return (
		<Sidebar collapsible="icon">
			<SidebarLogo />
			<SidebarContent className="overflow-hidden">
				<CustomScroll className="flex min-h-0 flex-1 flex-col gap-2 group-data-[collapsible=icon]:overflow-hidden">
					<NavMain items={items} />
				</CustomScroll>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
};
