import type { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import {
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/shared/ui";

/** Шапка сайдбара с логотипом; children — дополнительные пункты меню под ним */
export const SidebarLogo: FC<PropsWithChildren> = ({ children }) => {
	return (
		<SidebarHeader className="group-data-[collapsible=icon]:px-0">
			<SidebarMenu className="group-data-[collapsible=icon]:items-center">
				<SidebarMenuItem>
					<SidebarMenuButton
						size="lg"
						asChild
						className="group-data-[collapsible=icon]:justify-center"
					>
						<Link to={ENUM_PATH.MAIN}>
							<img
								src="/assets/logo.svg"
								alt="TourLink"
								className="size-8 shrink-0"
							/>
							<span className="truncate text-base font-semibold group-data-[collapsible=icon]:hidden">
								TourLink
							</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
				{children}
			</SidebarMenu>
		</SidebarHeader>
	);
};
