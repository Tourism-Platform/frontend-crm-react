import { ArrowLeft, ChevronRightCircleIcon } from "lucide-react";
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
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarRail,
	SidebarTrigger,
	useSidebar
} from "@/shared/ui";

import { useEventNavDays } from "../model/use-event-nav-days";

import { NavDay } from "./nav-day";

export const EventNavSidebar: FC = () => {
	const { t } = useTranslation("common_events");
	const { tourId = "", optionId = "" } = useParams();
	const { days, isLoading } = useEventNavDays(tourId, optionId);
	const { state, isMobile } = useSidebar();
	const backLabel = t("event_nav.back");

	return (
		<Sidebar collapsible="icon">
			<SidebarTrigger
				className="absolute top-2 right-2 z-30"
				icon={
					<ChevronRightCircleIcon
						size={20}
						className="group-data-[state=expanded]:rotate-180 transition-transform duration-200 ease-linear text-muted-foreground"
					/>
				}
			/>
			<SidebarHeader className="pt-10 group-data-[state=expanded]:pt-5 transition-[padding] duration-200 ease-linear">
				<SidebarMenu>
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
									iconOnly={
										state === "collapsed" && !isMobile
									}
									className="items-center"
								/>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="overflow-hidden">
				<CustomScroll className="flex min-h-0 flex-1 flex-col gap-2 group-data-[collapsible=icon]:overflow-hidden">
					<SidebarGroup>
						<SidebarGroupLabel>
							{t("event_nav.title")}
						</SidebarGroupLabel>
						<SidebarMenu>
							{isLoading
								? Array.from({ length: 3 }, (_, i) => (
										<SidebarMenuItem key={i}>
											<SidebarMenuSkeleton showIcon />
										</SidebarMenuItem>
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
