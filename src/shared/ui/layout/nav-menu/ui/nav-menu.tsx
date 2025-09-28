import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import {
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
			<NavigationMenuList className="gap-2">
				{navItems.map((link, index) => (
					<NavigationMenuItem key={index}>
						{link.submenu ? (
							<>
								<NavigationMenuTrigger className="text-muted-foreground hover:text-primary bg-transparent px-2 py-1.5 font-medium *:[svg]:-me-0.5 *:[svg]:size-3.5">
									{t(link.label)}
								</NavigationMenuTrigger>
								<NavigationMenuContent className="data-[motion=from-end]:slide-in-from-right-16! data-[motion=from-start]:slide-in-from-left-16! data-[motion=to-end]:slide-out-to-right-16! data-[motion=to-start]:slide-out-to-left-16! z-50 p-1">
									<ul
										className={cn(
											link.type === "description"
												? "min-w-64"
												: "min-w-48"
										)}
									>
										{link?.items?.map((item, itemIndex) => (
											<li key={itemIndex}>
												<NavigationMenuLink
													href={item.href}
													className="py-1.5"
												>
													<div className="flex items-center gap-2">
														{item?.icon && (
															<item.icon />
														)}
														<span>
															{t(item.label)}
														</span>
													</div>
												</NavigationMenuLink>
											</li>
										))}
									</ul>
								</NavigationMenuContent>
							</>
						) : (
							<NavigationMenuLink
								href={link.href}
								className="text-muted-foreground hover:text-primary py-1.5 font-medium"
							>
								{link.label}
							</NavigationMenuLink>
						)}
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
};
