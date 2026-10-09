import { ChevronRightCircleIcon } from "lucide-react";
import type { FC } from "react";

import {
	CustomScroll,
	Sidebar,
	SidebarContent,
	SidebarRail,
	SidebarTrigger
} from "@/shared/ui";

import { type ISidebarMenu } from "../model";

import { NavMain } from "./nav-main";

export interface ICustomSidebarProps {
	items: ISidebarMenu[];
}

export const CustomSidebar: FC<ICustomSidebarProps> = ({ items }) => {
	return (
		<Sidebar collapsible="icon">
			<SidebarTrigger
				className="absolute  top-2 right-2 z-30"
				icon={
					<ChevronRightCircleIcon
						size={20}
						className="group-data-[state=expanded]:rotate-180 transition-transform duration-200 ease-linear text-muted-foreground"
					/>
				}
			/>
			<SidebarContent className="group-data-[state=expanded]:pt-5 transition-transform duration-200 ease-linear pt-10 overflow-hidden">
				<CustomScroll className="flex min-h-0 flex-1 flex-col gap-2 group-data-[collapsible=icon]:overflow-hidden">
					<NavMain items={items} />
				</CustomScroll>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
};
