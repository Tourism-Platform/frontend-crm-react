import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/shared/lib";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton
} from "@/shared/ui";

import type { ISidebarMenu } from "../model";

interface INavMainProps {
	items: ISidebarMenu[];
}

export const NavMain: FC<INavMainProps> = ({ items }) => {
	const { t } = useTranslation("sidebar");
	const location = useLocation();
	return (
		<>
			{items.map((item) => (
				<SidebarGroup key={item.title}>
					<SidebarGroupLabel>{t(item?.title)}</SidebarGroupLabel>
					<SidebarMenu>
						{item?.menu?.map((subItem) => (
							<SidebarMenuButton
								tooltip={t(subItem?.label)}
								key={subItem?.label}
								size={"sm"}
								asChild
							>
								<Link
									to={subItem.path}
									className={cn(
										"text-muted-foreground",
										location?.pathname === subItem?.path &&
											"bg-sidebar-primary text-white hover:bg-sidebar-primary hover:text-white"
									)}
								>
									{subItem?.icon && <subItem.icon />}
									<span className="text-xs">
										{t(subItem?.label)}
									</span>
								</Link>
							</SidebarMenuButton>
						))}
					</SidebarMenu>
				</SidebarGroup>
			))}
		</>
	);
};
