import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, matchPath, useLocation, useParams } from "react-router-dom";

import { type TToursPath, buildRoute } from "@/shared/config";
import { cn } from "@/shared/lib";
import {
	NavRichItem,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	useSidebar
} from "@/shared/ui";

import type { ISidebarMenu } from "../model";

interface INavMainProps {
	items: ISidebarMenu[];
}

export const NavMain: FC<INavMainProps> = ({ items }) => {
	const { t } = useTranslation("sidebar");
	const { tourId } = useParams<{ tourId: string }>();
	const location = useLocation();
	const { state, isMobile } = useSidebar();
	const iconOnly = state === "collapsed" && !isMobile;

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
								toPath = buildRoute(
									subItem.path as TToursPath,
									{ tourId: tourId }
								);
							return (
								<SidebarMenuButton
									tooltip={t(subItem?.label)}
									key={subItem?.label}
									size="lg"
									isActive={!!match}
									asChild
									className={cn(
										"h-auto min-h-12 items-start py-2 cursor-pointer"
									)}
								>
									<Link to={toPath}>
										<NavRichItem
											icon={subItem.icon}
											title={t(subItem.label)}
											description={
												subItem.description &&
												t(subItem.description)
											}
											iconOnly={iconOnly}
										/>
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
