import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
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
						<NavigationMenuTrigger className="text-muted-foreground hover:text-foreground data-[state=open]:text-foreground bg-transparent px-3 py-1.5 text-sm font-medium hover:bg-muted data-[state=open]:bg-muted">
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
												<button
													type="button"
													className={cn(
														"flex w-full items-start gap-2.5 rounded-lg px-3 py-2 text-left transition-colors",
														"hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
													)}
												>
													<span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
														<item.icon className="size-4" />
													</span>
													<span className="min-w-0">
														<span className="block text-[13px] font-medium leading-tight">
															{t(item.labelKey)}
														</span>
														<span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
															{t(
																item.descriptionKey
															)}
														</span>
													</span>
												</button>
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
