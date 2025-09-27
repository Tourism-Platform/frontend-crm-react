import { BookOpenIcon, InfoIcon, LifeBuoyIcon } from "lucide-react";
import type { FC } from "react";

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
	return (
		<NavigationMenu viewport={false} className="max-md:hidden">
			<NavigationMenuList className="gap-2">
				{navItems.map((link, index) => (
					<NavigationMenuItem key={index}>
						{link.submenu ? (
							<>
								<NavigationMenuTrigger className="text-muted-foreground hover:text-primary bg-transparent px-2 py-1.5 font-medium *:[svg]:-me-0.5 *:[svg]:size-3.5">
									{link.label}
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
													{/* Display icon if present */}
													{link.type === "icon" &&
														"icon" in item && (
															<div className="flex items-center gap-2">
																{item.icon ===
																	"BookOpenIcon" && (
																	<BookOpenIcon
																		size={
																			16
																		}
																		className="text-foreground opacity-60"
																		aria-hidden="true"
																	/>
																)}
																{item.icon ===
																	"LifeBuoyIcon" && (
																	<LifeBuoyIcon
																		size={
																			16
																		}
																		className="text-foreground opacity-60"
																		aria-hidden="true"
																	/>
																)}
																{item.icon ===
																	"InfoIcon" && (
																	<InfoIcon
																		size={
																			16
																		}
																		className="text-foreground opacity-60"
																		aria-hidden="true"
																	/>
																)}
																<span>
																	{item.label}
																</span>
															</div>
														)}

													{/* Display label with description if present */}
													{link.type ===
														"description" &&
													"description" in item ? (
														<div className="space-y-1">
															<div className="font-medium">
																{item.label}
															</div>
															<p className="text-muted-foreground line-clamp-2 text-xs">
																{
																	item.description
																}
															</p>
														</div>
													) : (
														// Display simple label if not icon or description type
														!link.type ||
														(link.type !== "icon" &&
															link.type !==
																"description" && (
																<span>
																	{item.label}
																</span>
															))
													)}
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
