import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
	NAV_RICH_ROW_CLASSNAME,
	NavRichItem,
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger
} from "@/shared/ui";

import type { INavItemBase } from "../model";

interface INavMenuProps {
	navItems: INavItemBase[];
}

export const NavMenu: FC<INavMenuProps> = ({ navItems }) => {
	const { t } = useTranslation("header");
	return (
		<NavigationMenu viewport={false} className="max-md:hidden">
			<NavigationMenuList className="gap-1">
				{navItems.map((link, index) => (
					<NavigationMenuItem key={index}>
						{link.submenu ? (
							<>
								<NavigationMenuTrigger className="text-muted-foreground hover:text-foreground data-[state=open]:text-foreground bg-transparent px-3 py-1.5 text-sm font-medium cursor-pointer hover:bg-muted data-[state=open]:bg-muted">
									{t(link.label)}
								</NavigationMenuTrigger>
								<NavigationMenuContent className="z-50 min-w-60 p-2 shadow-lg">
									<ul className="flex flex-col gap-0.5">
										{link?.items?.map((item) => (
											<li key={item.href}>
												<NavigationMenuLink asChild>
													<Link
														to={item.href}
														className={
															NAV_RICH_ROW_CLASSNAME
														}
													>
														<NavRichItem
															icon={item.icon}
															title={t(
																item.label
															)}
															description={
																item.description &&
																t(
																	item.description
																)
															}
														/>
													</Link>
												</NavigationMenuLink>
											</li>
										))}
									</ul>
								</NavigationMenuContent>
							</>
						) : (
							<NavigationMenuLink asChild>
								<Link
									to={link?.href || "#"}
									className="text-muted-foreground hover:text-foreground data-[state=open]:text-foreground bg-transparent px-3 py-1.5 text-sm font-medium cursor-pointer hover:bg-muted rounded-md"
								>
									{t(link.label)}
								</Link>
							</NavigationMenuLink>
						)}
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
};
