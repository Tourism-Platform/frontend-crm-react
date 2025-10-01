import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, matchPath, useLocation, useParams } from "react-router-dom";

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
	const { tourId } = useParams<{ tourId: string }>();
	const location = useLocation();
	return (
		<>
			{items.map((item) => (
				<SidebarGroup key={item.title}>
					<SidebarGroupLabel>{t(item?.title)}</SidebarGroupLabel>
					<SidebarMenu>
						{item?.menu?.map((subItem) => {
							const match = matchPath(
								subItem.path,
								location.pathname
							);
							let toPath: string = subItem.path;
							if (tourId)
								toPath = toPath.replace(":tourId", tourId);
							return (
								<SidebarMenuButton
									tooltip={t(subItem?.label)}
									key={subItem?.label}
									size={"sm"}
									asChild
								>
									<Link
										to={toPath}
										className={cn(
											"text-muted-foreground",
											!!match &&
												"bg-sidebar-primary text-primary-foreground hover:bg-sidebar-primary hover:text-muted-foreground"
										)}
									>
										{subItem?.icon && <subItem.icon />}
										<span className="text-sm">
											{t(subItem?.label)}
										</span>
									</Link>
								</SidebarMenuButton>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>
			))}
		</>
	);
};
