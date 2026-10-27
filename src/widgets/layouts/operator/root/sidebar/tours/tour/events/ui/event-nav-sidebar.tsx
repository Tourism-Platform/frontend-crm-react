import { ArrowLeft } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import {
	CustomScroll,
	NavRichItem,
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarLogo,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	useSidebar
} from "@/shared/ui";

import { useEventNavDays } from "../model/use-event-nav-days";

import { NavDay } from "./nav-day";
import { NavDaySkeleton } from "./nav-day-skeleton";

export const EventNavSidebar: FC = () => {
	const { t } = useTranslation("common_events");
	const { tourId = "", optionId = "" } = useParams();
	const { days, isLoading } = useEventNavDays(tourId, optionId);
	const { state, isMobile } = useSidebar();
	const backLabel = t("event_nav.back");

	return (
		<Sidebar collapsible="icon">
			<SidebarLogo>
				<SidebarMenuItem>
					<SidebarMenuButton
						tooltip={backLabel}
						size="lg"
						asChild
						className="h-auto min-h-12 py-2"
					>
						<Link
							to={buildRoute(ENUM_PATH.TOURS.ITINERARY, {
								tourId
							})}
						>
							<NavRichItem
								icon={<ArrowLeft />}
								title={backLabel}
								iconOnly={state === "collapsed" && !isMobile}
								className="items-center"
							/>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarLogo>
			<SidebarContent className="overflow-hidden">
				<CustomScroll className="flex min-h-0 flex-1 flex-col gap-2 group-data-[collapsible=icon]:overflow-hidden">
					<SidebarGroup>
						<SidebarGroupLabel>
							{t("event_nav.title")}
						</SidebarGroupLabel>
						<SidebarMenu>
							{isLoading
								? Array.from({ length: 3 }, (_, i) => (
										<NavDaySkeleton
											key={i}
											eventsCount={i === 0 ? 3 : 0}
										/>
									))
								: days.map((day) => (
										<NavDay key={day.day} day={day} />
									))}
						</SidebarMenu>
					</SidebarGroup>
				</CustomScroll>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
};
