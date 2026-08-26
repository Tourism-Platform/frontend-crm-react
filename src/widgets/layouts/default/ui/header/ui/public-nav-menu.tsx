import type { FC } from "react";
import { useTranslation } from "react-i18next";

import {
	NAV_RICH_ROW_CLASSNAME,
	NavRichItem,
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	Separator
} from "@/shared/ui";

import type { TPublicNavGroup } from "../model/types";

type TPublicNavMenuProps = {
	items: TPublicNavGroup[];
};

export const PublicNavMenu: FC<TPublicNavMenuProps> = ({ items }) => {
	const { t } = useTranslation("header");

	return (
		<NavigationMenu viewport={false} className="max-md:hidden">
			<NavigationMenuList className="gap-1">
				{items.map((group) => (
					<NavigationMenuItem key={group.labelKey}>
						<NavigationMenuTrigger className="text-muted-foreground hover:text-foreground data-[state=open]:text-foreground bg-transparent px-3 py-1.5 text-sm font-medium cursor-pointer hover:bg-muted data-[state=open]:bg-muted">
							{t(group.labelKey)}
						</NavigationMenuTrigger>
						<NavigationMenuContent className="z-50 min-w-60 p-2 shadow-lg">
							{group.sections.map((section, sectionIndex) => (
								<div key={section.labelKey ?? sectionIndex}>
									{sectionIndex > 0 && (
										<Separator className="my-1" />
									)}
									{section.labelKey && (
										<p className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
											{t(section.labelKey)}
										</p>
									)}
									<ul className="flex flex-col gap-0.5">
										{section.items.map((item) => (
											<li key={item.labelKey}>
												<NavigationMenuLink asChild>
													<a
														href="#"
														className={
															NAV_RICH_ROW_CLASSNAME
														}
													>
														<NavRichItem
															icon={item.icon}
															title={t(
																item.labelKey
															)}
															description={t(
																item.descriptionKey
															)}
														/>
													</a>
												</NavigationMenuLink>
											</li>
										))}
									</ul>
								</div>
							))}
						</NavigationMenuContent>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
};
