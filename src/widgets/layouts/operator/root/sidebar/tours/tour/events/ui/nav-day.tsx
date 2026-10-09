import { CalendarDays, ChevronRight } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { cn } from "@/shared/lib";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	NavRichItem,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	useSidebar
} from "@/shared/ui";

import { useAutoOpen } from "../model/use-auto-open";
import type { IEventNavDay } from "../model/use-event-nav-days";

import { NavEvent } from "./nav-event";

export const NavDay: FC<{ day: IEventNavDay }> = ({ day }) => {
	const { t } = useTranslation("common_events");
	const { eventId } = useParams();
	const { state, isMobile } = useSidebar();
	const isOnPath = day.events.some((ev) => ev.id === eventId);
	const [open, setOpen] = useAutoOpen(isOnPath);
	const label = t("event_nav.day", { day: day.day });

	return (
		<Collapsible open={open} onOpenChange={setOpen} asChild>
			<SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<SidebarMenuButton
						tooltip={label}
						size="lg"
						isActive={isOnPath && !open}
						className="h-auto min-h-12 cursor-pointer py-2"
					>
						<NavRichItem
							icon={<CalendarDays />}
							title={label}
							iconOnly={state === "collapsed" && !isMobile}
							className="items-center"
						/>
						<ChevronRight
							className={cn(
								"ml-auto size-4 shrink-0 transition-transform duration-200 group-data-[collapsible=icon]:hidden",
								open && "rotate-90"
							)}
						/>
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub>
						{day.events.length ? (
							day.events.map((event) => (
								<NavEvent key={event.id} event={event} />
							))
						) : (
							<li className="px-2 py-1 text-xs text-muted-foreground">
								{t("event_nav.empty_day")}
							</li>
						)}
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	);
};
