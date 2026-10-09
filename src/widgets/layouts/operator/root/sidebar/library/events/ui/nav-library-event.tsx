import { ChevronRight } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams, useSearchParams } from "react-router-dom";

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

import { useAutoOpen } from "../../../model/use-auto-open";

export const NavLibraryEvent: FC<{ item: IEventLibraryItem }> = ({ item }) => {
	const { t } = useTranslation("event_templates_page");
	const { libraryId } = useParams();
	const [searchParams] = useSearchParams();

	const isCurrent = libraryId === item.id;
	const [open, setOpen] = useAutoOpen(isCurrent);

	const path = mapEventTypeToLibraryEditPath(item.eventType);
	const tabs = EVENT_TYPE_TO_TABS[item.eventType] ?? [];
	const activeTab = searchParams.get("tab") ?? tabs[0];
	const title = item.name || t("event_nav.untitled");

	const meta = EVENT_METADATA[item.eventType];
	const Icon = meta?.icon ?? InfoCircleIcon;

	if (!path) return null;

	const buildTabHref = (tab: string) =>
		buildRoute(path, { libraryId: item.id }, { tab });

	return (
		<Collapsible open={open} onOpenChange={setOpen} asChild>
			<SidebarMenuItem>
				<SidebarMenuButton tooltip={title} isActive={isCurrent} asChild>
					<Link
						to={buildTabHref(tabs[0])}
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
									<Link to={buildTabHref(tab)}>
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
