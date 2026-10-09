import { ChevronRight } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import { InfoCircleIcon } from "@/shared/assets";
import { buildRoute } from "@/shared/config";
import { cn } from "@/shared/lib";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem
} from "@/shared/ui";

import {
	EVENT_METADATA,
	EVENT_TYPE_TO_TABS,
	type IEventLibraryItem,
	mapEventTypeToLibraryEditPath
} from "@/entities/tour";

import { useActiveSection } from "../../../model/use-active-section";
import { useAutoOpen } from "../../../model/use-auto-open";

export const NavLibraryEvent: FC<{ item: IEventLibraryItem }> = ({ item }) => {
	const { t } = useTranslation("event_templates_page");
	const { libraryId } = useParams();

	const isCurrent = libraryId === item.id;
	const [open, setOpen] = useAutoOpen(isCurrent);

	const path = mapEventTypeToLibraryEditPath(item.eventType);
	const tabs = EVENT_TYPE_TO_TABS[item.eventType] ?? [];
	const activeTab = useActiveSection(tabs, isCurrent);
	const title = item.name || t("event_nav.untitled");

	const meta = EVENT_METADATA[item.eventType];
	const Icon = meta?.icon ?? InfoCircleIcon;

	if (!path) return null;

	const eventHref = buildRoute(path, { libraryId: item.id });

	return (
		<Collapsible open={open} onOpenChange={setOpen} asChild>
			<SidebarMenuItem>
				<SidebarMenuButton tooltip={title} isActive={isCurrent} asChild>
					<Link
						to={eventHref}
						onClick={(e) => {
							// Already on this event: keep the selected tab, just expand.
							if (isCurrent) e.preventDefault();
							setOpen(true);
						}}
					>
						<span className="flex shrink-0">
							<Icon
								className={cn(
									"size-4",
									meta?.color_text ?? "text-muted-foreground"
								)}
							/>
						</span>
						<span>{title}</span>
					</Link>
				</SidebarMenuButton>
				<CollapsibleTrigger asChild>
					<SidebarMenuAction className="cursor-pointer">
						<ChevronRight
							className={cn(
								"transition-transform duration-200",
								open && "rotate-90"
							)}
						/>
					</SidebarMenuAction>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub>
						{tabs.map((tab) => (
							<SidebarMenuSubItem key={tab}>
								<SidebarMenuSubButton
									asChild
									size="sm"
									isActive={isCurrent && activeTab === tab}
								>
									<Link
										to={eventHref}
										state={{ section: tab }}
										preventScrollReset
									>
										<span>
											{t(
												`event_nav.tabs.${tab}` as never
											)}
										</span>
									</Link>
								</SidebarMenuSubButton>
							</SidebarMenuSubItem>
						))}
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	);
};
